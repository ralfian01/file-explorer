<script lang="ts">
export default { name: 'FolderTree' }
</script>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useExplorer } from '@/composables/useExplorer'
import type { Folder } from '@/types/folder'

import FolderTree from './FolderTree.vue'

const props = defineProps<{
  folders?: Folder[]
  level?: number
}>()

const {
  folders: storeFolders,
  deleteFolder,
  loadTree,
  subfoldersByParentId,
  expandedFolders,
  selectedFolder,
  handleFolderClick,
} = useExplorer()

const activeFolders = computed(() => {
  if (props.folders && props.folders.length > 0) {
    return props.folders
  }
  return storeFolders.value
})

const openDropdownId = ref<number | null>(null)

const toggleDropdown = (id: number, event: Event) => {
  event.stopPropagation()
  openDropdownId.value = openDropdownId.value === id ? null : id
}

const handleDelete = async (id: number) => {
  if (confirm('Yakin ingin menghapus folder ini?')) {
    await deleteFolder(id)
    openDropdownId.value = null
  }
}

onMounted(() => {
  if (!props.folders && storeFolders.value.length === 0) {
    loadTree()
  }
})
</script>

<template>
  <ul :style="{ paddingLeft: level ? `${level * 16}px` : '0px' }">
    <li v-for="folder in activeFolders" :key="folder.id" class="group relative">
      <div
        class="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-100 rounded"
        :class="{ 'bg-blue-100 font-semibold': selectedFolder?.id === folder.id }"
        @click="handleFolderClick(folder)"
      >
        <span class="flex items-center">
          <span class="mr-1 w-5 text-center">{{ expandedFolders[folder.id] ? '📂' : '📁' }}</span>
          {{ folder.name }}
        </span>

        <button
          @click.stop="toggleDropdown(folder.id, $event)"
          class="px-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ⋮
        </button>
      </div>

      <div
        v-if="openDropdownId === folder.id"
        class="absolute right-0 z-10 bg-white border rounded shadow-md w-24"
      >
        <button
          @click.stop="handleDelete(folder.id)"
          class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
        >
          Hapus
        </button>
      </div>

      <FolderTree
        v-if="expandedFolders[folder.id] && subfoldersByParentId[folder.id]?.length > 0"
        :folders="subfoldersByParentId[folder.id]"
        :level="(level || 0) + 1"
      />
    </li>
  </ul>
</template>