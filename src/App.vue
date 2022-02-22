<template>
  <div>
    <img
      src="./assets/logo.png"
      alt=""
    >
    <router-link to="/home">
      home
    </router-link>
    <span>----</span>
    <router-link to="/about">
      about
    </router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    console.log(process.env)
    
    return {}
  }
})
</script>

<style scoped>
</style>