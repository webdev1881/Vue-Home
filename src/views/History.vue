<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length" > Голяк </p>

    <section v-else >
      <HistoryTable :rec="records" />
    </section>
  </div>
</template>


<script>
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "history",
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),

  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
      //  console.log( this.records );    
  },

  

  components: {
    HistoryTable
  }
};
</script>

