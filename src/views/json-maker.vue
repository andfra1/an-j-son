<template>
  <v-container>
    <v-row class="d-flex">
      <v-col cols="12">

      </v-col>
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: 'json--m-a-k-e-r',

  data: () => ({
    options: {
      number: {
        default: 0,
        range: {
          from: 0,
          to: 0
        },
        max: 0,
        min: 0,
        random: 0,
        negative: true,
        decimal: false
      },
      string: {
        default: '',
        name: {
          first: ['array', 'of', 'names'],
          last: ['array', 'of', 'names']
        },
        company: ['array','of','fake', 'companies']
      },
      id: {
        simple: 0,
        uid: 'a01'
      },
      icon: {
        md: '',
        fa: ''
      }
    }
}),
}
;
</script>
