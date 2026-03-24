import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    Typography,
    styled,
} from "@mui/material";
import AppAutoContainer from "../../components/app-auto-container";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "../../components/styled/text-field";
import { DueDateTimeField } from "../../components/styled/due-datetime-field";
import { useNavigate, useParams } from "react-router";
import routes from "../../router/routes";
import { useCreateTask, useTaskById, useUpdateTask } from "../../apis";
import { toast } from "sonner";
import { useEffect } from "react";

interface TaskFormValues {
    title: string;
    description: string;
    dueDatetime: string;
    isHighPriority: boolean;
}

function toLocalDateTimeInput(value: string | Date | undefined) {
    if (!value) {
        return "";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60 * 1000);
    return local.toISOString().slice(0, 16);
}

export default function TaskEditorPage() {
    const navigate = useNavigate();
    const { taskId = "" } = useParams();
    const isEditMode = Boolean(taskId);

    const { mutateAsync: createTask, isPending: isCreatePending } =
        useCreateTask();
    const { mutateAsync: updateTask, isPending: isUpdatePending } =
        useUpdateTask();

    const { data: taskData, isLoading: isTaskLoading } = useTaskById(taskId, {
        enabled: isEditMode,
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<TaskFormValues>({
        defaultValues: {
            title: "",
            description: "",
            dueDatetime: "",
            isHighPriority: false,
        },
    });

    useEffect(() => {
        if (!isEditMode || !taskData) {
            return;
        }

        reset({
            title: taskData.title ?? "",
            description: taskData.description ?? "",
            dueDatetime: toLocalDateTimeInput(taskData.due_datetime),
            isHighPriority: Boolean(taskData.is_high_priority),
        });
    }, [isEditMode, reset, taskData]);

    const isSaving = isSubmitting || isCreatePending || isUpdatePending;

    const onSubmit = async (values: TaskFormValues) => {
        try {
            if (isEditMode) {
                await updateTask({
                    taskId,
                    payload: {
                        title: values.title,
                        description: values.description,
                        is_high_priority: values.isHighPriority,
                        due_datetime: values.dueDatetime
                            ? new Date(values.dueDatetime).toISOString()
                            : undefined,
                    },
                });
                toast.success("Task updated successfully");
            } else {
                await createTask({
                    title: values.title,
                    description: values.description,
                    isHighPriority: values.isHighPriority,
                    dueDatetime: values.dueDatetime
                        ? new Date(values.dueDatetime).toISOString()
                        : undefined,
                });
                toast.success("Task created successfully");
            }

            navigate(routes.home);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : isEditMode
                      ? "Failed to update task"
                      : "Failed to create task",
            );
        }
    };

    const pageTitle = isEditMode ? "Edit Task" : "Create Task";

    return (
        <TaskEditorRoot>
            <AppAutoContainer>
                <Paper className="editorCard" elevation={2}>
                    <Typography variant="h5" className="title">
                        {pageTitle}
                    </Typography>

                    <Box
                        component="form"
                        className="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "Title is required" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    label="Title"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Description"
                                    required={false}
                                    multiline
                                    minRows={4}
                                    maxRows={10}
                                    placeholder="Write task details"
                                />
                            )}
                        />

                        <Controller
                            name="dueDatetime"
                            control={control}
                            rules={{ required: "Due date is required" }}
                            render={({ field, fieldState }) => (
                                <DueDateTimeField
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    helperText={
                                        fieldState.error?.message ||
                                        "Pick the deadline date and time"
                                    }
                                />
                            )}
                        />

                        <Controller
                            name="isHighPriority"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={field.value}
                                            onChange={(event) =>
                                                field.onChange(
                                                    event.target.checked,
                                                )
                                            }
                                        />
                                    }
                                    label="High Priority"
                                />
                            )}
                        />

                        <Box className="actions">
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => navigate(routes.home)}
                                disabled={isSaving}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={
                                    isSaving || (isEditMode && isTaskLoading)
                                }
                            >
                                {isEditMode ? "Update" : "Create"}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </AppAutoContainer>
        </TaskEditorRoot>
    );
}

const TaskEditorRoot = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4, 0),

    ".editorCard": {
        borderRadius: 16,
        padding: theme.spacing(3),
        maxWidth: 760,
        margin: "0 auto",
    },

    ".title": {
        color: theme.palette.primary.main,
        fontWeight: 600,
        marginBottom: theme.spacing(2),
    },

    ".form": {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
    },

    ".actions": {
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1.5),
    },
}));
