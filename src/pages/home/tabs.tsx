import { type PropsWithChildren } from "react";
import { Box, styled, Tab, Tabs } from "@mui/material";
import { taskTabs } from "../../constants";
import { useTasksTab } from "../../contexts/tasks-tab";

export function TaskTabs({ children }: PropsWithChildren) {
    const { tab, setTab } = useTasksTab();

    const tabIndex = taskTabs.findIndex((t) => t.id === tab.id);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log({ newValue }, event);
        setTab(taskTabs[newValue].id);
    };

    return (
        <TasksTabContainer>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                centered
                className="tabs-navigation"
                sx={{
                    bgcolor: "white",
                    borderRadius: "16px",
                    width: "fit-content",
                    padding: "2px 24px",
                    margin: "0px auto",
                }}
            >
                {taskTabs.map((task) => (
                    <Tab key={task.id} label={task.label} />
                ))}
            </Tabs>
            <Box className="tasks-tab-content-body">{children}</Box>
        </TasksTabContainer>
    );
}

const TasksTabContainer = styled(Box)(() => ({
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "100%",
    paddingBottom: "0px",

    ".tasks-tab-content-body": {
        flexGrow: 1,
        overflow: "auto",
        // background: "blue",
    },
}));
