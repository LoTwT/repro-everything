<script setup lang="ts">
const { data } = await useAsyncData('resume', () => queryContent('/resume').findOne())
</script>

<template>
  <div>
    <ContentRenderer :value="data ?? {}" />
  </div>
</template>
