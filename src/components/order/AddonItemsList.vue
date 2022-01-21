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
import { mapActions } from 'vuex'
import MenuItem from '@/components/menu/MenuItem.vue'
import LoadingKds from '@/components/generics/LoadingKds.vue'
import BaseTextfield from '@/components/generics/BaseTextfield.vue'
import AddonEntryModal from '@/components/order/addons/AddonEntryModal.vue'

export default {
  name: 'AddonItemsList',
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
    ...mapActions('pos', ['getAddonItems']),

    refetchAddons () {
      this.openAddonentrymodal = false
      this.selectedAddon = null
      this.$eventBus.$emit('reload-item-addons')
    },

    fetchAddons () {
      this.getAddonItems()
        .then(addOns => {
          if (!addOns.error) this.addonItems = addOns.data
        })
        .catch(e => {
          console.log('Error while fetching addons', e)
        }).finally(() => {
          this.loading = false
        })
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
