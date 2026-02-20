<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger as-child>
      <Button class="cursor-pointer">Добавить задачу</Button>
    </SheetTrigger>
    <SheetContent side="right" class="task-sheet">
      <SheetHeader>
        <SheetTitle>Создание задачи</SheetTitle>
        <SheetDescription>
          Заполните поля чтобы создать новую задачу. После создания она появится в колонке.
        </SheetDescription>
      </SheetHeader>

      <CreateTaskForm @submit="handleCreateTask" />
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/shared/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/shared/ui/sheet'
import type { IProject } from '@/entities/project'
import CreateTaskForm from './CreateTaskForm.vue'
import { useCreateTask } from '../model/useCreateTask'

const props = defineProps<{ project: IProject }>()

const { addTasksMutation } = useCreateTask()
const { mutate } = addTasksMutation
const isOpen = ref(false)

const handleCreateTask = async (data: { title: string; description: string; priority: string }) => {
  const id = `t-${new Date().getTime()}`
  const payload = {
    ...data,
    id: id,
    projectId: props?.project?.id,
    createdAt: Date.now(),
    key: `${props?.project?.key + '-' + id.slice(0, 3)}`,
    columnId: 'col-1',
  }
  try {
    mutate(payload)
    isOpen.value = false
  } catch {}
}
</script>

<style lang="scss">
.task-form {
  padding: 16px 0;

  &__field {
    margin-bottom: 16px;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
  }

  &__input,
  &__textarea,
  &__select-trigger {
    width: 100%;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }

  &__button {
    cursor: pointer;
  }
}
.task-sheet {
  padding: 20px;
}
</style>
