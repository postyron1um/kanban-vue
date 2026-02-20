<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger as-child>
      <Button>Добавить задачу</Button>
    </SheetTrigger>
    <SheetContent side="right" class="task-sheet">
      <SheetHeader>
        <SheetTitle>Создание задачи</SheetTitle>
        <SheetDescription>
          Заполните поля чтобы создать новую задачу. После создания она появится в колонке.
        </SheetDescription>
      </SheetHeader>

      <form @submit.prevent="handleSubmit" class="task-form">
        <div class="task-form__field">
          <Label for="title" class="task-form__label">Название</Label>
          <Input
            id="title"
            v-model="form.title"
            placeholder="Введите название задачи"
            required
            class="task-form__input"
          />
        </div>
        <div class="task-form__field">
          <Label for="description" class="task-form__label">Описание</Label>
          <Textarea
            id="description"
            v-model="form.description"
            placeholder="Описание (необязательно)"
            class="task-form__textarea"
          />
        </div>
        <div class="task-form__field">
          <Label for="priority" class="task-form__label">Приоритет</Label>
          <Select v-model="form.priority">
            <SelectTrigger class="task-form__select-trigger">
              <SelectValue placeholder="Выберите приоритет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Низкий</SelectItem>
              <SelectItem value="medium">Средний</SelectItem>
              <SelectItem value="high">Высокий</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="task-form__actions">
          <SheetClose as-child>
            <Button
              type="button"
              variant="outline"
              class="task-form__button task-form__button--cancel"
              >Отмена</Button
            >
          </SheetClose>
          <Button type="submit" class="task-form__button task-form__button--submit"
            >Создать задачу</Button
          >
        </div>
      </form>
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
  SheetClose,
} from '@/shared/ui/sheet'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select'
import { taskApi } from '@/entities/task/api/task.api'
import type { TCreateTask } from '@/entities/task/model/task.types'
import type { IProject } from '@/entities/project'

const isOpen = ref(false)

const props = defineProps<{ project: IProject }>()

const form = ref<TCreateTask>({
  title: '',
  description: '',
  priority: 'medium',
  id: '',
  key: '',
  projectId: props?.project?.id,
  createdAt: '',
  columnId: '',
})

// TODO: При добавление задачи добавлять в колонку с ордером 1
const handleSubmit = async () => {
  form.value.id = `t-${new Date().getTime()}`
  form.value.key = `${props?.project?.key + '-' + form.value.id.slice(0, 3)}`
  console.log(form.value)
  // try {
  //   await taskApi.createTask(form.value as TCreateTask)

  //   isOpen.value = false

  //   form.value = { title: '', description: '', priority: 'medium' }
  // } catch (error) {
  //   console.error('Ошибка при создании задачи:', error)
  // }
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
