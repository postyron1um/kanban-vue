<template>
  <div class="column-list">
    <ColumnCard
      v-for="column in columns"
      :key="column.id"
      :column
      :task-count="10"
      :max-task-count="20"
      @drop-task="(taskId) => handleTaskMove(tasksByColumn[column.id] || [], taskId, column.id)"
    >
      <template #tasks>
        <TaskList
          :tasks="tasksByColumn[column.id] || []"
          @reorder="({ draggedId, targetId }) => handleTaskMove(draggedId, column.id, targetId)"
        />
      </template>
    </ColumnCard>
  </div>
</template>

<script setup lang="ts">
import { useColumns } from '@/entities/column/model/useColumns'
import ColumnCard from '@/entities/column/ui/ColumnCard.vue'
import { type ITask } from '@/entities/task'
import { useTasks } from '@/entities/task/model/useTasks'
import TaskList from '@/entities/task/ui/TaskList.vue'
import { useMoveTask } from '@/features/move-task/model/useMoveTask'
import { computed } from 'vue'

const props = defineProps<{
  projectId: string
}>()

const { data: columns } = useColumns(props.projectId)

const { data: tasks } = useTasks(props.projectId)

const tasksByColumn = computed(() => {
  if (!tasks.value) return {}

  const grouped = tasks.value.reduce(
    (acc, task) => {
      const { columnId } = task

      if (!acc[columnId]) {
        acc[columnId] = []
      }

      acc[columnId].push(task)

      return acc
    },
    {} as Record<string, ITask[]>,
  )

  Object.values(grouped).forEach((columnTasks) => {
    columnTasks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  })

  return grouped
})


const { handleTaskMove } = useMoveTask(props.projectId);
</script>

<style scoped lang="scss">
.column-list {
  display: flex;
  gap: 20px;

  overflow-x: auto;
  overflow-y: hidden;

  width: 100%;
  max-width: 100vw;
  padding: 10px 10px 20px;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 10px;
  }
}

:deep(.column-card) {
  flex-shrink: 0;

  width: 300px;

  @media (max-width: 480px) {
    width: 280px;
  }
}
</style>
