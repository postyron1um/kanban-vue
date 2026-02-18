<template>
  <div>ПРоект</div>
  <div class=""></div>
  <ColumnList />
</template>

<script setup lang="ts">
import { columnApi } from '@/entities/column/api/column.api'
import type { IColumn } from '@/entities/column/model/types'
import ColumnCard from '@/entities/column/ui/ColumnCard.vue'
import ColumnList from '@/widgets/column-list/ui/ColumnList.vue'
import { onMounted, ref } from 'vue'

const columns = ref<IColumn[]>([])

const fetchColumns = async () => {ч
  columns.value = await columnApi.getColumns()

  columns.value
}

onMounted(() => {
  fetchColumns()
})
</script>

<style scoped></style>
