<template>
  <div class="task-list">
    <TaskCard v-for="task in tasks" :key="task.id" :task @reorder="$emit('reorder', $event)">
      {{ task }}
    </TaskCard>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from '../model/task.types'
import TaskCard from './TaskCard.vue'

defineEmits(['reorder'])

defineProps<{
  tasks: ITask[]
}>()
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 50px;
}
</style>
