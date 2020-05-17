<template>
  <div>
    <v-row justify="center">
      <v-col md="auto">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1,
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              max-width="300"
              class="mx-auto mb-4"
              :elevation="hover ? 24 : 3"
            >
              <v-img max-width="300" :src="avatar"></v-img>
            </v-card>
          </v-hover>
        </v-lazy>
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1,
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
          ><v-hover v-slot:default="{ hover }">
            <v-card
              max-width="300"
              max-height="300"
              class="mx-auto mb-4"
              :elevation="hover ? 24 : 3"
            >
            </v-card>
          </v-hover>
        </v-lazy>
      </v-col>

      <!--  - - - - - - right data- - - - - - - - - - - - - - - - - - -    -->
      <v-col md="6">
        <!-- username -->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1,
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-account</v-icon>
                Username
              </v-card-title>
              <v-card-text>
                <v-btn @click="editName" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{ username }}
              </v-card-text>
              <!-- edit name -->
              <v-lazy
                v-model="isActiveEditName"
                :options="{
                  threshold: 1,
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditName">
                  <v-text-field
                    label="Username"
                    v-model="newUsername"
                    :error-messages="newUsernameErrors"
                    :success-messages="newUsernameSuccess"
                    :counter="20"
                    required
                    @input="$v.newUsername.$touch()"
                    @blur="$v.newUsername.$touch()"
                    outlined
                  ></v-text-field>
                  <v-btn text color="red" @click="editName">cencel</v-btn>
                  <v-btn
                    text
                    color="green"
                    :disabled="newUsernameError"
                    @click="submitNewUsername"
                    >save</v-btn
                  >
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>

        <!-- email -->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1,
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-email</v-icon>
                E-mail
              </v-card-title>
              <v-card-text>
                <v-btn icon>
                  <v-icon @click="editEmail">mdi-pencil</v-icon>
                </v-btn>
                {{ email }}
              </v-card-text>
              <!-- edit email -->
              <v-lazy
                v-model="isActiveEditEmail"
                :options="{
                  threshold: 1,
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditEmail">
                  <v-text-field
                    v-model="newEmail"
                    label="E-mail"
                    :error-messages="newEmailErrors"
                    :success-messages="newEmailSuccess"
                    required
                    @input="$v.newEmail.$touch()"
                    @blur="$v.newEmail.$touch()"
                    outlined
                  ></v-text-field>
                  <!-- email 需要驗證 -->
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="captcha"
                        :counter="4"
                        :error-messages="captchaErrors"
                        :success-messages="captchaSuccess"
                        label="Captcha"
                        required
                        outlined
                        @input="$v.captcha.$touch()"
                        @blur="$v.captcha.$touch()"
                      >
                        <v-icon slot="prepend" color="green"
                          >mdi-alpha-c-circle</v-icon
                        >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-btn
                        block
                        class="ma-2"
                        color="primary"
                        :loading="loading"
                        @click="loader = 'loading'"
                        rounded
                        dark
                        x-large
                        >Get Captcha</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-btn text color="red" @click="editEmail">cencel</v-btn>
                  <v-btn
                    text
                    color="green"
                    :disabled="captchaError || newEmailError"
                    @click="submitNewEmail"
                    >save</v-btn
                  >
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>

        <!-- password -->
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 1,
          }"
          transition="slide-x-reverse-transition"
          origin="top right 50"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 3" class="mb-4">
              <v-card-title>
                <v-icon class="mr-4">mdi-lock</v-icon>
                Password
              </v-card-title>
              <v-card-text>
                <v-btn @click="editPassword" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{ password }}
              </v-card-text>
              <!-- edit password -->
              <v-lazy
                v-model="isActiveEditPassword"
                :options="{
                  threshold: 1,
                }"
                transition="slide-x-reverse-transition"
                origin="top right 50"
              >
                <v-card-text v-if="clickEditPassword">
                  <v-text-field
                    v-model="originPassword"
                    label="Origin Password"
                    type="password"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="newPassword"
                    label="New Password"
                    :type="seePwd"
                    :error-messages="newPasswordErrors"
                    :success-messages="newPasswordSuccess"
                    required
                    @input="$v.newPassword.$touch()"
                    @blur="$v.newPassword.$touch()"
                    outlined
                  >
                    <v-icon slot="append" color="red" @click="eyeClick">
                      {{ eye }}
                    </v-icon>
                  </v-text-field>
                  <v-text-field
                    v-model="newRepeatPassword"
                    label="Repeat New Password"
                    :type="seeRepeatPwd"
                    :error-messages="newRepeatPasswordErrors"
                    :success-messages="newRepeatPasswordSuccess"
                    required
                    @input="$v.newRepeatPassword.$touch()"
                    @blur="$v.newRepeatPassword.$touch()"
                    outlined
                  >
                    <v-icon slot="append" color="red" @click="repeatEyeClick">{{
                      repeatEye
                    }}</v-icon>
                  </v-text-field>
                  <v-btn text color="red" @click="editPassword">cencel</v-btn>
                  <v-btn
                    text
                    color="green"
                    :disabled="newPasswordError || newRepeatPasswordError"
                    @click="submitNewPassword"
                    >save</v-btn
                  >
                </v-card-text>
              </v-lazy>
            </v-card>
          </v-hover>
        </v-lazy>
      </v-col>
    </v-row>

    <!-- 修改成功提示窗 -->
    <v-snackbar v-model="snackbar" top :timeout="3000">
      {{ text }} have changed.
      <v-btn color="pink" icon fab @click="snackbar = false">
        <v-icon dark>mdi-close-circle</v-icon>
      </v-btn>
    </v-snackbar>
    <!-- 修改失敗 提示窗口 -->
    <v-dialog v-model="changeFailDialog" max-width="600">
      <v-card>
        <v-card-title class="headline red--text">OOPS...</v-card-title>

        <v-card-text>
          Your action is fail, please check your data you filled is right.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="changeFailDialog = false">
            Got it.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import myUpload from "../components/vue-image-crop-upload/upload-2";

