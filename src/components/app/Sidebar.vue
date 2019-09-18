<template>
  <ul @click.prevent="$emit('hideSide')" class=" app-sidenav" :class="{open: value}">

    <router-link     
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      {title: 'Счет', url: '/', exact: true},
      {title: 'История', url: '/history'},
      {title: 'Новая запись', url: '/record'},
      {title: 'Категории', url: '/categories'}
    ]
  }),


}
</script>


<style lang="scss" >

.open {
  margin-left: 0 !important; 
} 

.app-sidenav {
  margin-left: -300px;
  padding-top: 5px ;
  margin-top: 0;
  margin-bottom: 0;
  width: 300px;
  font-size: 1.4em;
  transition: all .4s;
  border-right: solid gray 1px;

  a {
    width: 100%;
    color: #094a69;
    padding: 10px 0 10px 30px;
    &:hover {
      background-color: #dee6ec;
      }
  }


}

// @media (max-width: 992px) {
//   .open {
//     background-color: red;
//     position: absolute;
//     top: 60px;
//     bottom: 0;
//     left: -300px;
//   }
// }




</style>
