<template>
  <v-app>
    <vue-scroll-progress-bar height="3px" />
    <v-navigation-drawer
      dark
      v-model="drawer"
      :color="primary"
      :mini-variant="miniVariant"
      src="../assets/img/admin-nav-1.jpg"
      fixed
      app
    >
      <!-- -->
      <v-list nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://avatars0.githubusercontent.com/u/48636976?s=460&v=4" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Dormitory</v-list-item-title>
            <!--<v-list-item-subtitle>Best Store</v-list-item-subtitle>-->
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <!-- 側邊欄 -->
        <v-list-item
          v-if="!loginSuccess"
          v-for="item in adminItems"
          :key="item.title"
          :to="item.routerLink"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar src="../assets/img/admin-nav-1.jpg" dark app>
      <!-- -->
      <v-app-bar-nav-icon @click="miniMenu"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <v-badge
          bordered
          bottom
          color="success"
          dot
          offset-x="20"
          offset-y="10"
        >
          <v-avatar size="36" style="margin-right: 1rem;">
            <img
              alt="Avatar"
              src="https://avatars0.githubusercontent.com/u/48636976?s=460&v=4"
            />
          </v-avatar>
        </v-badge>
        Administrator
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      // 判斷側邊欄是否能見
      drawer: true,
      // 側邊欄 items
      adminItems: [
        { title: "Dashboard", icon: "mdi-view-dashboard", routerLink: "/admin/dashboard" },
        { title: "Notify", icon: "mdi-bell", routerLink: "/admin/notify" },
        { title: "User", icon: "mdi-account", routerLink: "/admin/user" },
      ],
      miniVariant: false
    };
  },
  methods: {
    toIntroduct() {
      document.location.href = "/introduce";
    },
    miniMenu() {
      // open menu
      if (this.menuIsClose === true) {
        console.log("enter open");
        this.miniVariant = false;
        this.drawer = true;
        this.menuIsClose = false;
      } else {
        // close menu
        console.log("enter close");
        if (this.drawer === true) {
          this.miniVariant = true;
          // can't mini variant
          if (this.miniVariant === false) {
            // just close menu
            this.drawer = false;
          } else {
            this.drawer = true;
          }
          this.menuIsClose = true;
        } else {
          // menu is close, open it.
          this.miniVariant = false;
          this.drawer = true;
          this.menuIsClose = false;
        }
      }
      console.log("draw - " + this.drawer);
      console.log("miniVariant - " + this.miniVariant);
    }
  },
  computed: {}
};
</script>
