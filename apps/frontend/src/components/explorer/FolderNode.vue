<script setup lang="ts">
import { ref } from 'vue'
import { useExplorer } from '@/composables/useExplorer'
import type { Folder } from '@/types/folder'

const props = defineProps<{
  folder: Folder
}>()

const expanded = ref(false)

const { openFolder } = useExplorer()

const toggle = () => {
  expanded.value = !expanded.value
}

const selectFolder = () => {
  openFolder(props.folder.id)
}
</script>

<template>
  <div class="pl-2">
    <div class="flex items-center cursor-pointer hover:bg-muted p-1 rounded" @click="selectFolder">
      <span @click.stop="toggle">
        {{ expanded ? '📂' : '📁' }}
      </span>

      <span class="ml-2">
        {{ folder.name }}
      </span>
    </div>

    <div v-if="expanded && folder.children" class="pl-4">
      <FolderNode v-for="child in folder.children" :key="child.id" :folder="child" />
    </div>
  </div>
</template>
