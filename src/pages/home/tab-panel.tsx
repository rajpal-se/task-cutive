import { useTasksTab } from "../../contexts/tasks-tab";
import TaskCard from "../../components/task-card";

export default function TasksTabPanel() {
    const { tab } = useTasksTab();

    const tabData = {
        title: "Task 1",
        description: "This is a description of task 1",
        dueDate: new Date(2026, 3, 15, 22, 30),
        createdAt: new Date(2026, 3, 15, 20, 15),
        isCompeleted: false,
    };

    return (
        <>
            <TaskCard
                title={tabData.title}
                description={tabData.description}
                dueDate={tabData.dueDate}
                createdAt={tabData.createdAt}
                isCompeleted={tabData.isCompeleted}
            />
        </>
    );
}
