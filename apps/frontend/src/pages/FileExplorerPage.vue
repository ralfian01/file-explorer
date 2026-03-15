<script setup lang="ts">
import FolderTree from '@/components/explorer/FolderTree.vue'
import { useExplorer } from '@/composables/useExplorer'
import type { Folder } from '@/types/folder'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ folders?: Folder[] }>()

const {
  folders: rootFolders,
  selectedFolder,
  subFolders,
  files,
  loading,
  selectFolder,
  addFolder,
  uploadFile,
  deleteFolder,
  deleteFile,
  renameFile,
  renameFolder,
  loadTree,
  goBack,
} = useExplorer()

const foldersToDisplay = computed(() => {
  if (!selectedFolder.value) {
    return rootFolders.value
  }
  return subFolders.value
})

const fileInput = ref<HTMLInputElement | null>(null)

const handleNewFolder = async () => {
  const folderName = prompt('Enter a name for the new folder:')

  if (!folderName || folderName.trim() === '') {
    return
  }
  await addFolder(folderName.trim())
}

const triggerUpload = () => fileInput.value?.click()

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    await uploadFile(target.files[0])
    target.value = ''
  }
}

const activeDropdown = ref<string | null>(null)

const toggleDropdown = (id: number, type: string) => {
  const key = `${type}-${id}`
  activeDropdown.value = activeDropdown.value === key ? null : key
}

const handleRename = (item: any, type: string) => {
  const newName = prompt('Masukan nama baru:', item.name)
  if (newName && newName !== item.name) {
    type === 'folder' ? renameFolder(item.id, newName) : renameFile(item.id, newName)
  }
  activeDropdown.value = null
}

const handleDelete = (item: any, type: string) => {
  if (confirm(`Hapus ${item.name}?`)) {
    type === 'folder' ? deleteFolder(item.id) : deleteFile(item.id)
    activeDropdown.value = null
  }
}

onMounted(() => {
  if (!props.folders && rootFolders.value.length === 0) {
    loadTree()
  }
})

const fileType = (filename: string) => {
  const parts = filename.split('.')
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''

  const formats = {
    videos: ['mp4', 'mov', 'avi', 'wmv'],
    musics: ['mp3', 'wav', 'aac'],
    pictures: ['jpeg', 'jpg', 'png', 'gif', 'svg', 'webp'],
    documents: ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'],
    archives: ['zip', 'rar', '7z', 'tar', 'gz'],
  }

  const icons = {
    videos: '🎬',
    musics: '🎵',
    pictures: '🏞️',
    documents: '📄',
    archives: '📦',
    default: '⚙️',
  }

  for (const [type, extensions] of Object.entries(formats)) {
    if (extensions.includes(ext)) {
      return icons[type]
    }
  }

  return icons.default
}
</script>

<template>
  <div class="flex h-screen">
    <div class="w-72 border-r p-4 overflow-auto">
      <FolderTree />
    </div>

    <div class="flex-1 p-6 overflow-auto">
      <div v-if="loading" class="text-gray-500">Loading content...</div>

      <div v-else>
        <div class="flex justify-between items-center mb-4">
          <button
            v-if="selectedFolder"
            @click="goBack"
            class="p-1 hover:bg-gray-200 rounded text-sm"
          >
            Kembali
          </button>

          <h2 class="text-lg font-semibold">
            {{ selectedFolder ? selectedFolder.name : 'Root' }}
          </h2>

          <div class="flex gap-2">
            <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" />

            <button
              v-if="selectedFolder"
              @click="triggerUpload"
              class="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Upload File
            </button>
            <button
              @click="handleNewFolder"
              class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              New Folder
            </button>
          </div>
        </div>

        <div>
          <div>
            <h3 class="font-medium">Folders</h3>
            <p
              v-if="!foldersToDisplay || foldersToDisplay.length === 0"
              class="text-gray-400 text-sm"
            >
              No folders.
            </p>
            <ul>
              <li
                v-for="folder in foldersToDisplay"
                :key="folder.id"
                class="flex justify-between items-center p-2 hover:bg-gray-50 group"
              >
                <span class="cursor-pointer" @click="selectFolder(folder)"
                  >📁 {{ folder.name }}</span
                >

                <div class="relative">
                  <button
                    @click="toggleDropdown(folder.id, 'folder')"
                    class="opacity-0 group-hover:opacity-100"
                  >
                    ⋮
                  </button>
                  <div
                    v-if="activeDropdown === `folder-${folder.id}`"
                    class="absolute right-0 bg-white border shadow-md z-10 w-24"
                  >
                    <button
                      @click="handleRename(folder, 'folder')"
                      class="block w-full text-left px-2 py-1 hover:bg-gray-100"
                    >
                      Rename
                    </button>
                    <button
                      @click="handleDelete(folder, 'folder')"
                      class="block w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-if="selectedFolder">
            <h3 class="font-medium mt-4">Files</h3>
            <p v-if="files.length === 0" class="text-gray-400 text-sm">No files.</p>
            <ul>
              <li
                v-for="f in files"
                :key="f.id"
                class="flex justify-between items-center p-2 hover:bg-gray-50 group"
              >
                <span>{{ fileType(f.name) }} {{ f.name }}</span>

                <div class="relative">
                  <button
                    @click="toggleDropdown(f.id, 'file')"
                    class="opacity-0 group-hover:opacity-100"
                  >
                    ⋮
                  </button>
                  <div
                    v-if="activeDropdown === `file-${f.id}`"
                    class="absolute right-0 bg-white border shadow-md z-10 w-24"
                  >
                    <button
                      @click="handleRename(f, 'file')"
                      class="block w-full text-left px-2 py-1 hover:bg-gray-100"
                    >
                      Rename
                    </button>
                    <button
                      @click="handleDelete(f, 'file')"
                      class="block w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>