<template>
  <v-app>
    <app-bar></app-bar>
    <v-main app>

      <router-view @getProjectEditorData="getProjectEditorData"></router-view>

      <v-snackbar
          v-model="snackbar.opened"
          :timeout="snackbar.timeout"
          :color="snackbar.color"
      >
        <span v-html="snackbar.text"></span>
        <template v-slot:action="{ attrs }">
          <v-btn
              depressed
              v-bind="attrs"
              @click="snackbar.opened = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

    </v-main>

  </v-app>
</template>

<script>
import appBar from './components/app-bar'

export default {
  name: 'App',

  components: {
    appBar
  },

  data: () => ({
    snackbar: {
      opened: false,
      timeout: 4000,
      color: 'primary',
      text: ''
    },
    dd: 'gitara siema!'
  }),
  methods: {
    snackbarEvent(snack) {
      this.snackbar.opened = snack.opened
      this.snackbar.color = snack.color
      this.snackbar.text = snack.text
      this.snackbar.timeout = snack.timeout
    },
    getProjectEditorData(obj){
      console.log('getProjectEditorData: ',obj)
      return obj
    }
  }
};
</script>
