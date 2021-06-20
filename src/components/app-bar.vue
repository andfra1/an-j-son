<template>
  <div>
    <v-app-bar
        app
        color="orange darken-4"
        dark
        fixed
        elevation="0"
        width="100%"
    >
      <v-app-bar-title>
        <strong>
          {{app.name}}
        </strong>
        <br>
        <small>
        {{app.version}}
        </small>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
          @click.stop="drawer.opened = !drawer.opened"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer.opened"
        right
        app
    >

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in drawer.items"
            :key="item.title"
            link
            :to="item.slug"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

        <v-col>
          <v-switch
              v-model="$vuetify.theme.dark"
              label="theme switch"
              hide-details
          >
          </v-switch>
        </v-col>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "app-bar",
  data: () => ({
    app: {
      name: "An-JSON",
      version: "#v 0.01.20210527"
    },
    drawer: {
      opened: false,
      items: [
        {
          title: 'main screen',
          slug: '/',
          icon: 'mdi-account'
        },
        {
          title: 'JSON maker',
          slug: '/json-maker',
          icon: 'mdi-folder-cog'
        },
        {
          title: 'kota',
          slug: '/',
          icon: 'mdi-cog'
        }
      ]
    }
  }),
  mounted() {
    this.$vuetify.theme.dark = true
  }
}
</script>