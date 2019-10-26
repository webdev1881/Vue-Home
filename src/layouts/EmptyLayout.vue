<template>
  <div class="gray">
    <router-view />
  </div>
</template>

<script>

import messages from '@/utils/messages'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error( erFB ) {
      console.log( erFB.code )
      this.$error( messages[erFB.code] )
    //  debugger
      }
    }
  }
</script>


<style lang="scss">
.gray {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #58799a;
}
.error-msg {
  background-color: red !important;
}
</style>