<script setup lang="ts">
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/shared/ui/sidebar'
import AppSidebar from '@/widgets/app-sidebar/ui/AppSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4" id="header-content">
        <SidebarTrigger class="-ml-1" />
      </header>

      <main class="flex-1 pl-4">
        <RouterView />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
main {
  background-color: hsl(var(--background));
}
#header{
  width:100%;

}
</style>
