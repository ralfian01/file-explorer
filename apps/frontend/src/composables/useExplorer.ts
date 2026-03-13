import { useExplorerStore } from '@/stores/explorer.store'
import { storeToRefs } from 'pinia'

export const useExplorer = () => {
  const store = useExplorerStore()

  const { folders, files, subFolders, loading, selectedFolder } = storeToRefs(store)

  const loadTree = () => store.loadFolderTree()
  const selectFolder = (folder: (typeof folders.value)[0]) => store.selectFolder(folder)

  return {
    folders,
    files,
    subFolders,
    loading,
    selectedFolder,
    selectFolder,
    loadTree,
  }
}
