<template>
  <div class="column-list">
    <ColumnCard
      v-for="column in columns"
      :key="column.id"
      :column
      :task-count="10"
      :max-task-count="20"
    >
      <template #tasks>Задачи</template>
    </ColumnCard>
  </div>
</template>

<script setup lang="ts">
import { columnApi } from '@/entities/column/api/column.api'
import type { IColumn } from '@/entities/column/model/types'
import ColumnCard from '@/entities/column/ui/ColumnCard.vue'
import { onMounted, ref } from 'vue'

const columns = ref<IColumn[]>([])

const fetchColumns = async () => {
  columns.value = await columnApi.getColumns()

  columns.value
}

onMounted(() => {
  fetchColumns()
})
</script>

<style scoped lang="scss">
.column-list {
  display: flex;
  gap: 20px;
}
</style>
