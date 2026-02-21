<template>
  <div v-if="isLoading">Загрузка проекта...</div>
  <div v-else-if="isError">Ошибка загрузки проекта</div>
  <div v-else class="project">
    <Teleport to="#header-content">
      <div class="project__header">
        <h1>{{ project.data.value?.title }}</h1>

        <div class="project__actions">
          <CreateTaskSheet :project="project.data.value" />
        </div>
      </div>
    </Teleport>
    <ColumnList v-model="projectId" />
  </div>
</template>

<script setup lang="ts">
import { useProjects } from '@/entities/project'
import CreateTaskSheet from '@/features/create-task/ui/CreateTaskSheet.vue'
import ColumnList from '@/widgets/column-list/ui/ColumnList.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = ref(route.params.id as string)

const { project } = useProjects(projectId)
const { isLoading, isError } = project

watch(
  () => route.params.id,
  (newId) => {
    if (typeof newId === 'string') {
      console.log(newId)
      projectId.value = newId
    }
  },
)
</script>

<style scoped lang="scss">
.project {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    // padding: 20px 0;
  }
}
</style>
