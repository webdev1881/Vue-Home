<template>

  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <component :is="layout">

        <router-view />

    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'Empty') + "Layout";
    }
  },

  components: {
    EmptyLayout,
    MainLayout
  }
};
</script>



<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
