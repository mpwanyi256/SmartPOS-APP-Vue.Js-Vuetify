import idb from '@/plugins/indexedDB.js'
import { mapActions } from 'vuex'
const MENU_ITEMS_COLLECTION = 'menu_items'

export default {
  name: 'dataSync',

  data () {
    return {
      loading: false
    }
  },

  methods: {
    ...mapActions('pos', ['getMenuItems']),

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
        .catch(e => {

        })
        .finally(() => {
          this.loading = false
        })
    },

    getSyncedMenuItems () {
      return idb.collection(MENU_ITEMS_COLLECTION).get().catch(e => [])
    }
  }
}
