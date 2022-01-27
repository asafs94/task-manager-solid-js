import { TaskStatus } from "~/constants";

export interface Subtask {
    id: string;
    taskId: string;
    title: string;
    description: string;
    status: TaskStatus;
}