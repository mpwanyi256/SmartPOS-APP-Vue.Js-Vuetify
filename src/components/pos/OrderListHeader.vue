<template>
    <div class="order_items_header">
        <div class="item_name">
            Item Name
        </div>
        <div class="item_price">Amount</div>
    </div>
</template>
<script>
export default {
  name: 'OrderListHeader'
}
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .order_items_header {
        height: 40px;
        width: inherit;
        background-color: $white;
        border: 1px solid $header;
        display: grid;
        grid-template-columns: 80% 20%;
        font-size: 14px;
        color: $black;
        font-weight: bold;

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
            padding-right: 5px;
        }

        .item_name, .item_price {
            display: flex;
            align-items: center;
        }
    }
</style>
