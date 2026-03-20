import { axiosInstance } from "../instance";

export interface TaskPayloadCreate {
    title: string;
    description?: string;
    isHighPriority?: boolean;
    dueDatetime?: string;
}

export interface TaskPayloadUpdate {
    title?: string;
    description?: string;
    is_high_priority?: boolean;
    due_datetime?: string;
    is_completed?: boolean;
}

export async function createTaskApi(payload: TaskPayloadCreate) {
    try {
        const response = await axiosInstance.post("/tasks", payload);
        const { success, data, message } = response?.data ?? {};

        if (success === true) {
            return data;
        }

        throw new Error(message || "Failed to create task");
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to create task",
        );
    }
}

export async function getTaskByIdApi(taskId: string) {
    try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        const { success, data, message } = response?.data ?? {};

        if (success === true) {
            return data;
        }

        throw new Error(message || "Failed to fetch task");
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch task",
        );
    }
}

export async function updateTaskApi({
    taskId,
    payload,
}: {
    taskId: string;
    payload: TaskPayloadUpdate;
}) {
    try {
        const response = await axiosInstance.patch(`/tasks/${taskId}`, payload);
        const { success, data, message } = response?.data ?? {};

        if (success === true) {
            return data;
        }

        throw new Error(message || "Failed to update task");
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to update task",
        );
    }
}
