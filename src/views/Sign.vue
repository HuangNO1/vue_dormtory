<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
          <span class="display-1" style="font-weight:bold;">Dormitory </span>
        </div>
      </v-app-bar>
      <!-- Sizes your content based upon application components -->
      <v-content id="content">
        <!-- If using vue-router -->
        <div class="flexBox">
          <div class="signCard">
            <router-view></router-view>
          </div>
        </div>
      </v-content>
      <v-footer
        id="footer"
        absolute
        class="font-weight-medium"
        color="primary lighten-1"
        app
      >
        <v-col class=" text-center white--text">
          {{ new Date().getFullYear() }} — <strong>Dormitory</strong>
        </v-col>
      </v-footer>
    </v-app>
    <!--
    <v-btn color="success" to="/sign/register">register</v-btn>
    <v-btn color="success" to="/sign/login">login</v-btn>
    single-line
    <router-view></router-view>-->
  </div>
</template>
<script>
export default {
  components: {},

  data: () => ({
    //
  }),
  created() {},
  methods: {
    Home() {
      document.location.href = "/introduce";
    },
  },
};
</script>
<style>
#bar {
}
#content {
  background: url("../assets/img/sign-background.jpg") no-repeat fixed center
    center/cover;
}
#footer {
  opacity: 70%;
}
.icon {
  display: absolute;
  top: 3rem;
  left: 3rem;
}
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}
.signCard {
  width: 30rem;
  background-color: white;
  opacity: 80%;
  box-shadow: 0 0 50px black;
  padding: 2rem;
  border-radius: 3px;
}
</style>
