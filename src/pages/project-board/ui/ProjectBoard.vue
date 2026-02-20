<template>

  <div v-if="isLoading">Загрузка проекта...</div>
  <div v-else-if="isError">Ошибка загрузки проекта</div>
  <div v-else class="project">
    <div class="project__header">
      <h1>{{ project.data.value?.title }}</h1>

      <div class="project__actions">
        <CreateTaskSheet :project="project.data.value" />
      </div>
    </div>

    <ColumnList :project-id />
  </div>
</template>

<script setup lang="ts">
import { useProjects } from '@/entities/project'
import CreateTaskSheet from '@/features/create-task/ui/CreateTaskSheet.vue'
import ColumnList from '@/widgets/column-list/ui/ColumnList.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = route.params.id as string

const { project } = useProjects(projectId)
const { isLoading, isError } = project
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
