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

export interface TaskItem {
    _id: string;
    title: string;
    description: string;
    is_high_priority: boolean;
    is_completed: boolean;
    due_datetime: string;
    created_at: string;
    updated_at: string;
    __v: number;
}

export interface TasksListResponse {
    tasks: TaskItem[];
    pagination: {
        total: number;
        page: number;
        perPage: number;
        totalPages: number;
    };
}

export type TaskFilter = "recent" | "upcoming" | "pending" | "done" | "overdue";

function mapTaskFilter(filter: TaskFilter) {
    if (filter === "overdue") {
        return "expired";
    }
    return filter;
}

export async function getAllTasksApi(params?: {
    filter?: TaskFilter;
    page?: number;
    perPage?: number;
}) {
    try {
        const filter = mapTaskFilter(params?.filter ?? "recent");
        const page = params?.page ?? 1;
        const perPage = params?.perPage ?? 20;

        const response = await axiosInstance.get("/tasks", {
            params: {
                filter,
                page,
                perPage,
            },
        });

        const { success, data, message } = response?.data ?? {};
        // console.log("API Response:", { success, data, message });
        // data.tasks = data.tasks.slice(0, 1);
        if (success === true) {
            return data as TasksListResponse;
        }

        throw new Error(message || "Failed to fetch tasks");
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to fetch tasks",
        );
    }
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
