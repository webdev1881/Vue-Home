<template>
  <div class="login">
    <div class="title">Система учета</div>
    <div class="row">
      <form @submit.prevent="onSubmit" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              v-model="user.email"
              name="email"
              :class=" { invalid: ($v.user.email.$dirty && !$v.user.email.required) || ($v.user.email.$dirty && !$v.user.email.email) } "
            />
            <div v-if=" $v.user.email.$error" class="invalid-feedback">
              <span
                v-if="$v.user.email.$dirty && !$v.user.email.required"
              >Email не должен быть пустым ++</span>
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
              :class=" { invalid: ($v.user.password.$dirty && !$v.user.password.required) || ($v.user.password.$dirty && !$v.user.password.minLength) } "
            />

            <div v-if="$v.user.password.$error" class="invalid-feedback">
              <span
                v-if="$v.user.password.$dirty && !$v.user.password.required"
              >Поле пароль не может быть пустым</span>
              <span
                v-if="$v.user.password.$dirty && !$v.user.password.minLength"
              >Пароль должен быть не менее {{ $v.user.password.$params.minLength.min }} символов</span>
              <span>( {{ user.password.length }} )</span>
            </div>

            <label for="password">Password</label>
          </div>
        </div>

        <button class="btn 12-columns waves-effect waves-light" type="submit" name="action">
          ВОЙТИ
          <i class="material-icons right">send</i>
        </button>

        <button class="btn btn-prov google" @click.prevent="onGoogle">
          <a href="#" class="fa fa-google"></a>
          <span>Sign in with Google</span>
        </button>

        <button class="btn btn-prov twitter" @click.prevent="onTweetter">
          <a href="#" class="fa fa-twitter"></a>
          <span>Sign in with Twitter</span>
        </button>

        <button class="btn btn-prov" @click.prevent="togglePhone">
          <a href="#" class="fa fa-phone"></a>
          <span>Sign in with Phone</span>
        </button>

        <p class="no-account">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </form>

      <div v-if="phone" class="phone-form">
        <div class="phone-close">
          <i class="fa fa-window-close" @click.prevent="togglePhone" ></i>
        </div>
        <h4>Phone</h4>
        <div class="phone">
          <span>+38 </span> <input type="text" placeholder="phone Number" v-model="phNo" value="123" />
        </div>       
        <br />
        <button class="btn" @click="onPhone">Login</button>
        <div id="recaptcha-container"></div>
      </div>

    </div>
  </div>
</template>


<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import messages from "../utils/messages";

export default {
  name: "login",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        min: 12
      },
      phone: false,
      phNo: '',
    };
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(1) }
    }
  },
  mounted() {
    let msgz = this.$route.query.message;
    msgz ? this.$message(messages[msgz]) : null;
  },
  computed: {
    // isFormEnable: function() {
    //   if (!this.$v.$invalid) {
    //   return  false
    //   }
    //   return true
    // }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.user.email,
        password: this.user.password
      };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {}
    },
    async onGoogle() {
      try {
        await this.$store.dispatch("loginGoogle");
        this.$router.push("/");
      } catch (e) {}
    },
    togglePhone() {           
      this.phone = !this.phone;
    },
    async onPhone() {
      this.phone = true;
      try {
        await this.$store.dispatch("loginPhone", this.phNo);
        //  this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    }
  },

  beforeDestroy() {
    this.msg = null;
  }
};
</script>




<style lang="scss">
.login {
  width: 40%;
  min-width: 340px;
  background-color: #fff;
  padding: 1em;
  .btn {
    width: 100%;
    margin-bottom: 5px;
  }
  .btn-prov {
    background-color: #55acee;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    span {
      font-size: 16px;
      margin-left: 20px;
      color: white;
    }
    a {
      font-size: 26px;
      color: white;
    }
  }

  .no-account {
    font-size: 16px;
  }
  .invalid {
    border-bottom: red;
    box-shadow: 0 1px 0 0 #ef083c;
  }
  .invalid-feedback {
    font-size: 0.5em;
    color: red;
  }
  .phone-form {
    background-color: #fff;
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 30px;
    .phone {
      display: flex;
      align-items: center;
    }
    .phone > span {
      font-size: 20px;
      padding-right: 10px;
      padding-bottom: 10px;
    }
    .phone-close > i {
      cursor: pointer;
      font-size: 30px;
      float: right;
    }
  }
  
  
}
</style>

