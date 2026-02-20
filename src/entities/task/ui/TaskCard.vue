<template>
  <div
    class="task-card"
    :class="`task-card--priority-${task.priority}`"
    ref="cardRef"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop.stop="onDrop"
  >
    <div class="task-card__header">
      <span class="task-card__key">{{ task.key }}</span>
      <div
        :class="['task-card__priority-dot', `task-card__priority-dot--${task.priority}`]"
        :title="`Priority: ${task.priority}`"
      ></div>
    </div>

    <h4 class="task-card__title">{{ task.title }}</h4>

    <p v-if="task.description" class="task-card__description">
      {{ task.description }}
    </p>

    <div class="task-card__footer">
      <div class="task-card__assignee">
        <div class="task-card__avatar">
          <!-- {{ task?.assigneeId?.charAt(0).toUpperCase() }} -->
        </div>
      </div>
      <time class="task-card__date">{{ formatDate(task.createdAt) }}</time>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ITask } from '../model/task.types'

interface IProps {
  task: ITask
}

const props = defineProps<IProps>()
const emit = defineEmits(['reorder'])

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  })
}

const cardRef = ref<HTMLElement | null>()

const onDragStart = (e: DragEvent) => {
  if (!e.dataTransfer || !cardRef.value) return

  e.dataTransfer.setData('taskId', props.task.id)
  e.dataTransfer.effectAllowed = 'move'
}

const onDrop = (e: DragEvent) => {
  const draggedId = e.dataTransfer?.getData('taskId')

  if (draggedId && draggedId !== props.task.id) {
    emit('reorder', { draggedId, targetId: props.task.id })
  }
}
</script>

<style lang="scss">
.task-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e4e8;
  cursor: grab;

  user-select: none;

  &:hover {
    border-color: #4c9aff;
    box-shadow: 0 4px 8px rgba(9, 30, 66, 0.08);
  }

  &:active {
    cursor: grabbing;
    // transform: scale(0.98);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__key {
    font-size: 11px;
    font-weight: 700;
    color: #626f86;
    text-transform: uppercase;
  }

  &__priority-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;

    &--high {
      background-color: #ef4444;
    }
    &--medium {
      background-color: #f59e0b;
    }
    &--low {
      background-color: #10b981;
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: #172b4d;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  &__description {
    font-size: 12px;
    color: #44546f;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2; // Ограничение в 2 строки
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  &__avatar {
    width: 24px;
    height: 24px;
    background: #dfe1e6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    color: #44546f;
    border: 1px solid white;
  }

  &__date {
    font-size: 11px;
    color: #626f86;
  }
}

#dragged-task {
  opacity: 1;
}
</style>
