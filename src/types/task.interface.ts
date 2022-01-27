import { TaskStatus } from "~/constants";
import { Todo } from "./todo.interface";

export interface Task {
    id: string;
    taskListId: string;
    title: string;
    description: string;
    subtaskIds: string[];
    checklist: Todo[];
    status: TaskStatus;
    creationDate: Date;
    dueDate?: Date;
}