<template>
  <div class="login">
    <div class="title">Система учета</div>
    <div class="row">
      <form @submit.prevent='onSubmit' class="col s12">

        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" />
            <label for="email">Email</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate" />
            <label for="password">Password</label>
          </div>
        </div>

        <button class="btn 12-columns waves-effect waves-light" type="submit" name="action">
          ВОЙТИ
          <i class="material-icons right">send</i>
        </button>

        <p class="no-account">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>

      </form>
    </div>
  </div>
</template>


<script>

import { required, email, minLength, sameAs } from "vuelidate/lib/validators"

export default {
  name: 'login',
  methods: {
    onSubmit() {
      console.log( this );
    }
  } 
}

</script>

scr


<style lang="scss">
  .login {
    width: 40%;
    min-width: 340px;
    background-color: #fff;
    font-size: 2em;
    padding: 1em;  
    .btn {
      width: 100%;
    };
    .no-account {
      font-size: .6em;
    }
  }

</style>

