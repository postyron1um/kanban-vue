<template>
  <div class="column-list">
    <ColumnCard
      v-for="column in columns"
      :key="column.id"
      :column
      :task-count="10"
      :max-task-count="20"
      @drop-task="(taskId) => moveTask(taskId, column.id)"
    >
      <template #tasks>
        <TaskList
          :tasks="tasksByColumn[column.id] || []"
          @reorder="({ draggedId, targetId }) => moveTask(draggedId, column.id, targetId)"
        />
      </template>
    </ColumnCard>
  </div>
</template>

<script setup lang="ts">
import { columnApi } from '@/entities/column/api/column.api'
import type { IColumn } from '@/entities/column/model/types'
import ColumnCard from '@/entities/column/ui/ColumnCard.vue'
import { taskApi, type ITask } from '@/entities/task'
import TaskList from '@/entities/task/ui/TaskList.vue'
import { computed, onMounted, ref } from 'vue'

const columns = ref<IColumn[]>([])
const tasks = ref<ITask[]>([])

const fetchData = async () => {
  try {
    const [colsData, tasksData] = await Promise.all([columnApi.getColumns(), taskApi.getTasks()])
    columns.value = colsData
    tasks.value = tasksData
  } catch {}
}

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

const moveTask = (taskId: string, columnId: string, targetId?: string) => {
  const draggedIndex = tasks.value.findIndex((t) => t.id === taskId)

  if (draggedIndex === -1) return

  const task = tasks.value[draggedIndex]
  if (task) {
    tasks.value.splice(draggedIndex, 1)
    task.columnId = columnId

    if (targetId) {
      const targetIdIndex = tasks.value.findIndex((t) => t.id === targetId)

      tasks.value.splice(targetIdIndex, 0, task)
      taskApi.updateTask(task.id, task)
      return
    }
  }
  tasks.value.push(task)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped lang="scss">
.column-list {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}
</style>
