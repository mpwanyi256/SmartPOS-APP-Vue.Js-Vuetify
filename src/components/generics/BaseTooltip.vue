<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
        <v-btn
          :disabled="disabled"
          :loading="loading"
          :x-small="small"
          icon
          :class="color ? color : 'black--text'" dark
          v-bind="attrs" v-on="on" @click="$emit('button')">
          <v-icon>{{ `mdi-${icon}` }}</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
        </template>
        <span>{{ message }}</span>
    </v-tooltip>
</template>
<script>
export default {
  name: 'BaseTooltip',
  props: {
    message: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
    },
    float: {
      type: String,
      required: false
    },
    small: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: () => false
    },
    loading: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      loader: null
    }
  },
  watch: {
    loader (val) {
      if (!val) {
        const l = this.loader
        this[l] = !this[l]
        this[l] = false
        this.loader = null
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';
    .create_menu_item_icon {
      background-color: $black-text;
    }

    .custom-loader {
      animation: loader 1s infinite;
      display: flex;
    }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
