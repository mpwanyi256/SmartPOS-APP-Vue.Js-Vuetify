<template>
    <div class="order_item"
        :class="item.status == 0 ? 'pending': ''"
        @click="$emit('viewItems', item)"
    >
        <div class="item_name">
            <p>
            <strong class="mr-2">
              {{ item.quantity }}
            </strong>
            {{ item.item_name }}
            </p>
        </div>
        <div class="item_price">
            {{ item.amount }}
        </div>
    </div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .order_item {
        height: 50px;
        width: inherit;
        background-color: $white;
        border-bottom: 0.5px solid $header;
        display: grid;
        grid-template-columns: 80% 20%;
        font-size: 14px;
        color: $black;
        cursor: pointer;
        text-transform: uppercase;

        .item_name {
            display: flex;
            flex-direction: row;
            justify-content: left;
            padding-left: 10px;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
            padding-right: 5px;
        }

        .item_price {
            justify-content: center;
            text-align: center;
        }

        .item_name, .item_actions, .item_price {
            display: flex;
            align-items: center;
        }

        .item_actions {
            direction: rtl;
        }
    }

    .order_item:hover {
        font-weight: bold;
    }

    .pending {
        background-color: $header;
    }
</style>
