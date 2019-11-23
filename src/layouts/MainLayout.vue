<template>
  <div class="app-main-layout">
    <Navbar @tagSide="isOpen = !isOpen" />

    <div class="main" @click="hideMobile">
      <Sidebar v-model="isOpen" :class="{mob: isMobile}" @hideSide="hideMobile" />

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      
    </div>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: Boolean,
    isMobile: Boolean
  }),

  async mounted() {
    if (window.innerWidth < 900) {
      this.isOpen = false;
      this.isMobile = true;
    } else {
      this.isOpen = true;
      this.isMobile = false;
    }
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchinfo");
    }
  },

  methods: {
    hideMobile() {
      if (this.isMobile) {
        this.isOpen = false;
      }
    }
  },

  components: {
    Navbar,
    Sidebar
  }
};
</script>

<style lang="scss" scoped>
.app-main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main {
    flex-grow: 1;
    display: flex;
  }

  .app-content {
    flex-grow: 1;
    padding: 25px;
  }
}

.mob {
  position: absolute;
  top: 62px;
  bottom: 0;
  background-color: #e8ebf9;
  z-index: 2;
  li {
    color: white;
  }
}
</style>