<template>

  <div class="header">
    <a href="#" @click.prevent="$emit('tagSide')" >
      <i class="lines material-icons black-text">dehaze</i>
      <span> {{date | date }} </span>
    </a>
    

    <a 
      class='dropdown-trigger drop'
      data-target='dropdown'
      ref='dropd' 
      >
      {{name}}
      <i class="material-icons right">arrow_drop_down</i>
    </a>

    <ul id='dropdown' class='dropdown-content'>
      <li><router-link to="/profile"><i class="material-icons">account_box</i>Профиль</router-link></li>
      <li><a href="#!"  @click.prevent="logout" ><i class="material-icons">label_outline</i>Выйти</a></li>
    </ul>

  </div>        

</template>


<script>

//  import { materialize } from '../..main/'

  export default {
    data: () => ({
      date: new Date(),
      interval: null,
      dropdown: null
    }),

    methods: {
      async logout() {     
        await this.$store.dispatch('logout')
        this.$router.push('/login?message=logout')
      }
    },
    computed: {
      name() {
        return this.$store.getters.info.name
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.date = new Date()
      }, 1000)
 

        this.dropdown = M.Dropdown.init(this.$refs.dropd, {
        constrainWidth: false
      })

      
    
    
         
    },

    beforeDestroy() {
      M.Toast.dismissAll()
      clearInterval(this.interval)
      if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()      }
      
    }
  }
</script>


<style lang="scss">

  .header {
    width: 100%;
    background-color: #609ca9;
    justify-content: space-between;
    min-height: 60px;
    height: 7vh;
    display: flex;
    align-items: center;
    padding: 0 20px 0 20px;
    box-shadow: 0 0 4px 0;

    a {
      display: flex;
      align-items: center;
      color: black;
      span {
        font-size: 18px;
        margin-left: 15px;;
      }
    }

    .drop {
      display: flex;
      align-items: center;
      color: black;
      font-size: 20px;
    }

    .nav-right {
      font-size: 20px;
    }

    .lines {
      font-size: 32px;
    }


  }

  

</style>