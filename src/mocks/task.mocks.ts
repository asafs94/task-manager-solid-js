import { TaskStatus } from "~/constants"
import { Subtask, Task, TaskList } from "~/types"

const TASK_LISTS_BY_ID: Record<string, TaskList> = {
    '1': {
        id: '1',
        title: 'Work',
        taskIds: ['1','2','3']
    },
    '2': {
        id: '3',
        title: 'House',
        taskIds: ['4','5']
    },
}


const TASKS_BY_ID: Record<string, Task> = {
    '1': {
        id: '1',
        title: 'Task 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac purus ut sem consectetur volutpat eu nec enim.',
        checklist: [
            { description: 'A check item', complete: false },
            { description: 'A check item 2', complete: false },
        ],
        status: TaskStatus.NOT_STARTED,
        subtaskIds: ['1'],
        creationDate: new Date(),
        taskListId: '1'
    },
    '2': {
        id: '2',
        title: 'Task 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac purus ut sem consectetur volutpat eu nec enim.',
        checklist: [],
        status: TaskStatus.IN_PROGRESS,
        subtaskIds: [],
        creationDate: new Date(),
        taskListId: '1'
    },
    '3': {
        id: '3',
        title: 'Task 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac purus ut sem consectetur volutpat eu nec enim.',
        checklist: [
            { description: 'A check item', complete: false },
        ],
        status: TaskStatus.COMPLETE,
        subtaskIds: [],
        creationDate: new Date(),
        taskListId: '1'
    },
    '4': {
        id: '4',
        title: 'Task 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac purus ut sem consectetur volutpat eu nec enim.',
        checklist: [
            { description: 'A check item', complete: false },
        ],
        status: TaskStatus.COMPLETE,
        subtaskIds: [],
        creationDate: new Date(),
        dueDate: new Date(),
        taskListId: '2'
    },
    '5': {
        id: '5',
        title: 'Task 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac purus ut sem consectetur volutpat eu nec enim.',
        checklist: [
            { description: 'A check item', complete: false },
        ],
        status: TaskStatus.COMPLETE,
        subtaskIds: [],
        creationDate: new Date(),
        taskListId: '2'
    },
}

const SUBTASKS_BY_ID: Record<string ,Subtask> = {
    '1': {
        id: '1',
        title: 'Hello World',
        description: 'Bla bla bla',
        status: TaskStatus.NOT_STARTED,
        taskId: '1'
    }
}

const TASK_LIST_IDS = ['1','2'];

export const TASKS_MOCK = {
    TASKS_BY_ID,
    TASK_LISTS_BY_ID,
    TASK_LIST_IDS,
    SUBTASKS_BY_ID
};