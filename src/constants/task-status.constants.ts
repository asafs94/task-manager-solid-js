export enum TaskStatus {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETE,
    STUCK
}

export const TASK_STATUS_COLORS = {
    [TaskStatus.NOT_STARTED]: 'sky',
    [TaskStatus.IN_PROGRESS]: 'amber',
    [TaskStatus.COMPLETE]: 'green',
    [TaskStatus.STUCK]: 'red',
} as const;

export const TASK_STATUS_TEXT = {
    [TaskStatus.NOT_STARTED]: 'Not Started',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.COMPLETE]: 'Complete',
    [TaskStatus.STUCK]: 'Stuck'
} as const;