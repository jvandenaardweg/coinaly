<template>
  <div class="modal" :class="{'is-visible': visible }" @click="handleOutsideClick($event)">
    <div class="modal-popup">
      <form @submit.prevent="handleSubmit()">
        <header class="modal-popup__header">
          <h2>{{ readableType }} {{ currency.Currency }}</h2>
          <small v-if="type === 'sell'">{{ currency.Available }} available</small>
        </header>
        <div class="modal-popup__body">
          <strong>This is a work in progress.<br/><br/><br/></strong>
          <div v-if="!market">
            <label>MarketName</label>
            <!-- <input type="text" name="amount" v-model="formData.MarketName" /> -->
            <select name="marketName" v-model="formData.MarketName">
              <option value="BTC-ADA" v-if="isInWallet('BTC')">BTC</option>
              <option value="ETH-ADA" v-if="isInWallet('ETH')">ETH</option>
              <option value="USDT-ADA" v-if="isInWallet('USD')">USD</option>
            </select>
          </div>
          <div>
            <label>Amount</label>
            <input type="text" name="amount" v-model="formData.Quantity" />
          </div>
          <div>
            <label>Price</label>
            <input type="text" name="amount" v-model="formData.Rate" />
          </div>
          <div>
            <label>OrderType</label>
            <input type="text" name="amount" v-model="formData.OrderType" />
          </div>
          <div>
            <label>TimeInEffect</label>
            <input type="text" name="amount" v-model="formData.TimeInEffect" />
          </div>
          <div>
            <label>ConditionType</label>
            <input type="text" name="amount" v-model="formData.ConditionType" />
          </div>
          <div>
            <label>ConditionTarget</label>
            <input type="text" name="amount" v-model="formData.Target" />
          </div>
        </div>
        <div class="modal-popup__footer">
          <Button :label="'Cancel'" :className="'danger'" @click.native="$emit('close')"></Button>
          <Button :typeName="'submit'" :label="readableType" :className="'success'"></Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

// Bittrex API 2.0 > https://github.com/ericsomdahl/python-bittrex/issues/35#issuecomment-326191279

export default {
  name: 'Modal',
  props: ['type', 'visible', 'currency', 'market'],
  components: {
    Button
  },
  data () {
    return {
      formData: {
        MarketName: null, // BTC-XRP
        OrderType: 'LIMIT', // LIMIT
        Quantity: null, // 1000
        Rate: null, // 0.0001
        TimeInEffect: 'GOOD_TIL_CANCELED', // GOOD_TIL_CANCELED, IMMEDIATE_OR_CANCEL, FILL_OR_KILL
        ConditionType: 'NONE', // (required, default NONE) NONE, GREATER_THAN, LESS_THAN, STOP_LOSS_FIXED, STOP_LOSS_PERCENTAGE
        Target: 0 // (required, default 0) 0.0001 (condition target)
      }
    }
  },
  computed: {
    allFilledBalances () {
      return this.$store.getters['balances/allFilledBalances']
    },
    readableType () {
      if (this.type === 'sell') {
        return 'Sell'
      } else {
        return 'Buy'
      }
    }
  },
  methods: {
    isInWallet (currency) {
      return this.allFilledBalances.filter(balance => {
        return balance.Currency === currency
      }, 0).length
    },
    handleOutsideClick (event) {
      if (event.target.classList.contains('modal')) {
        this.$emit('close')
      }
    },
    handleSubmit () {
      console.log('Send this', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  padding: 15px;
  text-align: center;
  display: none;

  &.is-visible {
    display: block;
  }

  .modal-popup {
    width: 100%;
    position: relative;
    height: auto;
    background-color: $color-white;
    padding: 15px;
    max-width: 500px;
    display: inline-block;
    text-align: left;

    .modal-popup__header {
      display: flex;
      line-height: 3rem;
      border-bottom: 1px $color-iron solid;
      padding: 0 0 15px 0;

      h2 {
        margin: 0;
      }

      small {
        margin-left: auto;
        font-size: 1.2rem;
        opacity: 0.5;
      }
    }

    .modal-popup__body {
      padding: 15px 0 0 0;
    }

    .modal-popup__footer {
      text-align: right;
    }
  }
}
</style>
