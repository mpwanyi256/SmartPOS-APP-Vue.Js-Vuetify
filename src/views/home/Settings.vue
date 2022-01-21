<template>
    <div class="settings">
      <v-progress-linear v-if="loading" indeterminate color="black" />
      <div
        v-for="action in actions"
        :key="`sync-action-${action.id}`"
        @click="performSync(action)"
      >
        <div class="icon">
          <v-btn icon large>
            <v-icon color="black">{{ action.icon }}</v-icon>
          </v-btn>
        </div>
        <div class="name">
          {{ action.name }}
        </div>
      </div>
    </div>
</template>
<script>
import dataSyncMixin from '@/mixins/dataSync'

export default {
  name: 'Settings',

  mixins: [dataSyncMixin],

  data () {
    return {
      actions: [
        {
          icon: 'mdi-cog',
          name: 'Sync Menu Items',
          id: 1
        }
      ]
    }
  },

  methods: {
    performSync (action) {
      const ID = action.id
      switch (ID) {
        case 1:
          this.syncMenuItems()
          break
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';
@import '@/styles/pos.scss';

  .settings {
    width: 100%;
    height: calc(100vh - 52px);
    display: flex;
    flex-direction: column;
    gap: 10px;

    > div {
      background-color: $white;
      display: inline-flex;
      justify-content: left;
      align-items: center;
      gap: 10px;
      margin: 0px 5px;
      cursor: pointer;
      box-shadow: $elevation-low;
      border-radius: 5px;

      .name {
        font-size: 18px;
        color: $black;
      }
    }

    > div:hover {
      background-color: $header;
    }
  }
</style>
