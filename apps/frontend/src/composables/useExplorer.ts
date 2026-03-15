import { useExplorerStore } from '@/stores/explorer.store';
import { storeToRefs } from 'pinia';

export const useExplorer = () => {
  const store = useExplorerStore();

  const { folders, files, subFolders, loading, selectedFolder, expandedFolders, subfoldersByParentId } = storeToRefs(store);

  const loadTree = () => store.loadFolderTree();
  const selectFolder = (folder: (typeof folders.value)[0]) => store.selectFolder(folder);
  const addFolder = (name: string) => store.addFolder(name);
  const deleteFolder = (id: number) => store.deleteFolder(id);
  const uploadFile = (file: File) => store.uploadFile(file);
  const deleteFile = (id: number) => store.deleteFile(id);
  const renameFile = (id: number, newName: string) => store.renameFile(id, newName);
  const renameFolder = (id: number, newName: string) => store.renameFolder(id, newName);
  const goBack = () => store.goBack();
  const handleFolderClick = (folder: any) => store.handleFolderClick(folder);

  return {
    folders,
    files,
    subFolders,
    loading,
    selectedFolder,
    expandedFolders,
    subfoldersByParentId,
    selectFolder,
    loadTree,
    addFolder,
    deleteFolder,
    uploadFile,
    deleteFile,
    renameFile,
    renameFolder,
    goBack,
    handleFolderClick
  };
};
