import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    Paper,
    Tooltip,
    Typography,
    styled,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AppAutoContainer from "../../components/app-auto-container";
import { useUpdateUserProfile } from "../../apis";
import { TextField } from "../../components/styled/text-field";
import { setUserData, userDataSelector, type AppDispatch } from "../../store";
import {
    type UpdateUserProfileFormValues,
    updateUserProfileFormSchema,
} from "../../schemas";

function formatDateTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }
    return date.toLocaleString();
}

export default function Profile() {
    const userData = useSelector(userDataSelector);
    const dispatch = useDispatch<AppDispatch>();
    const { mutateAsync: updateUserProfile, isPending } =
        useUpdateUserProfile();
    const [isEditingName, setIsEditingName] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isDirty },
        reset,
    } = useForm<UpdateUserProfileFormValues>({
        resolver: yupResolver(updateUserProfileFormSchema),
        values: {
            firstName: userData?.firstName ?? "",
            lastName: userData?.lastName ?? "",
        },
    });

    if (!userData) {
        return (
            <ProfilePageRoot>
                <AppAutoContainer>
                    <Paper className="profileCard" elevation={2}>
                        <Typography variant="h5" className="title">
                            Profile
                        </Typography>
                        <Typography color="text.secondary">
                            No profile data available.
                        </Typography>
                    </Paper>
                </AppAutoContainer>
            </ProfilePageRoot>
        );
    }

    const fullName = `${userData.firstName} ${userData.lastName}`.trim();

    const onSubmit = async (data: UpdateUserProfileFormValues) => {
        try {
            const response = await updateUserProfile(data);
            if (response?.data) {
                dispatch(setUserData(response.data));
            }
            reset(data);
            setIsEditingName(false);
            toast.success(response?.message || "Profile updated successfully");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update profile",
            );
        }
    };

    const handleStartEdit = () => {
        reset({
            firstName: userData.firstName,
            lastName: userData.lastName,
        });
        setIsEditingName(true);
    };

    const handleCancelEdit = () => {
        reset({
            firstName: userData.firstName,
            lastName: userData.lastName,
        });
        setIsEditingName(false);
    };

    return (
        <ProfilePageRoot>
            <AppAutoContainer>
                <Paper className="profileCard" elevation={2}>
                    <Box className="profileHeader">
                        <Avatar className="avatar">{fullName.charAt(0)}</Avatar>
                        <Box className="titleSection">
                            <Typography variant="h5" className="title">
                                {fullName || "User"}
                            </Typography>
                            <Typography color="text.secondary">
                                {userData.email}
                            </Typography>
                        </Box>
                        <Box className="headerActions">
                            <Chip
                                label={
                                    userData.verified
                                        ? "Verified"
                                        : "Unverified"
                                }
                                color={
                                    userData.verified ? "success" : "warning"
                                }
                                variant="outlined"
                            />
                            <Tooltip title="Edit name">
                                <span>
                                    <IconButton
                                        aria-label="Edit name"
                                        onClick={handleStartEdit}
                                        disabled={isEditingName}
                                        className="editButton"
                                    >
                                        <EditOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                    </Box>

                    {isEditingName && (
                        <>
                            <Divider className="divider" />

                            <Box
                                component="form"
                                className="nameForm"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                            >
                                <Typography
                                    variant="subtitle1"
                                    className="sectionTitle"
                                >
                                    Update Name
                                </Typography>
                                <Box className="nameFields">
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                {...field}
                                                label="First Name"
                                                error={!!fieldState.error}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                {...field}
                                                label="Last Name"
                                                error={!!fieldState.error}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        )}
                                    />
                                </Box>
                                <Box className="actions">
                                    <Button
                                        type="button"
                                        variant="text"
                                        onClick={handleCancelEdit}
                                        disabled={isSubmitting || isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={
                                            !isDirty ||
                                            isSubmitting ||
                                            isPending
                                        }
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    )}

                    <Divider className="divider" />
                    <Box className="detailsGrid">
                        <DetailItem label="User ID" value={userData._id} />
                        <DetailItem label="Role" value={userData.role} />
                        <DetailItem
                            label="Created At"
                            value={formatDateTime(userData.created_at)}
                        />
                        <DetailItem
                            label="Updated At"
                            value={formatDateTime(userData.updated_at)}
                        />
                    </Box>
                </Paper>
            </AppAutoContainer>
        </ProfilePageRoot>
    );
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <Box className="detailItem">
            <Typography variant="caption" className="label">
                {label}
            </Typography>
            <Typography variant="body1" className="value">
                {value || "-"}
            </Typography>
        </Box>
    );
}

const ProfilePageRoot = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4, 0),

    ".profileCard": {
        borderRadius: 4,
        padding: theme.spacing(3),
    },

    ".profileHeader": {
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2),
        flexWrap: "wrap",
    },

    ".avatar": {
        width: 64,
        height: 64,
        fontSize: "1.8rem",
        fontWeight: 600,
        backgroundColor: theme.palette.primary.main,
    },

    ".titleSection": {
        flexGrow: 1,
    },

    ".headerActions": {
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
    },

    ".editButton": {
        width: 38,
        height: 38,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,

        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },

    ".title": {
        fontWeight: 600,
    },

    ".divider": {
        margin: theme.spacing(2, 0, 3),
    },

    ".sectionTitle": {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },

    ".nameForm": {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: theme.spacing(2),
    },

    ".nameFields": {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: theme.spacing(2),

        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
        },
    },

    ".actions": {
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1),
    },

    ".detailsGrid": {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: theme.spacing(2),

        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
        },
    },

    ".detailItem": {
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: theme.spacing(1.5, 2),
    },

    ".label": {
        display: "block",
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(0.5),
    },

    ".value": {
        fontWeight: 500,
        wordBreak: "break-word",
    },
}));
