<script lang="ts">
export default { name: 'FolderTree' }
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue' // Tambahkan ref untuk state dropdown
import { useExplorer } from '@/composables/useExplorer'
import type { Folder } from '@/types/folder'

const props = defineProps<{
  // Props ini akan digunakan untuk level rekursi
  folders: Folder[]
  level?: number
}>()

const {
  folders: storeFolders,
  subFolders,
  selectFolder,
  deleteFolder,
  loadTree,
  selectedFolder,
} = useExplorer()
const activeFolders = props.folders || storeFolders

// State untuk dropdown menu
const openDropdownId = ref<number | null>(null)

const toggleDropdown = (id: number, event: Event) => {
  event.stopPropagation() // Mencegah folder terpilih saat klik elipsis
  openDropdownId.value = openDropdownId.value === id ? null : id
}

const handleDelete = async (id: number) => {
  if (confirm('Yakin ingin menghapus folder ini?')) {
    await deleteFolder(id)
    openDropdownId.value = null
  }
}

onMounted(() => {
  // Hanya panggil loadTree jika ini adalah level root (tanpa props) dan data kosong
  if (!props.folders && storeFolders.value.length === 0) {
    loadTree()
  }
})
</script>

<template>
  <!-- <ul :style="{ paddingLeft: level > 0 ? '16px' : '0' }">
    <li v-for="folder in activeFolders" :key="folder.id" class="group relative">
      <div
        class="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-100 rounded"
        :class="{ 'bg-blue-100 font-semibold': selectedFolder?.id === folder.id }"
        @click="toggleFolderInTree(folder)"
      >
        <span class="flex items-center">
          <span class="mr-1">{{ expandedFolders[folder.id] ? '📂' : '📁' }}</span>
          {{ folder.name }}
        </span>

        <button
          @click.stop="toggleDropdown(folder.id)"
          class="px-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ⋮
        </button>
      </div>

      <div
        v-if="openDropdownId === folder.id"
        class="absolute right-0 mt-1 z-10 bg-white border rounded shadow-md w-24"
      >
        <button
          @click="handleDelete(folder.id, $event)"
          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Hapus
        </button>
      </div>

      <FolderTree
        v-if="expandedFolders[folder.id] && subfoldersByParentId[folder.id]"
        :folders="subfoldersByParentId[folder.id]"
        :level="(level || 0) + 1"
      />
    </li>
  </ul> -->

  <ul>
    <li v-for="folder in activeFolders" :key="folder.id" class="mb-1 group relative">
      <div
        class="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-100 rounded"
        @click="selectFolder(folder)"
      >
        <span class="flex items-center">📁 {{ folder.name }}</span>

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

      <div v-if="selectedFolder?.id === folder.id" class="ml-4">
        <FolderTree :folders="subFolders" />
      </div>
    </li>
  </ul>
</template>