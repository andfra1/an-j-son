<template>
  <v-stepper v-model="stepper.step.current"
             class="v-sheet--outlined elevation-0">
    <v-stepper-header class="v-sheet--outlined elevation-0">
      <v-stepper-step
          :complete="stepper.step.current > 1"
          step="1"
      >
        Nazwa projektu
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
          :complete="stepper.step.current > 2"
          step="2"
      >
        Dodaj strony
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Sprawdź dane
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
            class="mb-12"
            flat
            color="transparent"
        >
          <h2 class="font-weight-light mb-6">
            {{ stepper.items.step.one.header }}
          </h2>
          <v-text-field
              autofocus
              v-model.trim.lazy="stepper.items.step.one.input.value"
              :placeholder="stepper.items.step.one.input.placeholder"
              @input="setProjectName"
              @keydown.enter="nextStep(2)"
              counter
              maxlength="25"
              outlined
              hide-details="auto"
          ></v-text-field>
        </v-card>

        <v-item-group>
          <v-btn
              :color="stepper.button.continue.color"
              :class="stepper.button.continue.class"
              :disabled="!stepper.button.continue.disabled"
              @click="nextStep(2)"
          >
            {{ stepper.button.continue.name }}
          </v-btn>

          <v-btn
              text
              @click="buttonCancelEvent">
            {{ stepper.button.cancel.name }}
          </v-btn>
        </v-item-group>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
            class="mb-12"
            flat
            color="transparent"
        >
          <h2 class="font-weight-light mb-6">
            {{ stepper.items.step.two.header }}
          </h2>
          <!--          autofocus w tym miejscu pieprzy animacje steppera-->
          <v-text-field
              v-model.trim.lazy="stepper.items.step.two.input.value"
              :placeholder="stepper.items.step.two.input.placeholder"
              counter
              maxlength="25"
              outlined
              hide-details="auto"
              @change="setAnotherPage"
          >
          </v-text-field>
          <div v-for="(page, index) in newProject.pages"
               :key="index">
            <v-chip
                close
                class="mb-2 text-body-1 font-weight-light"
                color="secondary"
                label
                @click:close="newProject.pages.splice(index, 1)"
            >
              {{ page }}
            </v-chip>
          </div>
        </v-card>

        <v-item-group>
          <v-btn
              :color="stepper.button.continue.color"
              @click="nextStep(3)"
              :class="stepper.button.continue.class"
          >
            {{ stepper.button.continue.name }}
          </v-btn>

          <v-btn
              :color="stepper.button.prev.color"
              @click="stepper.step.current = 1"
              :class="stepper.button.prev.class"
          >
            {{ stepper.button.prev.name }}
          </v-btn>

          <v-btn text @click="buttonCancelEvent">
            {{ stepper.button.cancel.name }}
          </v-btn>
        </v-item-group>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
            class="mb-12"
            flat
            color="transparent"
        >
          <h2 class="font-weight-light mb-6">{{ stepper.items.step.three.header }}</h2>
          <p>
            Nazwa projektu:
            <br>
            <strong>{{ stepper.items.step.one.input.value }}</strong>
          </p>
          Dodane strony / podstrony:
          <ul>
            <li v-for="page in newProject.pages" :key="page">
              {{ page }}
            </li>
          </ul>
        </v-card>

        <v-item-group>
          <v-btn
              color="primary"
              :class="stepper.button.continue.class"
              @click="setNewProject"
          >
            add project
          </v-btn>

          <v-btn
              @click="stepper.step.current = 2"
              :class="stepper.button.prev.class"
              :color="stepper.button.prev.color"
          >
            {{ stepper.button.prev.name }}
          </v-btn>

          <v-btn
              text
              @click="buttonCancelEvent">
            {{ stepper.button.cancel.name }}
          </v-btn>
        </v-item-group>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  name: "stepper",
  props: {
    projectsNames: Array
  },
  data() {
    return {
      stepper: {
        items: {
          step: {
            one: {
              header: 'Podaj adres strony www lub nadaj nazwę swojemu projektowi',
              input: {
                placeholder: 'adres www lub nazwa projektu',
                value: '',
                unifiedValue: ''
              }
            },
            two: {
              header: 'Podaj nazwy stron i/lub podstron',
              input: {
                placeholder: 'wpisz np. "strona główna", "kontakt"...',
                value: '',
                unifiedValue: ''
              }
            },
            three: {
              header: 'Podsumowanie',
            }
          }
        },
        button: {
          continue: {
            name: 'continue',
            color: 'primary',
            class: 'mr-2',
            disabled: false
          },
          prev: {
            name: 'previous',
            color: 'secondary',
            class: 'mr-2'
          },
          cancel: {
            name: 'cancel',
            color: '',
            class: 'mr-2'
          }
        },
        step: {
          current: 1
        }
      },
      init: {
        projectsNames: this.projectsNames
      },
      newProject: {
        name: '',
        unicodeName: '',
        pages: []
      },
    }
  },
  methods: {
    unicodeNameMaker(string) {
      if (string) {
        const polishLetters = ["ę", "ó", "ą", "ś", "ł", "ż", "ź", "ć", "ń"]
        const latinLetters = ["e", "o", "a", "s", "l", "z", "z", "c", "n"]
        let textSplit = string.toLowerCase()
        textSplit = textSplit.split('')
        let buffer = ''
        textSplit.forEach(function (letter) {
          let letterIndex = polishLetters.indexOf(letter)
          if (letterIndex > -1) {
            letter = latinLetters[letterIndex]
          }
          buffer += letter
        })
        return buffer.replaceAll(/\W+/ig, '-')
            .replace(/^[-]/g, '')
            .replace(/[-]$/g, '')
      }
      console.log('unicodeNameMaker got NOT string parameter \nthe string is an ' + typeof string)
      return false
    },
    snackbarEvent(obj) {
      return this.$emit('snackbarEvent', obj)
    },
    buttonCancelEvent() {
      return this.$emit('buttonCancelEvent', false)
    },
    setProjectName(projectName) {
      this.newProject.name = projectName
      if (projectName && projectName.length > 2) {
        // name of project already exists
        if (this.init.projectsNames.indexOf(projectName) > -1) {
          this.stepper.button.continue.disabled = false
          this.snackbarEvent({
            opened: true,
            color: 'error',
            text: 'Projekt o nazwie <strong>"' + projectName + '"</strong> już istnieje. <br>Podaj inną nazwę.',
            timeout: 0
          })
          return false
        }
        // here we continue making a new project
        // name of project has more than 2 letters and project name doesn't exists
        this.stepper.button.continue.disabled = true
        this.newProject.unicodeName = this.unicodeNameMaker(projectName)
        this.snackbarEvent({
          opened: false,
          timeout: 4000
        })
        return false
      }
      // if name of project already exists or has less than 3 letters
      this.stepper.button.continue.disabled = false
      return false
    },
    setAnotherPage(string) {
      let pageName = string.trim()
      if (pageName && pageName.length > 0) {
        if (this.newProject.pages.indexOf(pageName) > -1) {
          this.snackbarEvent({
            text: 'Strona o nazwie <strong>"' + pageName + '"</strong> została już dodana. <br>Podaj inną nazwę.',
            color: 'error',
            opened: true,
            timeout: 0
          })
          this.stepper.items.step.two.input.value = ''
          return false
        }
        this.newProject.pages.push(pageName)
        this.snackbarEvent({
          opened: false,
          timeout: 4000
        })
        this.stepper.items.step.two.input.value = ''
        return false
      }
    },
    setNewProject() {
      return this.$emit('setNewProject', this.newProject)
    },
    nextStep(step) {
      if (this.stepper.button.continue.disabled) {
        this.stepper.step.current = step
        return false
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>