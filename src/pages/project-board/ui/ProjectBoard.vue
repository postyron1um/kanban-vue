<template>
  <div class="project">
    <div class="project__header">
      <h1>Название проекта</h1>
      <div class="project__actions">
        <Button>Добавить задачу </Button>
      </div>
    </div>

    <ColumnList />
  </div>
</template>

<script setup lang="ts">
import { columnApi } from '@/entities/column/api/column.api'
import type { IColumn } from '@/entities/column/model/types'
import Button from '@/shared/ui/button/Button.vue'
import ColumnList from '@/widgets/column-list/ui/ColumnList.vue'
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
.project {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
}
</style>
