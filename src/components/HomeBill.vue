<template>

    <div class="col s12 m12 l4 bill">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p
            v-for="cur of curencies"
            :key="cur"
            class="currency-line">
            <span> {{ getCur(cur)  | cur(cur)   }} <hr> </span>
            
          </p>

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
    getCur(currency) {
      return Math.floor(this.base/(this.rates[currency] || 1 ) )
    }
  },
  async mounted() {
    //this.bill = await this.$store.getters.info.bill
    // this.curencies = [
    //   +this.bill,
    //   Math.floor(+this.bill/+this.rates.USD),
    //   Math.floor(+this.bill/+this.rates.EUR),
    // ]
    // Object.keys(this.curencies)
    //console.log( this.base )
  }
}
</script>

<style lang="scss">
    .currency-line {
      padding-top: 15px;
    }
</style>