<template>
  <div>
    <h3>Counter</h3>
    <p>{{ env }}</p>
    <div class="count">
      {{ count }}
    </div>
    <button type="button" @click="add">
      +1
    </button>
    <button type="button" @click="min">
      -1
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
// import { useStore } from 'vuex'
import store from '@/store'

export default defineComponent({
  setup() {
    const env = ref(process.env.NODE_ENV)

    // const store = useStore()
    console.log('🚀 ~ file: App.vue ~ line 14 ~ setup ~ store', store)

    const add = () => {
      store.commit('add')
    }
    const min = () => {
      store.commit('min')
    }

    return reactive({
      count: computed(() => store.state.count),
      add,
      min,
      env
    })
  }
})
</script>

<style lang="scss" scoped>
h3 {
  color: red;
}
.count {
  color: aqua;
}
</style>