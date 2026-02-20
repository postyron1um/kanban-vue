<template>
  <div class="task-list">
    <transition-group name="tasks" tag="div" class="tasks-container">
      <TaskCard 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task" 
        @reorder="$emit('reorder', $event)"
        
      />
    </transition-group>
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

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 1px; 
}

.tasks-move {
  transition: transform 0.3s ease;
}

.tasks-enter-active,
.tasks-leave-active {
  transition: all 0.3s ease;
}
.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
