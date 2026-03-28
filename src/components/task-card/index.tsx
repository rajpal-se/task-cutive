import { Box, Divider, Tooltip, styled } from "@mui/material";
import CalenderCard from "./calender-card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useCountdown, useTimeAgo } from "./use-countdown";

interface TaskCardProps {
    taskId: string;
    title: string;
    description: string;
    dueDate: Date;
    createdAt: Date;
    completedAt?: Date;
    isCompleted: boolean;
    isHighPriority?: boolean;
    onEdit?: (taskId: string) => void;
    onToggleComplete?: (taskId: string, isCompleted: boolean) => void;
    isMarkingComplete?: boolean;
}

function toFullDateTimeLabel(date?: Date) {
    const value = date?.getTime();
    if (!Number.isFinite(value)) {
        return "-";
    }
    return `${date?.toLocaleString()}`;
}

export default function TaskCard(props: TaskCardProps) {
    const {
        taskId,
        title,
        description,
        dueDate,
        createdAt,
        completedAt,
        isCompleted,
        isHighPriority = false,
        onEdit,
        onToggleComplete,
        isMarkingComplete = false,
    } = props;
    const { label: countdownLabel, isExpired } = useCountdown(
        dueDate,
        isCompleted,
        completedAt,
    );
    const createdAgoLabel = useTimeAgo(createdAt, "Added ");

    const countdownTooltip = isCompleted
        ? toFullDateTimeLabel(completedAt)
        : toFullDateTimeLabel(dueDate);
    const createdTooltip = toFullDateTimeLabel(createdAt);

    return (
        <TaskCardContainer isCompleted={isCompleted} isExpired={isExpired}>
            <Box className="calender-card">
                <CalenderCard date={dueDate} isImportant={isHighPriority} />
            </Box>
            <Box className="task-info">
                <h3>{title}</h3>
                <p className="description">{description}</p>
                <div className="dates">
                    <p className="date-meta date-main">
                        <Tooltip title={countdownTooltip} arrow placement="top">
                            <span className="date-meta-text">
                                {countdownLabel}
                            </span>
                        </Tooltip>
                    </p>
                    <Divider orientation="vertical" />
                    <p className="date-meta">
                        <Tooltip title={createdTooltip} arrow placement="top">
                            <span className="date-meta-text">
                                {createdAgoLabel}
                            </span>
                        </Tooltip>
                    </p>
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
                        <>
                            <DoneAllIcon
                                className={`completed-done ${isMarkingComplete ? "disabled" : ""}`}
                                aria-label="Mark task as uncompleted"
                                onClick={() => {
                                    if (!isMarkingComplete) {
                                        onToggleComplete?.(taskId, isCompleted);
                                    }
                                }}
                            />
                            <span className="done-label">Completed</span>
                        </>
                    ) : null}
                    {!isCompleted && (
                        <>
                            <DoneAllIcon
                                className={`mark-done ${isMarkingComplete ? "disabled" : ""}`}
                                aria-label="Mark task as completed"
                                onClick={() => {
                                    if (!isMarkingComplete) {
                                        onToggleComplete?.(taskId, isCompleted);
                                    }
                                }}
                            />
                        </>
                    )}
                    {isExpired && !isCompleted && (
                        <>
                            <ErrorOutlineIcon className="expired-icon" />
                            <span className="expired-label">Expired</span>
                        </>
                    )}
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
        alignItems: "stretch",
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #e8e8e8",
        padding: "6px 8px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
        gap: "8px",

        ".calender-card": {
            margin: "auto 0",
            paddingLeft: "2px",
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
                minHeight: "39px",

                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            ".dates": {
                fontSize: "13px",
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                columnGap: "10px",
                marginTop: "4px",
                minWidth: 0,

                ".date-meta": {
                    display: "block",
                    padding: "0px",
                    margin: "0px",
                    color: "#7d7d7d",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                },

                ".date-meta-text": {
                    display: "inline-block",
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "help",
                    verticalAlign: "bottom",
                },

                ".date-main": {
                    color: "#5f5f5f",
                    fontWeight: 500,
                },

                ".MuiDivider-root": {
                    height: "16px",
                },
            },
        },
        ".task-actions": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: "10px",
            width: "86px",
            flexShrink: 0,
            padding: "4px 2px 2px 0",

            svg: {
                cursor: "pointer",
                padding: "2px",
                fontSize: "1.6rem",
                borderRadius: "4px",
                position: "relative",
                transition: "background-color 0.15s ease, color 0.15s ease",

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
                justifyContent: "flex-end",
                width: "100%",
                gap: "6px",

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
                justifyContent: "flex-end",
                flexWrap: "wrap",
                width: "100%",
                textAlign: "right",
                fontWeight: 500,
                gap: "4px",
                ...(isCompleted && { color: "#4caf50" }),
                ...(isExpired && { color: "#d32f2f" }),
            },

            ".completed-done": {
                color: "#4caf50",

                "&.disabled": {
                    pointerEvents: "none",
                    opacity: 0.5,
                },
            },

            ".mark-done": {
                cursor: "pointer",
                color: "#616161",

                "&.disabled": {
                    pointerEvents: "none",
                    opacity: 0.5,
                },
            },

            ".done-label": {
                fontSize: "12px",
                lineHeight: 1,
                whiteSpace: "nowrap",
            },

            ".expired-label": {
                fontSize: "12px",
                lineHeight: 1,
                whiteSpace: "nowrap",
            },

            ".expired-icon": {
                padding: "2px",
                fontSize: "1.4rem",
                borderRadius: "4px",
            },
        },
    }),
);
