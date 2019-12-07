<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler"> 
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span 
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
              id="descript"
              type="text"
              v-model="descript"
          >
          <label for="descript">Описание</label>

        </div>

        <button class="btn waves-effect waves-light upd" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>

        <button @click.prevent="deleteCat" class="btn waves-effect waves-light del" type="submit">
          Удалить
          <i class="material-icons right">send</i>
        </button>

      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    descript: '',
    current: null
  }),
  validations: {
    title: {required},
  },
  watch: {
    current(catId) {
      const {title, descrip} = this.categories.find(c => c.id === catId)
      this.title = title
      this.descrip = descrip
    }
  },
  created() {
    const {id, title, descrip} = this.categories[0]
    this.current = id
    this.title = title
    this.descrip = descrip
  },
  methods: {
    async submitHandler() {     
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          descript: this.descript || ''
        }
         console.log(categoryData);
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория упешно обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {
        console.log(e);       
      }
    },
    async deleteCat() {     

      try {
        let id = this.current          
        await this.$store.dispatch('deleteCategory', id)
        this.$message('Категория упешно удалена')
        this.$emit('delete', id)
      } catch (e) {
        console.log(e);       
      }
    }
  },
  async mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
     await M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style lang="scss">

  .input-field {
    margin: 0;
  }
  .upd {
    margin-right: 20px;
  }


</style>
