<template>
<div>
  <Loader v-if="loading"/>
  <div v-else class="app-main-layout">
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
</div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from '@/utils/messages'

export default {
  name: "main-layout",
  data: () => ({
    isOpen: Boolean,
    isMobile: Boolean,
    loading: true
  }),

  async mounted() {
    if (window.innerWidth < 900) {
      this.isOpen = false;
      this.isMobile = true;
    } else {
      this.isOpen = true;
      this.isMobile = false;
    }
    if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
      await this.$store.dispatch('fetchinfo')
      this.loading = false
    }
    


  },

  methods: {
    hideMobile() {
      if (this.isMobile) {
        this.isOpen = false;
      }
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error( erFB ) {
      this.$error( messages[erFB.code] || "Что то пошло не так" )
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
//  height: 100vh;
  .main {
    display: flex;
    height: 92vh;
    // position: fixed;
    // right: 0;
    // left: 0;
    // top: 60px;
    // bottom: 0;
  }

  .app-content {
    flex-grow: 1;
    padding: 25px;
  }
}

.mob {
  position: absolute;
  top: 63px;
  bottom: 0;
  background-color: #e8ebf9;
  z-index: 2;
  li {
    color: white;
  }
}
</style>