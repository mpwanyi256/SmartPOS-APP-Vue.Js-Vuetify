<template>
    <Basemodal title="Menu items" @close="$emit('close')" :size="800">
        <div class="menu_listing">
            <div class="search_area">
            <div class="search">
                <input type="text" v-model="menuSearchKey"
                class="search_field" placeholder="Search" />
            </div>
            </div>
            <div class="menu_items_list">
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
                    v-for="item in filteredMenuItems" :key="item.id"
                    :item="item"
                    @addItem="$emit('add-item', $event)"
                />
                </template>
            </div>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue'
import MenuItem from '@/components/home/MenuItem.vue'
import dataSyncMixin from '@/mixins/dataSync'

export default {
  name: 'MenuItemsModal',

  mixins: [dataSyncMixin],

  components: {
    Basemodal,
    MenuItem
  },

  data () {
    return {
      items: [],
      loading: false,
      menuSearchKey: ''
    }
  },

  computed: {
    filteredMenuItems () {
      return this.items.filter(item => item.name.toLowerCase()
        .includes(this.menuSearchKey.toLowerCase()))
    }
  },

  async created () {
    const allItems = await this.getSyncedMenuItems()
    delete allItems.data_key
    this.items = allItems.items || []
  }
}
</script>
<style lang="scss">
@import '@/styles/pos.scss';

.menu_listing {
  height: 80vh;
  background-color: $white;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .search_area {
    height: 56px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid $bg_color;
    background-color: $header;

    .search {
      direction: rtl;
      display: inline-flex;
      width: 100%;
      gap: 10px;

      .btn_create_order {
        border: 1px solid $white;
        background-color: $white;
        color: $blue;
        height: 35px;
        font-size: 12px;
        font-weight: inherit;
        text-transform: capitalize;
        direction: ltr;
        box-shadow: $elevation-default;
      }

      .search_field, .search_field:focus, .search_field:hover {
        height: 35px;
        width: 100%;
        border: 1px solid $white;
        background-color: $white;
        border-radius: 5px;
        margin-right: 10px;
        direction: ltr;
        padding-left: 5px;
        padding-right: 5px;
        box-shadow: $elevation-default;
        margin: 10px;
      }

    }
  }

  .menu_items_list {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .menu {
      display: grid;
      max-height: 100%;

        // Desktop view
        // @media screen and (max-width: 400px) {
        //     grid-template-columns: 100%;
        // }

        // @media screen and (min-width: 401px) {
        //     grid-template-columns: 50% 50%;
        // }

        @media screen and (min-width: 700px) {
            // grid-template-columns: 33.3% 33.3% 33.3%;
            grid-template-columns: 100%;
        }

        @media screen and (min-width: 1000px) {
            grid-template-columns: 25% 25% 25% 25%;
        }

    }
  }
}
</style>
