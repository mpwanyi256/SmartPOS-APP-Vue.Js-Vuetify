<template>
    <div class="nav_section">
        <div>
            <p>{{ title ? title : 'Quick links' }}</p>
        </div>
        <div v-for="(link, i) in links" :key="i" @click="gotToPage(link)"
            class="link" :class="{ 'active': isActivePath(link.path) }">
            <v-icon :class="isActivePath(link.path) ? 'black--text' : 'grey--text'">
              {{ link.icon }}</v-icon>
            <div :class="isActivePath(link.path) ? 'black--text' : 'grey--text'">
              {{ link.name }}</div>
        </div>
        <slot name="logout"></slot>
    </div>
</template>
<script>
export default {
  name: 'SalesNavBar',
  props: {
    links: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: false
    }
  },
  computed: {
    activePath () {
      return this.$route.name
    }
  },
  methods: {
    gotToPage (link) {
      this.$router.push({ name: link.path })
    },
    isActivePath (path) {
      // eslint-disable-next-line eqeqeq
      return path == this.activePath
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .nav_section {
        width: 100%;
        height: 100%;
        background-color: inherit;
        // margin: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-left: 10px;
        font-size: 14px;
        font-family: $font-style;
        transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
        font-size: 14px;
        line-height: 1.14286;
        font-weight: 600;
        letter-spacing: .011em;
        color: $black;

        > div {
          height: 36px;
          width: 100%;
          line-height: 1.5;
          display: inline-flex;
          flex-direction: row;
          gap: 3px;
          border-radius: 5px;
          justify-content: left;
          align-items: center;
          text-align: center;
          cursor: pointer;
          padding-left: 15px;
          margin-bottom: 5px;
          color: $black !important;
        }

        > div:first-child, > div:first-child:hover {
          border-radius: 0;
          font-weight: bold;
          font-size: 16px;
          border: none;
          cursor: default;
          background-color: inherit;
        }

        .active {
          background-color: #dbdbdb;
        }

        > div:hover {
            background-color:#dddddd;
        }
    }
</style>
