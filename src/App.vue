<template>
  <div id="app">
    <div class="d-flex">
      <Sidebar>
        <div class="sidebar-panel-nav">
          <div class="sidebar-panel-logo">
            <img src="./assets/logo.png" />
            <div>Mercans</div>
          </div>
          <div v-for="item in menuLinks" :key="item.title">
            <router-link
              v-if="item.path"
              :to="item.path"
              class="link"
              :class="{ active: item.path === $route.name }"
            >
              {{ item.title | titleize }}
            </router-link>
            <div v-if="!item.path" class="link">
              {{ item.title | titleize }}
            </div>
          </div>
        </div>
      </Sidebar>
      <Burger></Burger>
      <router-view class="p-30"></router-view>
    </div>
  </div>
</template>

<script>
import Burger from "./components/burger-menu.vue";
import Sidebar from "./components/sidebar-menu.vue";
import menuLinks from "./menuLinks.json";

export default {
  name: "App",
  components: {
    Burger,
    Sidebar,
  },
  data() {
    return {
      menuLinks,
    };
  },
  filters: {
    titleize(value) {
      return value
        .replace(/_/g, " ")
        .replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase());
    },
  },
};
</script>
<style lang="scss">
html {
  height: 100%;
  overflow: hidden;
}

body {
  border: 0;
  margin: 0;
  padding: 0;
  font-family: "Lato";
  height: 100%;
  background: #f4f6f8;
}

.main-nav {
  display: flex;
  justify-content: space-between;
}

.link {
  color: #182d4b;
  text-decoration: none;
  font-size: 1rem;
  display: block;
  padding-bottom: 0.5em;
}
.d-flex {
  display: flex;
}
.p-30 {
  padding: 30px;
}
.active {
  color: #f9b399;
}
.sidebar-panel-logo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  img {
    width: 100px;
  }
  div {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>