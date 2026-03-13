<script setup lang="ts">
import FolderTree from '@/components/explorer/FolderTree.vue'
import { useExplorer } from '@/composables/useExplorer'

const { selectedFolder, subFolders, files, loading, selectFolder } = useExplorer()
</script>

<template>
  <div class="flex h-screen">
    <div class="w-72 border-r p-4 overflow-auto">
      <FolderTree />
    </div>

    <div class="flex-1 p-6 overflow-auto">
      <div v-if="loading" class="text-gray-500">Loading content...</div>

      <div v-else>
        <h2 class="text-lg font-semibold mb-2">
          {{ selectedFolder ? selectedFolder.name : 'Select a folder' }}
        </h2>

        <div>
          <h3 class="font-medium">Subfolders</h3>
          <ul class="space-y-1">
            <li
              v-for="sf in subFolders"
              :key="sf.id"
              class="p-1 hover:bg-gray-100 rounded cursor-pointer"
              @click="selectFolder(sf)"
            >
              📁 {{ sf.name }}
            </li>
          </ul>

          <h3 class="font-medium mt-4">Files</h3>
          <ul class="space-y-1">
            <li v-for="f in files" :key="f.id" class="p-1 hover:bg-gray-100 rounded">
              📄 {{ f.name }} ({{ f.size }} bytes)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
