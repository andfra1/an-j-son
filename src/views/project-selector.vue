<template>
  <v-container>
    <v-row v-if="project.list && !project.makeNew">
      <v-col>
        <h2 class="font-weight-light mb-2">
          Project list<br>
          <small>select below or make
            <v-btn
                color="primary"
                class="ml-2"
                outlined
                small
                text
                @click="project.makeNew=true"
            >
              <v-icon left>
                mdi-file-plus-outline
              </v-icon>
              new project
            </v-btn>
          </small>
        </h2>
        <v-list outlined>
          <v-list-item-group>
            <v-list-item
                v-for="(project,index) in project.list"
                :key="index"
                selectable
                @input="dd($event)"
            >

              <v-list-item-icon>
                <v-icon color="primary">
                  mdi-file-outline
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <router-link :to="'/project-editor/' + project.unicodeName">
                  {{ project.name }}
                </router-link>
              </v-list-item-content>

              <v-list-item-action>
                <v-item-group>
                  <v-btn
                      text
                      color="error"
                      x-small
                      @click="removeProject(index)"
                  >
                    <v-icon
                        small
                        left
                    >
                      mdi-file-remove-outline
                    </v-icon>
                    remove
                  </v-btn>
                  <v-btn
                      text
                      color="info"
                      x-small
                      @click="changeProject(index)"
                  >
                    <v-icon
                        small
                        left
                    >
                      mdi-file-edit-outline
                    </v-icon>
                    change
                  </v-btn>
                </v-item-group>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <stepper
            @snackbarEvent="snackbarEvent"
            @buttonCancelEvent="buttonCancelEvent"
            @setNewProject="addProject"
            :projects-names="projectListOnlyNames"
        ></stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import projectList from '../data/projcet-list.json'
import Stepper from "./stepper";

export default {
  name: 'project-selector',

  components: {
    Stepper
  },

  data: () => ({
    snackbar: {
      opened: false,
      timeout: 4000,
      color: 'primary',
      text: ''
    },
    project: {
      list: projectList,
      makeNew: false
    }
  }),
  methods: {
    snackbarEvent(snack) {
      this.snackbar.opened = snack.opened
      this.snackbar.color = snack.color
      this.snackbar.text = snack.text
      this.snackbar.timeout = snack.timeout
    },
    buttonCancelEvent(val) {
      this.project.makeNew = val
    },
    addProject(obj) {
      this.project.makeNew = false
      this.project.list.push(obj)
    },
    removeProject(index) {
      this.project.list.splice(index, 1)
    },
    changeProject(index) {
      console.log(this.project.list[index])
    },
    dd(ev){
      this.$emit(ev)
    }
  },
  computed: {
    projectListOnlyNames() {
      return this.project.list.map((item) => {
        return item.name.toLowerCase()
      })
    }
  }
};
</script>
