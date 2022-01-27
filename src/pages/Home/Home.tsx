import {
  Chip,
  Icon,
  SearchInput,
  Text,
  Row,
  IconButton,
  Column,
  Button,
} from "~/components";
import { createMemo, For, Show } from "solid-js";
import styles from "./Home.module.scss";
import { tasksManager } from "~/store";
import { useSearchParams } from "solid-app-router";
import { TaskItem } from "./components";

function Home() {
  const [params, setParams] = useSearchParams();
  const closedTaskListIds = createMemo(() => {
    if (!params.closedTaskLists) {
      return [];
    }
    const closedIds: string[] = JSON.parse(params.closedTaskLists);
    return closedIds;
  });

  function isTaskListOpen(taskListId: string) {
    return !closedTaskListIds().includes(taskListId);
  }

  function handleToggleTaskListOpen(taskListId: string) {
    let ids = closedTaskListIds();
    if (!ids.length) {
      return setParams({ closedTaskLists: JSON.stringify([taskListId]) });
    }
    if (ids.includes(taskListId)) {
      ids = ids.filter((id) => id !== taskListId);
      return setParams({ closedTaskLists: JSON.stringify(ids) });
    }
    ids.push(taskListId);
    return setParams({ closedTaskLists: JSON.stringify(ids) });
  }

  const selectedTask = createMemo(
    () => params.selected && tasksManager.tasksById[params.selected]
  );
  const searchValue = createMemo(() => params.q ?? "");

  function handleSearchChange(e: Event & { currentTarget: HTMLInputElement }) {
    setParams({ q: e.currentTarget.value });
  }

  function handleSelectTask(taskId?: string) {
    setParams({ selected: taskId });
  }

  return (
    <div class={styles.root}>
      <Text as="h1" variant="heading-2">
        My Tasks
      </Text>
      {/* Start: Filters Header */}
      <Row gap="xs" yAlign="center">
        <SearchInput
          value={searchValue()}
          onInput={handleSearchChange}
          placeholder="Search for a task"
        />
        <IconButton variant="highlight">
          <Icon type="filter" />
        </IconButton>
      </Row>
      {/* End: Filters Header */}
      {/* Start: Main-Content */}
      <Row class={styles.main} gap="xl" flex="1">
        {/* Start: TaskLists */}
        <Column class={styles.tasklistsSection} gap="lg">
          <For each={tasksManager.orderedTaskListIds}>
            {(taskListId) => {
              const taskList = tasksManager.taskListsById[taskListId];
              return (
                // Task List
                <Column gap="md">
                  <Row
                    as="button"
                    gap="xs"
                    yAlign="center"
                    onClick={handleToggleTaskListOpen.bind(null, taskListId)}
                  >
                    <Icon
                      type={
                        isTaskListOpen(taskListId)
                          ? "chevron-down"
                          : "chevron-right"
                      }
                    />
                    <Text color="secondary" variant="heading-4">
                      {taskList.title}
                    </Text>
                  </Row>
                  <Show when={isTaskListOpen(taskListId)}>
                    <Column gap="2xs">
                      <For each={taskList.taskIds}>
                        {(taskId) => (
                          <div
                            class={styles.task}
                            classList={{
                              selected: params.selected === taskId,
                            }}
                            onClick={handleSelectTask.bind(null, taskId)}
                          >
                            <TaskItem id={taskId} />
                          </div>
                        )}
                      </For>
                    </Column>
                  </Show>
                </Column>
              );
            }}
          </For>
        </Column>
        {/* End: TaskLists */}
        {/* Start: Selected Task */}
        <Show when={selectedTask()}>
          {(task) => (
            // Selected Task :
            <div class={styles.selectedTask}>
              {/* Start: Selected Task Header */}
              <Row as="header">
                <Text as="h2" variant="heading-3">
                  {task.title}
                </Text>
                <Row yAlign="center" gap="2xs">
                  <Button size="small" variant="contained">
                    Complete
                  </Button>
                  <IconButton>
                    <Icon type="ellipsis-h" />
                  </IconButton>
                  <IconButton onClick={handleSelectTask.bind(null, undefined)}>
                    <Icon type="close" />
                  </IconButton>
                </Row>
              </Row>
              {/* End: Selected Task Header */}
              {/*Start: Selected Task Details */}
              <Column gap="sm">
                <Row yAlign="center">
                  <Row flex="0 0 125px">
                    <Text>Status</Text>
                  </Row>
                  <Chip color="amber">In Progress</Chip>
                </Row>
                <Row yAlign="center" class={styles.dueDate}>
                  <Row flex="0 0 125px">
                    <Text>Due Date</Text>
                  </Row>
                  <Text color="error" variant="small-1">
                    <Row yAlign="center" gap="2xs">
                      <Icon type="clock" />
                      <span>9 days overdue</span>
                    </Row>
                  </Text>
                </Row>
                <Row class={styles.description}>
                  <Row flex="0 0 125px">
                    <Text class={styles.key}>Description</Text>
                  </Row>
                  <Text class={styles.value} color="secondary">
                    {task.description}
                  </Text>
                </Row>
              </Column>
              {/*End: Selected Task Details */}
              {/* Start: Selected Task Checklist */}
              <Column gap="xs">
                {/* Start: Checklist Header */}
                <Row gap="xs">
                  Checklist
                  <IconButton>
                    <Icon type="plus" />
                  </IconButton>
                </Row>
                {/* End: Checklist Header */}
                {/* Start: Checklist items */}
                <For
                  each={task.checklist}
                  fallback={
                    <Text variant="placeholder" color="placeholder">
                      No Items
                    </Text>
                  }
                >
                  {(item, index) => (
                    <Row
                      as="label"
                      yAlign="center"
                      gap="2xs"
                      class={styles.checkItem}
                    >
                      <input
                        onChange={() =>
                          tasksManager.toggleCheckItem(task.id, index())
                        }
                        checked={item.complete}
                        type="checkbox"
                      />
                      <Text color={item.complete ? "secondary" : "primary"}>
                        {item.description}
                      </Text>
                    </Row>
                  )}
                </For>
                {/* End: Checklist items */}
              </Column>
              {/* End: Selected Task Checklist */}
              {/* Start: Selected Task Subtasks */}
              <div class={styles.subtasksSection}>
                <Text>Subtasks</Text>
                <For
                  each={task.subtaskIds}
                  fallback={
                    <Text color="placeholder" variant="placeholder">
                      No Tasks
                    </Text>
                  }
                >
                  {(subTaskId) => {
                    const subtask = tasksManager.subtasksById[subTaskId];
                    return (
                      <Column class="paper" gap="sm" p="sm">
                        <Row yAlign="center" xAlign="space-between" gap="sm">
                          <Text class={styles.title}>
                            {subtask.title}
                            <Text color="secondary">
                              {" - "}{subtask.description}
                            </Text>
                          </Text>
                          <div></div>
                        </Row>
                        <Row yAlign="center" xAlign="space-between" gap="sm">
                          <Chip color="red">Stuck</Chip>
                          <IconButton>
                            <Icon type="ellipsis-h" />
                          </IconButton>
                        </Row>
                      </Column>
                    );
                  }}
                </For>
              </div>
              {/* End: Selected Task Subtasks */}
            </div>
          )}
        </Show>
        {/* End: Selected Task */}
      </Row>
      {/* End: Main-Content */}
    </div>
  );
}

export default Home;
