<template>
  <div class="container mx-auto">
    <!-- <h1>Color mode: {{ $colorMode.value }}</h1> -->


    <slot />
  </div>
</template>

<script setup>
  useColorMode()
</script>

<style>
body {
  background-color: #fff;
  color: #141416;
}
.dark-mode body {
  background-color: #141416;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>