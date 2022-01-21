<template>
    <div class="base-loading">
      <slot />
    </div>
</template>

<script>
export default {
  name: 'BaseLoading',

  mounted () {
    this.populateElementStyles(this.$attrs)
  },

  methods: {
    populateElementStyles (styles) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in styles) {
        if (key === 'styles') {
          this.populateElementStyles(styles[key])
        } else {
          this.$el.style[key] = styles[key]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/constants.scss';

    .base-loading {
        position: relative;
        display: inline-block;
        overflow: hidden;
        background-color: $quaternary;
        border-radius: $corner-radius;

        &::after {
            display: block;
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translateX(-100%);
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .3), transparent);
            animation: loading 1s infinite;
        }
    }

    @keyframes loading {
        100% {
            transform: translateX(100%);
        }
    }
</style>
