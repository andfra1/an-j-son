<template>
  <div class="rs-tabs">
    <div class="d-flex align-center">
      <v-subheader>
        strony:
      </v-subheader>
      <v-tabs v-model="tabs.selectedTab" hide-slider>
        <v-tab
            v-for="(item,idx) in pages"
            :key="idx"
            @click="setDefaultSelectedSection"
            active-class="v-sheet--outlined theme--dark theme--light"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="tabs.selectedTab">
      <v-tab-item
          v-for="(item,idx) in pages"
          :key="idx"
      >
        <v-card flat class="d-flex" :data-item="item.name" outlined>
          <v-container>
            <v-row>
              <v-col cols="9">
                <PageEditor :sections="item.sections"
                            :selectedSection="selectedSection"
                            class="rs-tabs"></PageEditor>
              </v-col>
              <v-col cols="3">
                <Sections :sections="item.sections"
                          @emmitedSelectedSection="getEmmitedSelectedSection">
                </Sections>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import PageEditor from "./pageEditor";
import Sections from './sections';

export default {
  props: {
    pages: Array
  },
  name: "pages",
  components: {
    PageEditor,
    Sections
  },
  data() {
    return {
      tabs: {
        selectedTab: 0, //0 = default / null also is default
      },
      defaultSelectedSection: -1,
      selectedSection: this.defaultSelectedSection
    }
  },
  methods: {
    getEmmitedSelectedSection(val) {
      console.log('getEmmitedSelectedSection runs');
      return this.selectedSection = val
    },
    setDefaultSelectedSection() {
      return this.selectedSection = this.defaultSelectedSection
    }
  }
}


</script>

<style scoped>
.rs-tabs {
  flex: 1 0 0
}
</style>