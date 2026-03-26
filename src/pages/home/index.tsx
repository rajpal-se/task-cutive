import { Box } from "@mui/material";
import { styled } from "@mui/system";
import AppAutoContainer from "../../components/app-auto-container";
import { TaskTabs } from "./tabs";
import TabPanel from "./tab-panel";
import { TasksTabProvider } from "../../contexts/tasks-tab";

export default function Home() {
    return (
        <HomeContainer>
            <AppAutoContainer>
                <TasksTabProvider>
                    <TaskTabs>
                        <TabPanel />
                    </TaskTabs>
                </TasksTabProvider>
            </AppAutoContainer>
        </HomeContainer>
    );
}

const HomeContainer = styled(Box)(({ theme }) => ({
    // padding: "16px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
}));
