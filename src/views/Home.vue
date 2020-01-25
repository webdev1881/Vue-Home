<template>

  <div>
    <div class="cur-title">
      <div class="cur-name">Счет</div>
      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons" @click="refresh" >refresh</i>
      </button>
    </div>


    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    
    <div v-else class="row">
      <HomeBill :rates='cur' />
      <HomeCur :rates='cur' />
    </div>


  </div>

</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCur from "@/components/HomeCur";



export default {
  name: "home",
  data: () => ({
    USD: '',
    EUR: '',
    isLoading: true,
   cur: {},
    currencies: null,
  }),
  async mounted() {
    this.currencies = await this.$store.dispatch('fetchCur')    
    this.cur = {
      USD: {
        "buy": (+this.currencies[0].buy).toFixed(2),
        "sale": (+this.currencies[0].sale).toFixed(2)
      },
      EUR: {
        "buy": (+this.currencies[1].buy).toFixed(2),
        "sale": (+this.currencies[1].sale).toFixed(2)
      }
    }    

    this.isLoading = false

  },
  methods: {
    async refresh() {
      this.isLoading = true
      this.currencies = await this.$store.dispatch('fetchCur')    
      this.isLoading = false
    }
  },
  components: { HomeBill, HomeCur }
};
</script>




<style lang="scss" scoped>

.btn {
  min-width: 45px;
}
.cur-title {
  display: flex;
  align-items: center;
  padding: 15px;
  justify-content: space-between;
  .cur-name {
    font-size: 40px;
  }
}
  .load {
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
       
  @media screen and (max-width: 833px) {
    .bill {
      width: 100%;
    } 
  }
</style>