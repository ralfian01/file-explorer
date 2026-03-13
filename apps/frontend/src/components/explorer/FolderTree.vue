<script setup lang="ts">
import { ref } from 'vue'
import type { Folder } from '@/types/folder'
import { fetchFolderContent } from '@/api/folder.api'

// Props: optional root folders (misal root folder dari store)
const props = defineProps<{
  rootFolders?: Folder[]
  level?: number
}>()

const folders = ref<Folder[]>(props.rootFolders || [])
const expanded = ref<Record<number, boolean>>({}) // track folder yg dibuka
const subfolders = ref<Record<number, Folder[]>>({}) // subfolder per folder
const level = props.level || 0

// Toggle folder expand/collapse & load subfolders
const toggleFolder = async (folder: Folder) => {
  if (expanded.value[folder.id]) {
    expanded.value[folder.id] = false
  } else {
    expanded.value[folder.id] = true

    // Jika subfolder belum di-load, panggil API
    if (!subfolders.value[folder.id]) {
      try {
        const res = await fetchFolderContent(folder.id)
        subfolders.value[folder.id] = res.data.folders
      } catch (err) {
        console.error('Failed to load subfolders:', err)
        subfolders.value[folder.id] = []
      }
    }
  }
}
</script>

<template>
  <ul>
    <li v-for="folder in folders" :key="folder.id" class="mb-1">
      <div
        class="flex items-center cursor-pointer p-1 hover:bg-gray-100 rounded"
        :style="{ paddingLeft: `${level * 16}px` }"
        @click="toggleFolder(folder)"
      >
        <span class="mr-1">{{ expanded[folder.id] ? '📂' : '📁' }}</span>
        {{ folder.name }}
      </div>

      <!-- Recursive render subfolders -->
      <FolderTree
        v-if="expanded[folder.id] && subfolders[folder.id]?.length"
        :root-folders="subfolders[folder.id]"
        :level="level + 1"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import FolderTree from './FolderTree.vue'
export default { components: { FolderTree } }
</script>
