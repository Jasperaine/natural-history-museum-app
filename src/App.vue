<template>
  <div id="app">
    <div class="top-nav-container">
      <div class="title-container">
        <VueFontawesome icon="book" size="2" color="black" class="title-icon" />
        <h1>Natural History Museum</h1>
      </div>
      <Tabs
        v-for="tab in tabs"
        :key="tab.value"
        :tab="tab"
        @selected="selectTab"
      />
    </div>
    <!-- If I was building this app for production I would add filters and a search bar here
    to allow the user to find specific highlights provide a better UX
    (could add a "category" to each highlight e.g "comets", "planets", "asteroids" etc which could be filtered by) -->
    <router-view></router-view>
  </div>
</template>

<script>
import SpaceTab from "./views/Space.vue";
import Tabs from "./components/Tab.vue";
export default {
  name: "App",
  components: {
    SpaceTab,
    Tabs
  },
  data() {
    return {
      tabs: [
        {
          label: "Space",
          route: "space",
          icon: "rocket",
          selected: true
        },
        {
          label: "Dinosaurs",
          route: "dinosaurs",
          icon: "paw",
          selected: false
        },
        {
          label: "Wildlife",
          route: "wildlife",
          icon: "leaf",
          selected: false
        },
        {
          label: "Oceans",
          route: "oceans",
          icon: "tint",
          selected: false
        }
      ]
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        if (tab.route === selectedTab.route) {
          this.$set(tab, "selected", true);
        } else if (tab.selected) {
          this.$set(tab, "selected", false);
        }
      });
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  // If I was creating this for production I would create dedicated scss files and create variables
  // for colours, fonts, and general styles that are going to be reused throughout the app.
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 100px;

  .top-nav-container {
    padding: 20px 20px 0 20px;
    background-color: #f6f6f6;
  }

  .title-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .title-icon {
      margin-right: 10px;
    }
  }
}
</style>
