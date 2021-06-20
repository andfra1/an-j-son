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
          Components
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item-group
        v-model="selectedItem">
      <v-list-item
          v-for="(item, idx) in items"
          :key="idx"
      >
        <v-list-item-content>
          item {{ idx }}
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

  </v-list>
</template>

<script>
export default {
  name: "builder",
  data() {
    return {
      items: [
        'item', 'item', 'item', 'item', 'item',
      ],
      selectedItem: 0
    }
  }
}
</script>

<style scoped>

.builder {
  flex: 0 1 auto;
}

</style>