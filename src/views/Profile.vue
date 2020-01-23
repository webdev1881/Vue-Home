<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form">
      <div class="input-field">
        <input id="description" type="text" />
        <label for="description">Имя</label>
      </div>

      <button @click.prevent="onSubmit" class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>

    <draggable v-model="categories"
      :categories="categories"
      class="collection"
      ghost-class="ghost"
      :move="checkMove"
      group="people"
      @start="drag=true"
      @end="drag=false"
    >
      <div
        class="collection-item"
        v-for="element in categories" 
        :key="element.id">
        {{element.title}}
      </div>
    </draggable>

  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "profile",
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    
  },
  methods: {

    async onSubmit() {
      await this.$store.dispatch('updateCategories', this.categories)
    },
    checkMove: function(e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);        
    }
  },

  components: {
    draggable
  }
};
</script>


<style lang="scss" scope>

  .collection-item {
    cursor: move;
  }

</style>