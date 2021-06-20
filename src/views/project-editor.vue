<template>
  <v-container @getProjectEditorData="$emit('getProjectEditorData')">
    <v-row class="d-flex">
      <v-col cols="2">
        <builder></builder>
      </v-col>
      <v-col cols="10">
        <pages :pages="loggedUser[0].user.projects[selectedProject].pages"></pages>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userProjects from '../data/user-projects.json';
import elementor from '../data/elementor-mockup.json';
import pages from '../components/pages';
import builder from '../components/elementor';

export default {
  name: 'project-editor',

  components: {
    pages,
    builder,
  },

  data: () => ({
    loggedUser: userProjects,
    elements: elementor,
    selectedProject: 0
  }),
};
</script>
