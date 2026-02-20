<template>
  <div class="project">
    <div class="project__header">
      <h1>Название проекта</h1>

      <div class="project__actions">
        <CreateTaskSheet :project="project.data" />
      </div>
    </div>

    <ColumnList :project-id />
  </div>
</template>

<script setup lang="ts">
import { useProjects } from '@/entities/project'
import CreateTaskSheet from '@/features/add-task/ui/CreateTaskSheet.vue'
import ColumnList from '@/widgets/column-list/ui/ColumnList.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = route.params.id as string

const { project } = useProjects(projectId)
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
