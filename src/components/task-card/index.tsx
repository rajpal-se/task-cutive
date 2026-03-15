import { Box, Divider, styled, Typography } from "@mui/material";
import CalenderCard from "./calender-card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";

interface TaskCardProps {
    title: string;
    description: string;
    dueDate: Date;
    createdAt: Date;
    isCompeleted: boolean;
}

export default function TaskCard(props: TaskCardProps) {
    const { title, description, dueDate, createdAt, isCompeleted } = props;
    return (
        <TaskCardContainer isCompeleted={isCompeleted}>
            <Box className="calender-card">
                <CalenderCard date={dueDate} />
            </Box>
            <Box className="task-info">
                <h3>{title}</h3>
                <p className="description">
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                </p>
                <div className="dates">
                    <p>Remaining: 10 mins</p>
                    <Divider orientation="vertical" />
                    <p>Added on: {dueDate.toLocaleString()}</p>
                </div>
            </Box>
            <Box className="task-actions">
                <Box className="actions">
                    <EditIcon className="edit" />
                    <DeleteOutlineIcon className="delete" />
                </Box>
                <Box className="space" />
                <Box className="status">
                    <DoneAllIcon className="done" />
                </Box>
            </Box>
        </TaskCardContainer>
    );
}

const TaskCardContainer = styled(Box)<{ isCompeleted: boolean }>(
    ({ isCompeleted = false }) => ({
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

                    "&:first-child": {
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
                ...(isCompeleted && { color: "#4caf50" }),
            },
        },
    }),
);
