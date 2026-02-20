<template>
  <div class="column-list">
    <ColumnCard
      v-for="column in columns"
      :key="column.id"
      :column
      :task-count="10"
      :max-task-count="20"
      @drop-task="(taskId) => handleTaskMove(taskId, column.id)"
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
import { taskApi, type ITask } from '@/entities/task'
import { useTasks } from '@/entities/task/model/useTasks'
import TaskList from '@/entities/task/ui/TaskList.vue'
import { useUpdateTask } from '@/features/move-task/model/useUpdateTask'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  projectId: string
}>()

const { data: columns } = useColumns(props.projectId)

const { data: tasks } = useTasks(props.projectId)

const tasksByColumn = computed(() => {
  if (!tasks.value) return {}

  return tasks.value.reduce(
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
})
const { mutate: updateTask } = useUpdateTask(props.projectId)

const handleTaskMove = (taskId: string, newColumnId: string, newOrder?: number) => {
  updateTask({ taskId, data: { columnId: newColumnId, order: newOrder } })
}
</script>

<style scoped lang="scss">
.column-list {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
</style>
