<template>
    <table>
        <thead>
          <tr >
            <th>#</th>
            <th>Сумма</th>
            <th>Дата</th>
            <th>Категория</th>
            <th>Тип</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for=" (record, i) of rec" 
            :key="record.id">
            <td> {{ i + 1 }} </td>
            <td> {{ record.amount }} </td>
            <td> {{ record.date | date() }} </td>
            <td> {{ record.categoryName }} </td>
            <td>
              <span class="white-text badge type" :class=" {
                 'red': record.type === 'outcome',
                 'green': record.type === 'income'
                 } " >
                  {{  record.type === 'income' ? "Доход" : "Расход"  }}</span>
            </td>
            <td>
              <button class="btn-small btn">
                <i class="material-icons">open_in_new</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
</template>

<script>
export default {
  props: ['rec'],
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),

  async mounted() {
//    console.log( this );
    
  }
}


</script>





<style scoped>
  .type {
    min-width: 5rem;
  }
  
</style>