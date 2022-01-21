<template>
    <v-dialog
      v-model="dialog"
      :width="size ? size : 500"
      persistent
      :fullscreen="fullscreen">
        <v-card class="modal_content">
            <v-card-title class="black--text">
                {{ title ? title : '' }}
                <v-spacer></v-spacer>
                <slot name="action" />
                <v-btn icon color="black" @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <slot></slot>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
  name: 'Basemodal',
  props: {
    size: {
      type: Number,
      required: false,
      default: 500
    },
    title: {
      type: String
    },
    fullscreen: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      dialog: true
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

  ::v-deep .v-text-field__details {
    display: none;
    height: 0;
  }

.modal_content {
  ::-webkit-scrollbar{
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
      background: $scrollbar-color;
      border-radius: 1ex;
      -webkit-border-radius: 1ex;
  }

  ::-webkit-scrollbar-corner {
      background: #000;
  }
}
</style>
