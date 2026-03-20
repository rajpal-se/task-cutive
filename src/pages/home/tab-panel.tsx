import { useTasksTab } from "../../contexts/tasks-tab";
import TaskCard from "../../components/task-card";
import { useNavigate } from "react-router";
import routes from "../../router/routes";

export default function TasksTabPanel() {
    const { tab } = useTasksTab();
    const navigate = useNavigate();

    const tabData = {
        taskId: "65f0c4b32dd3ad6d87ea0011",
        title: "Task 1",
        description: "This is a description of task 1",
        dueDate: new Date(2026, 3, 15, 22, 30),
        createdAt: new Date(2026, 3, 15, 20, 15),
        isCompleted: false,
    };

    const handleEditTask = (taskId: string) => {
        navigate(routes.editTask(taskId));
    };

    return (
        <>
            <TaskCard
                taskId={tabData.taskId}
                title={tabData.title}
                description={tabData.description}
                dueDate={tabData.dueDate}
                createdAt={tabData.createdAt}
                isCompleted={tabData.isCompleted}
                onEdit={handleEditTask}
            />
        </>
    );
}
