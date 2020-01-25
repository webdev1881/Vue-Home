<template>
  <div class="col s12 m12 l8 cur">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Покупка</th>
              <th>Продажа</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>USD</td>
              <td> {{ rates.USD.buy }} </td>
              <td> {{ rates.USD.sale }} </td>
            </tr>
            <tr>
              <td>EUR</td>
              <td> {{ rates.EUR.buy }} </td>
              <td> {{ rates.EUR.sale }} </td>
            </tr>
          </tbody>
          
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    date: new Date(),
  }),
  mounted() {
    
  }
}

</script>


<style lang="scss">
    .cur {
        min-width: 240px;
    }
</style>