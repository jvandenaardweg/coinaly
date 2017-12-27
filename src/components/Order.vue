<template>
  <div class="order" :class="{ 'is-expanded': isExpanded }">
    <div class="order__header" @click.prevent="toggleExpand()">
      <div class="order__symbol">
        <strong>{{ order.Exchange }}</strong>
      </div>
      <div class="order__header-meta">
        <ul>
          <li><span>{{ order.Quantity }} @ {{ order.Limit }} (BTC)</span></li>
        </ul>
      </div>
    </div>
    <div class="order__stats">
      <Progress :blue="0" :orange="0" :green="50"></Progress>
    </div>
    <div class="order__body">
      <div class="order__footer">
        <Button :type="'danger'" :label="cancelLabel" :disabled="cancelLoading" @click.native="handleCancel(order.OrderUuid)"></Button>
        <ErrorMessage v-if="errorMessage" :message="errorMessage" @close="errorMessage = false"></ErrorMessage>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import Progress from '@/components/Progress'
import ErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'Order',
  props: ['order'],
  components: {
    Button,
    Progress,
    ErrorMessage
  },
  data () {
    return {
      isExpanded: false,
      cancelLoading: false,
      errorMessage: false
    }
  },
  computed: {
    cancelLabel () {
      if (this.cancelLoading) {
        return 'Cancelling...'
      } else {
        return 'Cancel'
      }
    }
  },
  methods: {
    handleCancel (uuid) {
      this.cancelLoading = true
      this.errorMessage = false

      if (window.confirm('Do you really want to cancel this order?')) {
        console.log('cancel order')
        this.$store.dispatch('orders/cancelOrder', uuid)
        .then(response => {
          alert('done!')
        })
        .catch(error => {
          console.error('errorrrr', error)
          this.errorMessage = 'Something went wrong. Please try again.'
        })
        .finally(() => {
          this.cancelLoading = false
        })
      }
    },
    toggleExpand () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  background-color: #fff;
  margin-bottom: 10px;
  border: 1px #DFE1E3 solid;
  border-radius: 3px;
  padding: 0 0 15px 0;

  &.is-expanded {
    .order__body {
      display: block;
    }
  }

  .order__header {
    padding: 15px 45px 10px 15px;
    display: flex;
    width: 100%;
  }

  .order__symbol {
    width: 80px;
  }

  .order__body {
    display: none;
  }

  .order__footer {
    padding: 15px 15px 0 15px;
    text-align: right;
  }

  .order__stats {
    padding: 0 15px;
  }

  .order__header-meta {

    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      width: 100%;

      li {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }

        span {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
