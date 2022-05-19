<template>
    <div class="addons-list">
      <BaseTextfield v-model="search" placeholder="Search for an item" />
      <div class="menu">
        <template v-if="loading">
          <LoadingKds
            v-for="i in 4"
            :key="`cat-holder-key-${i}`"
            :count="8"
          />
        </template>
        <template v-else>
          <MenuItem
            v-for="item in filteredAddonItems" :key="item.id"
            :item="item"
            @addItem="addToOrderItem"
          />
        </template>
      </div>

      <AddonEntryModal
        v-if="openAddonentrymodal && selectedAddon"
        :orderItem="orderItem"
        :addon="selectedAddon"
        @close="openAddonentrymodal = false"
        @reload="refetchAddons"
      />
    </div>
</template>
<script>
import MenuItem from '@/components/menu/MenuItem.vue'
import LoadingKds from '@/components/generics/LoadingKds.vue'
import BaseTextfield from '@/components/generics/BaseTextfield.vue'
import AddonEntryModal from '@/components/order/addons/AddonEntryModal.vue'
import dataSyncMixin from '@/mixins/dataSync'

export default {
  name: 'AddonItemsList',
  mixins: [dataSyncMixin],
  components: {
    MenuItem,
    LoadingKds,
    BaseTextfield,
    AddonEntryModal
  },

  props: {
    orderItem: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: true,
      addonItems: [],
      search: '',
      selectedAddon: null,
      openAddonentrymodal: false
    }
  },

  computed: {
    filteredAddonItems () {
      return this.addonItems
        .filter((addon) => addon.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },

  created () {
    this.fetchAddons()
  },

  methods: {

    refetchAddons () {
      this.openAddonentrymodal = false
      this.selectedAddon = null
      this.$eventBus.$emit('reload-item-addons')
    },

    async fetchAddons () {
      const ADDONS = await this.getSyncedAddonItems().catch(e => [])
      delete ADDONS.data_key
      this.addonItems = ADDONS.items
      this.loading = false
    },

    addToOrderItem (addonItem) {
      this.selectedAddon = addonItem
      this.openAddonentrymodal = true
    }
  }
}
</script>
<style scoped lang="scss">
.addons-list {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .menu {
      max-height: calc(60vh - 82px);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>
