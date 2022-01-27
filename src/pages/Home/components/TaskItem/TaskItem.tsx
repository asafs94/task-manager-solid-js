import { createMemo, Show } from "solid-js";
import { Chip, Column, Icon, Row, Text } from "~/components";
import { tasksManager } from "~/store";

interface IProps {
  id: string;
  class?: string;
}

export function TaskItem(props: IProps) {
  const task = createMemo(() => tasksManager.tasksById[props.id]);
  return (
    <Column gap="sm" p="sm">
      <Row gap="sm" xAlign="space-between" yAlign="center">
        <Text truncate>
          {task().title}
          <Text truncate color="secondary">
            {" "}
            - {task().description}
          </Text>
        </Text>
        <Row as="span" flex="0 0 auto" yAlign="center">
          {task().dueDate && <Icon type="clock" color="secondary" />}
        </Row>
      </Row>
      <Row gap="sm" xAlign="space-between" yAlign="center">
        <Chip color="amber">In progress</Chip>
        <Chip variant="secondary">
          <Show when={task().subtaskIds.length > 0}>
            {task().subtaskIds.length} subtasks
          </Show>
        </Chip>
      </Row>
    </Column>
  );
}
