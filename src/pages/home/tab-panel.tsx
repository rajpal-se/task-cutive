import { useTasksTab } from "../../contexts/tasks-tab";

export default function TasksTabPanel() {
    const { tab } = useTasksTab();
    return <>{tab.label}</>;
}
