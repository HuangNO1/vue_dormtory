<template>
  <div>
    <div style="font-size: 2rem; text-align: center;">Sign In</div>
    <form>
      <!-- name -->
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :success-messages="nameSuccess"
        label="Username"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-account</v-icon>
      </v-text-field>
      <!-- email -->
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        :success-messages="emailSuccess"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-email</v-icon>
      </v-text-field>
      <!-- password -->
      <v-text-field
        v-model="password"
        :type="seePwd"
        :error-messages="passwordErrors"
        :success-messages="passwordSuccess"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      >
        <v-icon slot="prepend" color="green">mdi-lock</v-icon>
        <v-icon slot="append" color="red" @click="eyeClick">{{ eye }}</v-icon>
      </v-text-field>
      <!-- checkbox -->
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>
      <!-- verify -->
      <v-dialog v-model="dialog" width="500" :disabled="openDialog" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-4" color="primary" v-on="on" @click="submit"
            >sign in</v-btn
          >
        </template>
        <v-card>
          <v-card-title class="headline primary white--text" primary-title>
            <p v-if="loginSuccess">Verify</p>
            <p v-if="!loginSuccess">OOPS...</p>
          </v-card-title>

          <v-card-text>
            <div class="verify">
              <slide-verify
                v-if="loginSuccess"
                :l="42"
                :r="10"
                :w="310"
                :h="155"
                slider-text="Swipe right"
                @success="onSuccess"
                @fail="onFail"
                @refresh="onRefresh"
              ></slide-verify>
              <div v-if="!loginSuccess" style="font-size: 1rem;">
                <span>
                  <v-icon color="red" x-large>mdi-alert-circle</v-icon>
                </span>
                <span>Confirm the username and password are correct.</span>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              <span v-if="loginSuccess">Cancel</span>
              <span v-if="!loginSuccess">Got it</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn @click="clear" color="error" class="mr-4">clear</v-btn>
      <!-- 訪客 -->
      <v-btn @click="guest" color="warning" dark>Guest</v-btn><br /><br />
      No account?To <router-link to="/sign/register">sign up</router-link>.
    </form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "axios";
import Cookies from "js-cookie"; // 引入 cookie API
import Vue from "vue";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required },
    email: {
      required,
      email,
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        return true;
      },
    },
    password: { required, minLength: minLength(6) },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data() {
    return {
      msg: "",
    };
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    checkbox: true,
    eye: "mdi-eye-off",
    seePwd: "password",
    dialog: false,
    nameError: true,
    emailError: true,
    passwordError: true,
    // checkboxError: false,
    loginURL: "https://monitor0305.herokuapp.com/account/login",
    searchUserURL: "https://monitor0305.herokuapp.com/account/search",
    loginSuccess: false,
    openDialog: false,
    id: 0,
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      // this.checkboxError = true;
      // this.openDialog = true;
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Username is required.");
      this.nameError = true;
      // this.openDialog = true;
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail.");
      !this.$v.email.required && errors.push("E-mail is required.");
      !this.$v.email.isUnique &&
        errors.push("The e-mail is already registered.");
      this.emailError = true;
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // !this.$v.password.minLength &&
      //   errors.push("Password must have at least 6 letters.");
      !this.$v.password.required && errors.push("Password is required.");
      this.passwordError = true;
      // this.openDialog = true;
      return errors;
    },
    nameSuccess() {
      if (this.name !== "") {
        this.nameError = false;
        console.log("nameSuccess");
      }
    },
    emailSuccess() {
      if (this.email !== "" && this.$v.email.email && this.$v.email.isUnique) {
        this.emailError = false;
        console.log("emailSuccess");
        return "E-mail is OK.";
      }
    },
    passwordSuccess() {
      if (this.password !== "" /*&& this.$v.password.minLength*/) {
        this.passwordError = false;
        console.log("passwordSuccess");
      }
    },
    // checkboxSuccess() {
    //   if (this.checkbox === true && this.$v.checkbox.checked) {
    //     this.checkboxError = false;
    //     console.log("checkboxSuccess");
    //   }
    // }
  },

  methods: {
    submit() {
      this.openDialog = true;
      this.dialog = false;
      this.$v.$touch();
      console.log("this.nameError: " + this.nameError);
      console.log("this.emailError: " + this.emailError);
      console.log("this.passwordError: " + this.passwordError);
      // console.log("this.checkboxError: " + this.checkboxError);
      console.log("this.checkbox: " + this.checkbox);
      if (
        this.nameError === false &&
        this.emailError === false &&
        this.passwordError === false &&
        this.checkbox === true
      ) {
        // submit the login request

        let data = new FormData();
        data.append("username", this.name);
        data.append("email", this.email);
        data.append("password", this.password);
        axios
          .post(this.loginURL, data, {
            headers: { "Content-Type": "form-data" },
            transformRequest: [(data, headers) => data], //預設值，不做任何轉換
          })
          .then((response) => {
            console.log(response);
            console.log(response.data);
            this.loginSuccess = response.data.data;
            this.openDialog = false;
            if (this.loginSuccess) {
              this.dialog = true;
            }
          })
          .catch((error) => {
            console.log(error);

            this.openDialog = false;
            if (this.loginSuccess) {
              this.dialog = true;
            }
          });
      } else {
        this.dialog = false;
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.checkbox = true;
      this.nameError = true;
      this.passwordError = true;
      // this.checkboxError = false;
    },
    eyeClick() {
      if (this.eye === "mdi-eye-off") {
        this.eye = "mdi-eye";
        this.seePwd = "";
      } else {
        this.eye = "mdi-eye-off";
        this.seePwd = "password";
      }
    },
    onSuccess() {
      console.log("Success verity");
      this.dialog = false;

      let data = new FormData();
      data.append("username", this.name);
      axios
        .post(this.searchUserURL, data, {
          headers: { "Content-Type": "multipart/form-data" },
          transformRequest: [(data, headers) => data], //預設值，不做任何轉換
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.id = response.data.msg.id;
          //Vue.$localStorage.set('userID', this.id)
          // 登入狀態存 cookie 7 天 存 username 或是 email
          Cookies.set("userId", this.id, { expires: 7 });
          Cookies.set("username", this.name, { expires: 7 });
        })
        .catch((error) => {
          console.log(error);
        });
      document.location.href = "/admin";
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    },
    guest() {
      document.location.href = "/admin";
    },
  },
};
</script>
<style>
.verify {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: white;
}
</style>
