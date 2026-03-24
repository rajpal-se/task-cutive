import { Box, Divider, styled } from "@mui/material";
import CalenderCard from "./calender-card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useCountdown } from "./use-countdown";

interface TaskCardProps {
    taskId: string;
    title: string;
    description: string;
    dueDate: Date;
    createdAt: Date;
    isCompleted: boolean;
    onEdit?: (taskId: string) => void;
}

export default function TaskCard(props: TaskCardProps) {
    const {
        taskId,
        title,
        description,
        dueDate,
        createdAt,
        isCompleted,
        onEdit,
    } = props;
    const { label: countdownLabel, isExpired } = useCountdown(
        dueDate,
        isCompleted,
    );

    return (
        <TaskCardContainer isCompleted={isCompleted} isExpired={isExpired}>
            <Box className="calender-card">
                <CalenderCard date={dueDate} />
            </Box>
            <Box className="task-info">
                <h3>{title}</h3>
                <p className="description">{description}</p>
                <div className="dates">
                    <p>{countdownLabel}</p>
                    <Divider orientation="vertical" />
                    <p>Added on: {createdAt.toLocaleString()}</p>
                </div>
            </Box>
            <Box className="task-actions">
                <Box className="actions">
                    <EditIcon
                        className="edit"
                        onClick={() => onEdit?.(taskId)}
                    />
                    <DeleteOutlineIcon className="delete" />
                </Box>
                <Box className="space" />
                <Box className="status">
                    {isCompleted ? (
                        <DoneAllIcon className="done" />
                    ) : isExpired ? (
                        <>
                            <ErrorOutlineIcon className="expired-icon" />
                            <span className="expired-label">Expired</span>
                        </>
                    ) : null}
                </Box>
            </Box>
        </TaskCardContainer>
    );
}

const TaskCardContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isCompleted" && prop !== "isExpired",
})<{ isCompleted: boolean; isExpired: boolean }>(
    ({ isCompleted = false, isExpired = false }) => ({
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "8px",
        // padding: "16px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

        ".calender-card": {
            margin: "auto 8px",
        },
        ".task-info": {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            // backgroundColor: "#f9f9f9",
            padding: "4px 8px",

            ">h3, >p, >div": {
                margin: "0px",
                fontSize: "17px",
            },
            ".description": {
                color: "#555",
                fontSize: "15px",
                wordSpacing: "0.3px",
                lineHeight: "1.3",

                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            ".dates": {
                fontSize: "14px",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                marginTop: "4px",

                ">p": {
                    padding: "0px",
                    margin: "0px",
                    flex: 1,
                    color: "#aaa",

                    "&:first-of-type": {
                        maxWidth: "150px",
                        color: "#888",
                    },
                },
            },
        },
        ".task-actions": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "8px",
            width: "80px",
            flexShrink: 0,

            svg: {
                cursor: "pointer",
                padding: "2px",
                fontSize: "1.6rem",
                borderRadius: "4px",
                position: "relative",

                "&:hover": {
                    backgroundColor: "#eee",
                },
                "&:active": {
                    backgroundColor: "#ccc",
                    top: "1px",
                },
            },
            ">.actions": {
                display: "flex",
                gap: "8px",
                // backgroundColor: "red",
                margin: "8px auto",

                ".edit": {
                    color: "#1976d2",
                },

                ".delete": {
                    color: "#d32f2f",
                },
            },
            ".space": {
                flexGrow: 1,
            },
            ".status": {
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                gap: "4px",
                margin: "8px 0px",
                marginRight: "12px",
                ...(isCompleted && { color: "#4caf50" }),
                ...(isExpired && { color: "#d32f2f" }),
            },

            ".expired-label": {
                fontSize: "13px",
                lineHeight: 1,
            },

            ".expired-icon": {
                fontSize: "1.2rem",
            },
        },
    }),
);
