<template>

  <div class="col s12 m12 l4 bill">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <!-- <p
          v-for="cur of curencies"
          :key="cur"
          class="currency-line">
          <span> {{ getCur(cur)  | cur(cur)   }} <hr> </span>            
        </p> -->

        <p class="currency-line"><span> {{ base | cur() }} <hr> </span></p>
        <p class="currency-line"><span> {{ (base/rates.USD.buy).toFixed(0) | cur('USD') }} <hr> </span></p>
        <p class="currency-line"><span> {{ (base/rates.EUR.buy).toFixed(0) | cur('EUR') }} <hr> </span></p>


      </div>
    </div>
  </div>

</template>


<script>
export default {
  props: ['rates'],
  data: () => ({
    bill: '',
    curencies: ["UAH", "USD", "EUR"]
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill
    }
  },
  methods: {

  },
  async mounted() {
  //  console.log( this.rates );
  }
}
</script>

<style lang="scss">
    .currency-line {
      padding-top: 15px;
    }
</style>