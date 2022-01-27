import { createUniqueId } from "solid-js";
import { TASKS_MOCK } from "~/mocks";
import { createStore, produce } from 'solid-js/store'
import type { Subtask, Task, TaskList } from "~/types";
import { TaskStatus } from "~/constants";

interface TaskStore {
    subtasksById: Record<string, Subtask>;
    tasksById: Record<string, Task>;
    taskListsById: Record<string, TaskList>;
    orderedTaskListIds: string[];
}

const [taskStore, setTaskStore] = createStore<TaskStore>({
    subtasksById: TASKS_MOCK.SUBTASKS_BY_ID,
    tasksById: TASKS_MOCK.TASKS_BY_ID,
    taskListsById: TASKS_MOCK.TASK_LISTS_BY_ID,
    orderedTaskListIds: TASKS_MOCK.TASK_LIST_IDS,
});

function addTaskList(title: string){
    const id = createUniqueId();
    const taskList: TaskList = { id, title, taskIds:[] };
    setTaskStore(produce( store=> {
        store.taskListsById[id] = taskList;
        store.orderedTaskListIds.push(id);
    } ))
}

function updateTaskListTitle(id: string, title: string){
    setTaskStore(produce(store=>{
        store.taskListsById[id].title = title;
    }))
}

function removeTaskList(id: string){
    setTaskStore(produce(store=>{
       delete store.taskListsById[id];
       const index = store.orderedTaskListIds.indexOf(id);
       store.orderedTaskListIds.splice(index, 1);
    }))
}

function addTask(taskListId: string, title: string){
    const id = createUniqueId();
    const task: Task = { id, title, taskListId, status: TaskStatus.NOT_STARTED, description: '', subtaskIds: [], checklist: [], creationDate: new Date() };
    setTaskStore(produce(store=>{
        store.taskListsById[taskListId].taskIds.push(id);
        store.tasksById[id] = task;
    }));
}


function updateTask(updatedTask: Omit<Task, 'taskListId' | 'creationDate' | 'checklist' | 'subtaskIds'>){
    setTaskStore(produce(store=>{
        store.tasksById[updatedTask.id] = {
            ...store.tasksById[updatedTask.id],
            ...updatedTask
        }
    }))
}

function removeTask(id: string) {
    setTaskStore(produce(store => {
        const { taskListId } = store.tasksById[id];
        delete store.tasksById[id];
        const index = store.taskListsById[taskListId].taskIds.indexOf(id);
        store.taskListsById[taskListId].taskIds.splice(index, 1);
    }))
}

function addSubtask(taskId: string,subtaskName: string){
    setTaskStore(produce( store => {
        const id = createUniqueId();
        const subTask: Subtask = { id, title: subtaskName, status: TaskStatus.NOT_STARTED, description: '', taskId };
        store.subtasksById[subTask.id] = subTask;
        store.tasksById[taskId].subtaskIds.push(id);
    }))
}

function updateSubtask( updatedSubtask: Omit<Subtask, 'taskId'> ) {
    setTaskStore(produce(store => {
        const originalSubtask = store.subtasksById[updatedSubtask.id];
        store.subtasksById[updatedSubtask.id] = {
            ...originalSubtask,
            ...updatedSubtask,
        }
    }))
}

function removeSubtask( id: string ) {
    setTaskStore(produce(store => {
        const subtask = store.subtasksById[id]
        delete store.subtasksById[id];
        const task = store.tasksById[subtask.taskId];
        const index = task.subtaskIds.indexOf(subtask.id);
        task.subtaskIds.splice(index, 1);
    }))
}

function toggleCheckItem(taskId: string, index: number){
    setTaskStore(produce( store=>{
        store.tasksById[taskId].checklist[index].complete = !store.tasksById[taskId].checklist[index].complete;
    } ))
}


export const tasksManager = {
    addTaskList,
    updateTaskListTitle,
    removeTaskList,
    addTask,
    updateTask,
    removeTask,
    addSubtask,
    updateSubtask,
    removeSubtask,
    toggleCheckItem,
    ...taskStore,
}

