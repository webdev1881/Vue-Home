<template>
  <div class="login" @click="test" >
    <div class="title">Система учета</div>
    <div class="row">
      <form @submit.prevent='onSubmit' class="col s12">

        <div class="row">

          <div class="input-field col s12">

            <input 
              id="email" 
              type="email" 
              class="validate"
              v-model="user.email"
              name="email"
              :class = " { invalid: ($v.user.email.$dirty && !$v.user.email.required) || ($v.user.email.$dirty && !$v.user.email.email) } "
               />          
            <div v-if=" $v.user.email.$error" class="invalid-feedback">
              <span v-if="$v.user.email.$dirty && !$v.user.email.required">Email не должен быть пустым ++</span>
              <span v-if="!$v.user.email.email">Email не верный</span>
            </div>
            <label for="email">Email</label>

          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">

            <input
             id="password"
             type="password"
             class="validate"
             v-model="user.password"
             :class = " { invalid: ($v.user.password.$dirty && !$v.user.password.required) || ($v.user.password.$dirty && !$v.user.password.minLength) } "
             />

             <div v-if="$v.user.password.$error" class="invalid-feedback">
              <span v-if="$v.user.password.$dirty && !$v.user.password.required">Поле пароль не может быть пустым</span>
              <span v-if="$v.user.password.$dirty && !$v.user.password.minLength">Пароль должен быть не менее {{ $v.user.password.$params.minLength.min }} символов</span>
              <span >( {{ user.password.length }} )</span>
            </div>

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
import { log } from 'util';

export default {
  name: 'login',
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        min: 12
        }
    }
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength( 4 ) },
    }
  },
  methods: {
    test() {
    //  console.log( this.user )
    },
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.user.email,
        password: this.user.password
      }
      console.log( formData )

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
    .invalid {
      border-bottom: red;
      box-shadow: 0 1px 0 0 #ef083c;
    }
    .invalid-feedback {
      font-size: .5em;
      color: red;
    }
  }

</style>

