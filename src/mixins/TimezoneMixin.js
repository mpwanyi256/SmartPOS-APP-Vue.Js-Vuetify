import moment from 'moment'

export default {
  name: 'TimezoneMixin',
  data () {
    return {

    }
  },
  computed: {
    today () {
      return moment(new Date()).format('YYYY-MM-D')
    },
    time () {
      return moment(new Date()).format('H:mm')
    }
  }
}
