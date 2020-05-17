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
                    :disabled="newPasswordError || newRepeatPasswordError || originPassword!=noDisplayPWD"
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

        return true;
      },
    },
    newEmail: {
      required,
      email,
      isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === "") return true;

        return true;
      },
    },
    newPassword: { required, minLength: minLength(6) },
    newRepeatPassword: {
      required,
      sameAsPassword: sameAs("newPassword"),
    },
  },
  data: () => ({
    id: 0,
    username: "",
    avatar: "https://avatars0.githubusercontent.com/u/48636976?s=460&v=4",
    email: "",
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
    // 檢驗是否欄位填寫錯誤
    newUsernameError: true,
    newEmailError: true,
    newPasswordError: true,
    newRepeatPasswordError: true,
    // 檢查是否重複的請求 URL
    checkSameUsernameURL: "",
    checkSameEmailURL: "",
    // 發出更改請求
    newUsernameURL: "https://monitor0305.herokuapp.com/account/update",
    newEmailURL: "https://monitor0305.herokuapp.com/account/update",
    newPasswordURL: "https://monitor0305.herokuapp.com/account/update",
    searchURL: "https://monitor0305.herokuapp.com/account/search",
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

    noDisplayPWD: "",
  }),
  created() {
    let data = new FormData();
    let getName = Cookies.get("username");
    data.append("username", getName);
    axios
      .post(this.searchURL, data, {
        headers: { "Content-Type": "form-data" },
        transformRequest: [(data, headers) => data], //預設值，不做任何轉換
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        this.id = response.data.msg.id;
        this.email = response.data.msg.email;
        this.username = response.data.msg.username;
        this.noDisplayPWD = response.data.msg.password;
      })
      .catch((error) => {
        console.log(error);
      });
  },
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

    submitNewUsername() {
      // axios 提交新使用者名稱
      let data = new FormData();
      data.append("username", this.newUsername);
      data.append("email", this.email);
      data.append("password", this.noDisplayPWD);
      data.append("id", this.id);
      axios
        .put(this.newUsernameURL, data, {
          headers: { "Content-Type": "form-data" },
          transformRequest: [(data, headers) => data], //預設值，不做任何轉換
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          if (response.data.data === false) {
            this.updateUsernameSuccess = false;
            this.changeFailDialog = true;
          } else {
            // 更新前端使用者名稱 關閉 edit
            this.updateUsernameSuccess = true;
            //this.$store.commit(UPDATE_USER_USERNAME, this.newUsername);
            // Cookies 變更
            Cookies.set("username", this.newUsername, { expires: 7 });
            this.username = this.newUsername;
            this.editName();
            // 出現提示窗
            this.snackbar = true;
            this.text = "Your username";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitNewEmail() {
      // axios 提交新 email
      let data = new FormData();
      data.append("username", this.username);
      data.append("email", this.newEmail);
      data.append("password", this.noDisplayPWD);
      data.append("id", this.id);
      axios
        .post(this.newEmailURL, data, {
          headers: { "Content-Type": "form-data" },
          transformRequest: [(data, headers) => data], //預設值，不做任何轉換
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
          if (response.data.data === false) {
            this.updateEmailSuccess = false;
            this.changeFailDialog = true;
          } else {
            // 更前端 email 關閉 edit
            this.updateEmailSuccess = true;
            this.email = this.newEmail;
            this.editEmail();
            // 出現提示窗
            this.snackbar = true;
            this.text = "Your E-mail";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    submitNewPassword() {
      // axios 提交新密碼
      let data = new FormData();
      data.append("username", this.username);
      data.append("email", this.email);
      data.append("password", this.newPassword);
      data.append("id", this.id);
      axios
        .post(this.newPasswordURL, data, {
          headers: { "Content-Type": "form-data" },
          transformRequest: [(data, headers) => data], //預設值，不做任何轉換
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
          if (response.data.data === false) {
            this.updatePassword = false;
            this.changeFailDialog = true;
          } else {
            // 不會在前端更新密碼形式，前端不顯示密碼以保安全
            this.updatePassword = true;
            this.noDisplayPWD = this.newPassword;
            this.editPassword();
            // 出現提示窗
            this.snackbar = true;
            this.text = "your password";
          }
        })
        .catch(error => {
          console.log(error);
        });
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
  },
  watch: {},
};
</script>
