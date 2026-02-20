<template>
  <form id="create-task-form" @submit="onSubmit">
    <FieldGroup>
      <VeeField v-slot="{ field, errors }" name="title">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="create-task-form-title"> Название задачи </FieldLabel>
          <Input
            id="create-task-form-title"
            v-bind="field"
            placeholder="Введите краткое название задачи"
            autocomplete="off"
            :aria-invalid="!!errors.length"
          />

          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <VeeField v-slot="{ field, errors }" name="description">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="create-task-form-description"> Описание </FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="create-task-form-description"
              v-bind="field"
              placeholder="Опишите задачу подробнее: требования, детали реализации, ссылки на макеты и т.д."
              :aria-invalid="!!errors.length"
            />
            <InputGroupAddon align="block-end">
              <InputGroupText class="tabular-nums">
                {{ field.value?.length || 0 }}/10000 символв
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <VeeField v-slot="{ field, errors }" name="priority">
        <Field orientation="responsive" :data-invalid="!!errors.length">
          <FieldContent>
            <FieldLabel for="form-vee-select-priority"> Приоритет задачи </FieldLabel>
            <FieldDescription>
              Укажите важность задачи — от этого зависит её положение в списке.
            </FieldDescription>
            <FieldError v-if="errors.length" :errors="errors" />
          </FieldContent>
          <Select
            :name="field.name"
            :model-value="field.value"
            @update:model-value="field.onChange"
          >
            <SelectTrigger
              id="form-vee-select-priority"
              :aria-invalid="!!errors.length"
              class="min-w-[120px]"
            >
              <SelectValue placeholder="Приоритет" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              <SelectSeparator />
              <SelectItem
                v-for="priority in PRIORITIES"
                :key="priority.value"
                :value="priority.value"
              >
                {{ priority.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </VeeField>
    </FieldGroup>

    <div class="create-task-form__btns">
      <Button variant="outline">Отменить</Button>
      <Button type="submit" class="create-task-form__add-btn">Добавить задачу</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/shared/ui/input-group'
import { z } from 'zod'
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/shared/ui/select'
import Button from '@/shared/ui/button/Button.vue'

const emit = defineEmits<{
  submit: [data: { title: string; description: string; priority: string }]
}>()

const PRIORITIES = [
  {
    value: 'low',
    label: 'Низкий',
  },
  {
    value: 'medium',
    label: 'Средний',
  },
  {
    value: 'high',
    label: 'Высокий',
  },
] as const

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string()
      .min(5, { message: 'Название должно содержать минимум 5 символов' })
      .max(100, { message: 'Название не может быть длиннее 100 символов' })
      .trim(),
    description: z
      .string()
      .min(5, { message: 'Описание должно быть не короче 5 символов' })
      .max(10000, { message: 'Описание слишком длинное (максимум 10000 символов)' })
      .trim(),
    priority: z.string().min(1, { message: 'Выберите приоритет задачи из списка' }),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    description: '',
    priority: '',
  },
})

const onSubmit = handleSubmit((data) => {
  console.log(data)
  emit('submit', data)
})
</script>

<style scoped lang="scss">
.create-task-form {

  &__btns {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    gap: 10px;
  }

  &__add-btn {
    flex: 1;
  }
}

#create-task-form-description {
  max-height: 200px;
  overflow-y: auto;
}

</style>
