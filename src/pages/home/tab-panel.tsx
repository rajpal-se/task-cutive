import { Box, CircularProgress, Typography } from "@mui/material";
import { useTasks, type TaskFilter } from "../../apis";
import { useTasksTab } from "../../contexts/tasks-tab";
import TaskCard from "../../components/task-card";
import { useNavigate } from "react-router";
import routes from "../../router/routes";

export default function TasksTabPanel() {
    const { tab } = useTasksTab();
    const navigate = useNavigate();
    const {
        data: tasksData,
        isLoading,
        isFetching,
        isError,
        error,
    } = useTasks({ filter: tab.id as TaskFilter, page: 1, perPage: 20 });

    const handleEditTask = (taskId: string) => {
        navigate(routes.editTask(taskId));
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    minHeight: 240,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box
                sx={{
                    minHeight: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 2,
                }}
            >
                <Typography color="error">
                    {error?.message || "Failed to load tasks"}
                </Typography>
            </Box>
        );
    }

    const tasks = tasksData?.tasks ?? [];

    if (!tasks.length) {
        return (
            <Box
                sx={{
                    minHeight: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 2,
                }}
            >
                <Typography color="text.secondary">
                    No tasks found in {tab.label.toLowerCase()}.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                opacity: isFetching ? 0.85 : 1,
                transition: "opacity 0.2s ease",
            }}
        >
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    taskId={task._id}
                    title={task.title}
                    description={task.description || "No description"}
                    dueDate={new Date(task.due_datetime)}
                    createdAt={new Date(task.created_at)}
                    isCompleted={task.is_completed}
                    isHighPriority={task.is_high_priority}
                    onEdit={handleEditTask}
                />
            ))}
        </Box>
    );
}
