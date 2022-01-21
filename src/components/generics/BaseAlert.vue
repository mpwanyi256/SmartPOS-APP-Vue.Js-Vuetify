<template>
    <v-alert
      v-if="message"
      border="right"
      colored-border
      :type="type"
      elevation="2"
    >
      {{ message }}
    </v-alert>
</template>
<script>
export default {
  name: 'BaseAlert',

  props: {
    message: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: false,
      default: () => 'error'
    }
  }
}
</script>
