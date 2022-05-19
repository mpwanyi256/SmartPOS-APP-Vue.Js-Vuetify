import idb from '@/plugins/indexedDB.js'
import { mapActions } from 'vuex'
const MENU_ITEMS_COLLECTION = 'menu_items'
const ADDON_ITEMS_COLLECTION = 'addon_items'
const OUTLET_SETTINGS_COLLECTION = 'outlet_controls'

export default {
  name: 'dataSync',

  data () {
    return {
      loading: false
    }
  },

  methods: {
    ...mapActions('pos', ['getMenuItems', 'getAddonItems']),
    ...mapActions('settings', ['getOutletSettings']),

    syncOutletSettings () {
      if (this.loading) return
      this.loading = true
      this.getOutletSettings()
        .then(response => {
          const CONTROLS = {
            controls: response.data
          }
          idb.collection(OUTLET_SETTINGS_COLLECTION)
            .add(CONTROLS)
            .catch(e => {
              idb.collection(OUTLET_SETTINGS_COLLECTION)
                .update(CONTROLS)
            })
        })
        .catch()
        .finally(() => {
          this.loading = false
        })
    },

    syncMenuItems () {
      if (this.loading) return
      this.loading = true
      this.getMenuItems('download')
        .then(response => {
          if (!response.error) {
            const ALLITEMS = {
              items: response.data
            }
            idb.collection(MENU_ITEMS_COLLECTION)
              .add(ALLITEMS)
              .catch(e => {
                idb.collection(MENU_ITEMS_COLLECTION)
                  .update(ALLITEMS)
              })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    syncAddonItems () {
      this.getAddonItems()
        .then(addOns => {
          if (!addOns.error) {
            const ADDONS = {
              items: [...addOns.data]
            }

            idb.collection(ADDON_ITEMS_COLLECTION)
              .add(ADDONS)
              .catch(e => {
                idb.collection(MENU_ITEMS_COLLECTION)
                  .update(ADDONS)
              })
          }
        })
        .catch(e => {
          console.log('Error while fetching addons', e)
        }).finally(() => {
          this.loading = false
        })
    },

    getSyncedMenuItems () {
      return idb.collection(MENU_ITEMS_COLLECTION).get().catch(e => [])
    },

    getSyncedAddonItems () {
      return idb.collection(ADDON_ITEMS_COLLECTION).get()
    },

    getSynchedSettings () {
      return idb.collection(OUTLET_SETTINGS_COLLECTION).get()
    }
  }
}
