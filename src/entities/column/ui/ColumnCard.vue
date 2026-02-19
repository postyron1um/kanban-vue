<template>
  <div class="column" :style="{ backgroundColor: column?.color }" @dragover.prevent @drop="onDrop">
    <div class="column__header">
      <div class="column__header-top">
        <div class="column__title-wrapper">
          <h3 class="column__title">{{ column.title }}</h3>
          <span
            class="column__badge"
            :class="{ 'column__badge--warning': taskCount > maxTaskCount }"
          >
            {{ taskCount }}
          </span>
        </div>

        <div class="column__actions">
          <slot name="actions"></slot>
        </div>
      </div>

      <div class="column__limit">Limit: {{ maxTaskCount }} tasks</div>
    </div>

    <div class="column__content">
      <div class="column__task-list">
        <slot name="tasks"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IColumn } from '../model/types'

interface Props {
  column: IColumn
  taskCount: number
  maxTaskCount: number
}

defineProps<Props>()

const emit = defineEmits<{ dropTask: [value: string] }>()

const onDrop = (e: DragEvent) => {
  const taskId = e.dataTransfer?.getData('taskId')
  if (taskId) {
    emit('dropTask', taskId)
  }
}
</script>

<style scoped lang="scss">
.column {
  background-color: #f1f2f4;
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  min-height: 100vh;
  min-width: 300px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &__header {
    padding: 12px 16px;
    cursor: default;
  }

  &__header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  &__title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: #172b4d;
    margin: 0;
  }

  &__badge {
    background: #dfe1e6;
    color: #44546f;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: 500;

    &--warning {
      background: #ef4444;
      color: white;
    }
  }

  &__limit {
    font-size: 11px;
    color: #626f86;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__content {
    padding: 0 8px 12px 8px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0000001a;
      border-radius: 10px;
    }
  }

  &__task-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
