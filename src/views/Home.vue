<template>
  <div>
    <div class="cur-title">
      <div class="cur-name">Счет</div>
      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>


    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    
    <div v-else class="row">
      <HomeBill />
      <HomeCur />
    </div>


  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCur from "@/components/HomeCur";

export default {
  name: "home",
  data: () => ({
    isLoading: false
  }),
  components: { HomeBill, HomeCur }
};
</script>




<style lang="scss" scoped>
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
</style>