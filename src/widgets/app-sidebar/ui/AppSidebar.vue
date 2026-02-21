<script setup lang="ts">
import { useProjectsList } from '@/entities/project/model/useProjectList'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'
import { ChevronDown, ChevronUp, GalleryVerticalEnd, Home, Inbox } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const { data: projects } = useProjectsList()

const items = computed(() => [
  { title: 'Главная', url: '/', icon: Home },
  { title: 'Мои задачи', url: '/my-tasks', icon: Inbox },
])

const isExpanded = ref(false)
const VISIBLE_PROJECTS_LIMIT = 1

const projectItems = computed(() => {
  if (!projects.value) return []

  return projects.value.map((project) => ({
    title: project.title,
    id: project.id,
  }))
})

const hasExtraProjects = computed(() => projectItems.value.length > VISIBLE_PROJECTS_LIMIT)

const visibleProjects = computed(() => {
  if (!projects.value) return []

  return isExpanded.value ? projectItems.value : projectItems.value.slice(0, VISIBLE_PROJECTS_LIMIT)
})
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <GalleryVerticalEnd class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Kanban System</span>
              <span class="truncate text-xs">Enterprise</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Меню</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child>
                <RouterLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Проекты</SidebarGroupLabel>
        <SidebarGroupContent>
          <div
            :class="[
              'transition-all duration-300 ease-in-out',
              isExpanded ? 'max-height-60 overflow-y-auto pr-2' : 'max-height-none',
            ]"
            :style="{ maxHeight: isExpanded ? '300px' : 'none' }"
          >
            <SidebarMenu>
              <SidebarMenuItem v-for="project in visibleProjects" :key="project.id">
                <SidebarMenuButton as-child>
                  <RouterLink :to="`/project/${project.id}`">
                    <span>{{ project.title }}</span>
                  </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
          <SidebarMenu v-if="hasExtraProjects">
            <SidebarMenuItem>
              <SidebarMenuButton
                @click="isExpanded = !isExpanded"
                class="text-sidebar-foreground/60 hover:text-sidebar-foreground"
              >
                <component :is="isExpanded ? ChevronUp : ChevronDown" class="size-4 mr-2" />
                <span>{{ isExpanded ? 'Скрыть' : `Еще ${projectItems.length - VISIBLE_PROJECTS_LIMIT}` }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
</template>