import Cookies from "js-cookie"; // 引入 cookie API
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
  withParams,
} from "vuelidate/lib/validators";
import Vue from "vue";
import axios from "axios";

export default {
  mixins: [validationMixin],

  validations: {
    newUsername: {
      required,
      maxLength: maxLength(20),
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        // axios : verity the username is registered.
        /*
        var params = new URLSearchParams();
        params.append("username", this.newUserame);
        axios
          .post(this.checkSameNameURL, params)
          .then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data === false) {
              return false;
            } else {
              return true;
            }
          })
          .catch(error => {
            console.log(error);
          });
        */

        // simulate async call, fail for all logins with even length
        return true;
      },
    },
    newEmail: {
      required,
      email,
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        // axios : verity the email is registered.
        /*
        var params = new URLSearchParams();
        params.append("email", this.newEmail);
        axios
          .post(this.checkSameEmailURL, params)
          .then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data === false) {
              return false;
            } else {
              return true;
            }
          })
          .catch(error => {
            console.log(error);
          });
          */
        // simulate async call, fail for all logins with even length
        return true;
      },
    },
    newPassword: { required, minLength: minLength(6) },
    newRepeatPassword: {
      required,
      sameAsPassword: sameAs("newPassword"),
    },
    captcha: {
      required,
      maxLength: maxLength(4),
      minLength: minLength(4),
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;
        // axios : verity the captcha is true.
        /*
        var params = new URLSearchParams();
        params.append("captcha", this.captcha);
        axios
          .post(this.verifyCaptchaURL, params)
          .then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data === false) {
              return false;
            } else {
              return true;
            }
          })
          .catch(error => {
            console.log(error);
          });
        */
        // simulate async call, fail for all logins with even length
        return true;
      },
    },
  },
  data: () => ({
    username: "Huang Po-Hsun",
    avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
    email: "fh831.cp9gw@gmail.com",
    password: "********",

    isActive: false,
    // 判斷是否顯示編輯
    editAvatarDialog: false,
    clickEditName: false,
    isActiveEditName: false,
    clickEditEmail: false,
    isActiveEditEmail: false,
    clickEditPassword: false,
    isActiveEditPassword: false,
    // 新的資料
    newUsername: "",
    newEmail: "",
    originPassword: "",
    newPassword: "",
    newRepeatPassword: "",
    captcha: "",
    // 檢驗是否欄位填寫錯誤
    newUsernameError: true,
    newEmailError: true,
    newPasswordError: true,
    newRepeatPasswordError: true,
    captchaError: true,
    // 檢查是否重複的請求 URL
    checkSameUsernameURL: "",
    checkSameEmailURL: "",
    // 發出更改請求
    newUsernameURL: "",
    newEmailURL: "",
    newPasswordURL: "",

    // 驗證碼按鈕的 loading 判斷變數
    loader: null,
    loading: false,
    // 是否可見 密碼
    eye: "mdi-eye-off",
    repeatEye: "mdi-eye-off",
    seePwd: "password",
    seeRepeatPwd: "password",
    // 是否更改成功

    updateUsernameSuccess: false,
    updateEmailSuccess: false,
    updatePassword: false,
    // 修改成功提示
    snackbar: false,
    text: "",
    // 修改失敗
    changeFailDialog: false,

    SMMSuploadUrl: "https://sm.ms/api/upload",
  }),
  created() {},
  methods: {
    editName() {
      this.clickEditName = !this.clickEditName;
      console.log("this.clickEditName: " + this.clickEditName);
      this.$v.newUsername.$reset();
      this.newUsername = "";
      // this.isActiveEditName = false;
    },

    editEmail() {
      this.clickEditEmail = !this.clickEditEmail;
      console.log("this.clickEditEmail: " + this.clickEditEmail);
      this.$v.newEmail.$reset();
      this.newEmail = "";
      this.captcha = "";
      // this.isActiveEditEmail = false;
    },

    editPassword() {
      this.clickEditPassword = !this.clickEditPassword;
      console.log("this.clickEditPassword: " + this.clickEditPassword);
      this.$v.newPassword.$reset();
      this.$v.newRepeatPassword.$reset();
      this.originPassword = "";
      this.newPassword = "";
      this.newRepeatPassword = "";
      // this.isActiveEditPassword = false;
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
    repeatEyeClick() {
      if (this.repeatEye === "mdi-eye-off") {
        this.repeatEye = "mdi-eye";
        this.seeRepeatPwd = "";
      } else {
        this.repeatEye = "mdi-eye-off";
        this.seeRepeatPwd = "password";
      }
    },

    // 發送更改資料 都以傳送 email 作為更改資料搜索使用者的依據
    submitNewUsername() {
      // axios 提交新使用者名稱
      // var params = new URLSearchParams();
      // params.append("newUsername", this.newUsername);
      // params.append("email", this.email);
      // axios
      //   .post(this.newUsernameURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updateUsernameSuccess = false;
      //       this.changeFailDialog = true;
      //     } else {
      //       // 更新前端使用者名稱 關閉 edit
      //       this.updateUsernameSuccess = true;
      //       this.$store.commit(UPDATE_USER_USERNAME, this.newUsername);
      //       this.editName();
      //       // 出現提示窗
      //       this.snackbar = true;
      //       this.text = "Your username";
      //       // Cookies 變更
      //       Cookies.set('userStatus', this.user.name)
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updateUsernameSuccess = true;
      this.$store.commit(UPDATE_USER_USERNAME, this.newUsername);
      this.editName();
      // 出現提示窗
      this.snackbar = true;
      this.text = "Your username";
    },

    submitNewEmail() {
      // axios 提交新 email
      // var params = new URLSearchParams();
      // params.append("newEmail", this.newEmail);
      // params.append("email", this.email);
      // axios
      //   .post(this.newEmailURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updateEmailSuccess = false;
      //       this.changeFailDialog = true;
      //     } else {
      //       // 更前端 email 關閉 edit
      //       this.updateEmailSuccess = true;
      //       this.$store.commit(UPDATE_USER_EMAIL, this.newEmail);
      //       this.editEmail();
      //       // 出現提示窗
      //       this.snackbar = true;
      //       this.text = "Your E-mail";
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updateEmailSuccess = true;
      this.$store.commit(UPDATE_USER_EMAIL, this.newEmail);
      this.editEmail();
      // 出現提示窗
      this.snackbar = true;
      this.text = "your E-mail";
    },

    submitNewPassword() {
      // axios 提交新密碼
      // var params = new URLSearchParams();
      // params.append("oringinPassword", this.originPassword);
      // params.append("newPassword", this.newPassword);
      // params.append("email", this.email);
      // axios
      //   .post(this.newPasswordURL, params)
      //   .then(response => {
      //     console.log(response);
      //     console.log(response.data);
      //     if (response.data === false) {
      //       this.updatePassword = false;
      //       this.changeFailDialog = true;
      //     } else {
      //       // 不會在前端更新密碼形式，前端不顯示密碼以保安全
      //       this.updatePassword = true;
      //       this.editPassword();
      //       // 出現提示窗
      //       this.snackbar = true;
      //       this.text = "your password";
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // 假設測試成功
      this.updatePassword = true;
      this.editPassword();
      // 出現提示窗
      this.snackbar = true;
      this.text = "Your password";
    },
  },
  computed: {
    newUsernameErrors() {
      const errors = [];
      if (!this.$v.newUsername.$dirty) return errors;
      !this.$v.newUsername.maxLength &&
        errors.push("Username must be at most 10 characters long.");
      !this.$v.newUsername.required && errors.push("Username is required.");
      !this.$v.newUsername.isUnique &&
        errors.push("The username is already registered.");
      this.newUsernameError = true;
      return errors;
    },
    newEmailErrors() {
      const errors = [];
      if (!this.$v.newEmail.$dirty) return errors;
      !this.$v.newEmail.email && errors.push("Must be valid e-mail.");
      !this.$v.newEmail.required && errors.push("E-mail is required.");
      !this.$v.newEmail.isUnique &&
        errors.push("The e-mail is already registered.");
      this.newEmailError = true;
      return errors;
    },
    captchaErrors() {
      const errors = [];
      if (!this.$v.captcha.$dirty) return errors;
      !this.$v.captcha.minLength && errors.push("must have 4 letters.");
      !this.$v.captcha.maxLength && errors.push("must have 4 letters.");
      !this.$v.captcha.required && errors.push("captcha is required.");
      !this.$v.captcha.isUnique && errors.push("Captcha isn't true.");
      this.captchaError = true;
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength &&
        errors.push("Password must have at least 6 letters.");
      !this.$v.newPassword.required && errors.push("Password is required.");
      this.newPasswordError = true;
      return errors;
    },
    newRepeatPasswordErrors() {
      const errors = [];
      if (!this.$v.newRepeatPassword.$dirty) return errors;
      !this.$v.newRepeatPassword.sameAsPassword &&
        errors.push("Password must be identical.");
      !this.$v.newRepeatPassword.required &&
        errors.push("Password must be identical.");
      this.newRepeatPasswordError = true;
      return errors;
    },
    newUsernameSuccess() {
      if (
        this.newUsername !== "" &&
        this.$v.newUsername.maxLength &&
        this.$v.newUsername.isUnique
      ) {
        this.newUsernameError = false;
        console.log("nameSuccess");
        return "Username is OK.";
      }
    },
    newEmailSuccess() {
      if (
        this.newEmail !== "" &&
        this.$v.newEmail.email &&
        this.$v.newEmail.isUnique
      ) {
        this.newEmailError = false;
        console.log("emailSuccess");
        return "E-mail is OK.";
      }
    },
    newPasswordSuccess() {
      if (this.newPassword !== "" && this.$v.newPassword.minLength) {
        this.newPasswordError = false;
        console.log("passwordSuccess");
        return "Password is OK.";
      }
    },
    newRepeatPasswordSuccess() {
      if (
        this.newRepeatPassword !== "" &&
        this.$v.newRepeatPassword.sameAsPassword
      ) {
        this.newRepeatPasswordError = false;
        console.log("repeatPasswordSuccess");
        return "Repeat is OK.";
      }
    },
    captchaSuccess() {
      if (
        this.captcha !== "" &&
        this.$v.captcha.minLength &&
        this.$v.captcha.maxLength &&
        this.$v.captcha.isUnique
      ) {
        this.captchaError = false;
        console.log("captchaSuccess");
        return "Captcha is OK.";
      }
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
      console.log("loding");
      // request captcha
      // request captcha
      /*var params = new URLSearchParams();
      params.append("email", this.email);
      axios
        .post(this.requestCaptchaURL, params)
        .then(response => {
          console.log(response);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });*/
    },
  },
};
</script>
