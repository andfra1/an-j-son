<template>
  <v-list
      class="builder"
      outlined
  >

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
            class="title"
        >
          Sections
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item-group
        v-model="selectedItem">

      <v-list-item
          @click="emmitSelectedSection(-1)"
          key="_all"
      >
        <v-list-item-content>
          pokaż wszystkie sekcje
        </v-list-item-content>
      </v-list-item>

      <v-list-item
          v-for="(item, idx) in sections"
          :key="idx"
          @click="emmitSelectedSection(idx)"
      >
        <v-list-item-content>
          item {{ item.name }}
        </v-list-item-content>
      </v-list-item>

    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    sections: Array
  },
  name: "sections",
  data() {
    return {
      selectedItem: -1
    }
  },
  methods: {
    emmitSelectedSection(val) {
      this.selectedItem = val
      return this.$emit('emmitedSelectedSection', val)
    }
  }
}
</script>

<style scoped>
.builder {
  flex: 0 1 auto;
}
</style>