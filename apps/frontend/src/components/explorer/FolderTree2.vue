<script setup lang="ts">
import { ref } from 'vue'
import type { Folder } from '@/types/folder'
import { fetchFolderContent } from '@/api/folder.api'

// Penting: Definisi komponen rekursif yang benar
// Ini memungkinkan komponen untuk mereferensikan dirinya sendiri di template
import FolderTree from './FolderTree.vue'

// Props: optional root folders (misal root folder dari store)
const props = defineProps<{
  rootFolders?: Folder[]
  level?: number
}>()

const folders = ref<Folder[]>(props.rootFolders || [])
const expanded = ref<Record<number, boolean>>({}) // track folder yg dibuka
const subfolders = ref<Record<number, Folder[]>>({}) // subfolder per folder
const level = props.level || 0

// Watcher untuk rootFolders agar komponen bereaksi jika props berubah
// Ini penting jika rootFolders dapat berubah dari parent
watch(
  () => props.rootFolders,
  (newRootFolders) => {
    if (newRootFolders) {
      folders.value = newRootFolders
    }
  },
  { immediate: true } // Jalankan sekali saat inisialisasi
)

// Toggle folder expand/collapse & load subfolders
const toggleFolder = async (folder: Folder) => {
  if (expanded.value[folder.id]) {
    expanded.value[folder.id] = false
  } else {
    expanded.value[folder.id] = true

    // Jika subfolder belum di-load, panggil API
    // Atau jika Anda ingin selalu me-refresh, hapus kondisi ini
    if (!subfolders.value[folder.id] || subfolders.value[folder.id]?.length === 0) {
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

// Jika Anda ingin memberikan data dummy untuk pengujian awal, Anda bisa membuatnya di sini
// Contoh:
if (folders.value.length === 0 && level === 0) {
  folders.value = [
    { id: 1, name: 'Root Folder 1' },
    { id: 2, name: 'Root Folder 2' },
  ]
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
        v-if="expanded[folder.id]"
        :root-folders="subfolders[folder.id]"
        :level="level + 1"
      />
    </li>
  </ul>
</template>