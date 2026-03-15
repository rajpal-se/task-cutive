import { useState, type PropsWithChildren } from "react";
import { Box, styled, Tab, Tabs } from "@mui/material";
import { taskTabs } from "../../constants";

export function TaskTabs(props?: PropsWithChildren) {
    const { children } = props || {};
    const [tab, setTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log({ newValue }, event);
        setTab(newValue);
    };
    return (
        <TasksTabContainer>
            <Tabs
                value={tab}
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
            <Box>{children}</Box>
        </TasksTabContainer>
    );
}

const TasksTabContainer = styled(Box)(() => ({
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "100%",
}));
