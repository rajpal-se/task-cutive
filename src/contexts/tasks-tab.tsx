/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from "react";
import { taskTabs } from "../constants";

export const TasksTabContext = createContext({
    tab: taskTabs[0],
    setTab: (_tabId: string) => {},
});

export function useTasksTab() {
    return useContext(TasksTabContext);
}

export function TasksTabProvider({
    children,
    defaultTabId = taskTabs?.[0]?.id,
}: PropsWithChildren<{ defaultTabId?: (typeof taskTabs)[number]["id"] }>) {
    const [tabIndex, setTabIndex] = useState(() =>
        taskTabs.findIndex((tab) => tab.id === defaultTabId),
    );

    function setTab(tabId: string) {
        const index = taskTabs.findIndex((tab) => tab.id === tabId);
        if (index !== -1) {
            setTabIndex(index);
        }
    }

    return (
        <TasksTabContext.Provider value={{ tab: taskTabs[tabIndex], setTab }}>
            {children}
        </TasksTabContext.Provider>
    );
}
