<template>
    <Basemodal @close="$emit('close')" :size="500">
        <div class="alert_section">
            <h3>
                {{ title ? title : 'Are you sure you want to delete item?' }}
            </h3>
            <div class="reason_section" v-if="requireReason">
                <BaseTextfield placeholder="Reason" v-model.trim="reason" />
            </div>
            <div class="confirm_options">
                <v-btn class="confirm_yes"
                    block :disabled="disabled"
                    @click="$emit('yes', reason)">
                    YES
                </v-btn>
                <v-btn class="confirm_no"
                    block
                    @click="$emit('close')">
                    NO
                </v-btn>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue'
import BaseTextfield from '@/components/generics/BaseTextfield.vue'

export default {
  name: 'ConfirmModal',
  props: {
    title: {
      type: String,
      required: false
    },
    requireReason: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    Basemodal,
    BaseTextfield
  },
  data () {
    return {
      reason: ''
    }
  },
  computed: {
    disabled () {
      return this.requireReason && !this.reason.length
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';
    .alert_section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        .reason_section {
            height: 50px;
            display: flex;
            flex-direction: column;
            margin: 15px;
        }

        .confirm_options {
            display: grid;
            grid-template-columns: 50% 50%;
            width: 100%;
            justify-items: center;
            height: inherit;
            overflow: hidden;
            gap: 5px;
            padding: 15px;

            .confirm_yes {
                background-color: $green !important;
                color: $white;
            }

            .confirm_no {
                background-color: $red !important;
                color: $white;
            }
        }
    }
</style>
