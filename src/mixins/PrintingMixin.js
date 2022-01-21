import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PrintingMixin',

  computed: {
    ...mapGetters('auth', ['user']),
    ...mapMutations('auth', ['seterror']),
    ...mapGetters('pos', ['departments']),

    company () {
      return this.user.company_info
    }
  },

  eventBusCallbacks: {
    'print-cancellation-kot': 'printCancelledKotItem'
  },

  methods: {
    ...mapActions('print', ['sendPrintJob', 'sendKotJob']),
    ...mapActions('pos', ['confirmOrder']),

    printCancelledKotItem (cancelledItem) {
      // eslint-disable-next-line camelcase
      const { cancel_id, reason } = cancelledItem
      // eslint-disable-next-line camelcase
      const { waiter, table, bill_no } = this.order

      const params = {
        print_cancelled_kot: cancel_id,
        reason,
        cancelled_by: this.user.user_name,
        company_name: this.company.company_name,
        location: this.company.company_location,
        tin: this.company.company_tin,
        contact_number: this.company.company_mobile,
        waiter,
        table,
        bill_number: bill_no
      }
      this.sendKotJob(params)
        .catch(() => {
          this.errorMessage = 'Check bar printer'
        })
    },

    async printKOT () {
      const params = {
        print_kot: this.order.order_id,
        printed_by: this.user.user_name,
        company_name: this.company.company_name,
        location: this.company.company_location,
        tin: this.company.company_tin,
        contact_number: this.company.company_mobile,
        waiter: this.order.waiter,
        exceptions_category_id: this.user.exception_category_id || 0,
        receipt_message: this.company.company_receipt,
        run_kot_print_job: true
      }

      let hasError = false
      this.departments.forEach(async (dep) => {
        await this.sendKotJob({ ...params, department_id: dep.id })
          .catch(() => {
            hasError = true
            this.seterror(`Please check ${dep.name} printer.`)
          })
      })

      if (hasError) return
      await this.confirmOrder(this.order.order_id)
      this.fetchOrderDetails()
    }
  }

}
