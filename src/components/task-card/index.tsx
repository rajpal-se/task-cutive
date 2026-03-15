import { Box, styled } from "@mui/material";

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
        <TaskCardContainer>
            <Box></Box>
            <Box>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Due: {dueDate.toLocaleString()}</p>
            </Box>
            <Box></Box>
        </TaskCardContainer>
    );
}

const TaskCardContainer = styled(Box)(() => ({
    backgroundColor: "#fff",
    borderRadius: "8px",
    // padding: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));
