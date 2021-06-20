<template>
  <v-list outlined>
    <v-list-item
        v-for="(item, idx) in sections"
        :key="idx"
        :class="idx === selectedSection || selectedSection < 0 ? '' : 'd-none'"
    >
      <v-list-item-content>
        <v-list-item-title>
          {{ "section: " + item.name }}
          <v-text-field
              v-model="tempString"
              placeholder="podaj nazwę"
              label="podaj nazwę"
              counter
              @input="unicodeNameGenerator"
          >
          </v-text-field>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    'sections': Array,
    'selectedSection': Number
  },
  name: "pageEditor",
  data() {
    return {
      displayListItem: false,
      generatedUrl: '',
      tempString: ''
    }
  },
  methods: {
    unicodeNameGenerator(text) {
      if (text) {
        const polishLetters = ["ę", "ó", "ą", "ś", "ł", "ż", "ź", "ć", "ń"]
        const latinLetters = ["e", "o", "a", "s", "l", "z", "z", "c", "n"]
        let textSplit = text.split('')
        let tempText = ''
        textSplit.forEach(function (letter) {
          let letterIndex = polishLetters.indexOf(letter)
          if (letterIndex > -1) {
            letter = latinLetters[letterIndex]
          }
          tempText += letter
        })
        return this.tempString = this.urlMaker(tempText)
      }
      return this.tempString = this.urlMaker('zażółć gęślą jaźń !1!1!-{}:":10-a2')
    },
    urlMaker(string) {
      let t = string.toLowerCase()
      return t.replaceAll(/\W+/ig, '-')
          .replace(/^[-]/g, '')
          .replace(/[-]$/g, '')
    },
  }
}
</script>

<style scoped>

</style>