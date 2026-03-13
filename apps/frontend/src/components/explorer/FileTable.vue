<script setup lang="ts">
import { useExplorer } from '@/composables/useExplorer'

const { files } = useExplorer()
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-3">Files</h2>

    <div class="space-y-2">
      <div v-for="file in files" :key="file.id" class="flex justify-between border p-2 rounded">
        <span> 📄 {{ file.name }} </span>

        <span class="text-muted-foreground text-sm"> {{ Math.round(file.size / 1024) }} KB </span>
      </div>
    </div>
  </div>
</template>
