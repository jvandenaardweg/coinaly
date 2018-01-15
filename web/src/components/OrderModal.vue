<template>
  <div class="modal" :class="{'is-visible': visible }" @click="handleOutsideClick($event)">
    <div class="modal-popup">
      <form @submit.prevent="handleSubmit()">
        <header class="modal-popup__header">
          <div class="modal-popup__header-title">
            <h2>{{ readableType }} <span v-if="selectedMarket">{{ selectedCurrency }} with {{ selectedMainPair }}</span></h2>
          </div>
          <div class="modal-popup__header-available">
            <small v-if="type === 'sell'">{{ currency.Available }} available</small>
          </div>
          <div class="modal-popup__header-control">
            <button class="modal-popup__control" type="button" @click.prevent="handleClose()">&times;</button>
          </div>
        </header>
        <div class="modal-popup__body">


          <div class="markets-search" v-if="showMarketsSearch">
            <Search :placeholder="'Example: XRP'" :label="'Search market'" @searchQuery="handleMarketSearchQuery" :autoFocus="true"></Search>

            <div class="markets-results">
              <div v-if="filteredMarkets" class="markets-results__header">
                <strong>Select a market</strong>
              </div>
              <div v-if="filteredMarkets" class="markets-results__body">
                <div class="markets-results__market" v-for="market in filteredMarkets" :key="market.symbol">
                  <input type="radio" :id="market.symbol" name="selectedMarket" :value="market.symbol" v-model="selectedMarket" />
                  <label :for="market.symbol"><strong>{{ market.symbol }}</strong> <span>{{ market.last }}</span></label>
                </div>
              </div>

            </div>
          </div>

          <div v-if="selectedMarket && !showMarketsSearch">
            <div>
              <div class="input">
                <div class="input__body">
                  <Market :market="market"></Market>
                  <Button :className="'link'" :label="'Change market'" @click.native="showMarketsSearch = true, searchQuery = null"></Button>
                </div>
              </div>

              <div class="input">
                <div class="input__header">
                  <label>Price (for 1 {{ selectedCurrency }})</label>
                  <div class="input-helpers">
                    <Button :size="'tiny'" :label="'last'" @click.native="handleInputPriceSetPrice('last')"></Button>
                    <Button :size="'tiny'" :label="'24hr high'" @click.native="handleInputPriceSetPrice('high')"></Button>
                    <Button :size="'tiny'" :label="'24hr low'" @click.native="handleInputPriceSetPrice('low')"></Button>
                  </div>
                </div>
                <div class="input__body">
                  <div class="input-group">
                    <Button :label="'-'" @click.native="handleInputPriceDecreace()"></Button>
                    <input type="text" name="price" ref="inputPrice" :placeholder="`Price in ${selectedMainPair} for one ${selectedCurrency}`" v-model="formData.price" />
                    <Button :label="'+'" @click.native="handleInputPriceIncreace()"></Button>
                  </div>
                  <small v-if="formData.price">Difference with current market: {{ priceMarketDifferencePercentage | percentage }} ({{ priceMarketDifference | toFixed }})</small>
                </div>
              </div>
              <div class="input">
                <div class="input__header">
                  <label>Amount</label>
                  <div class="input-helpers">
                    <Button :size="'tiny'" :label="'10%'" @click.native="handleInputAmountSetAmountPercentage(10)"></Button>
                    <Button :size="'tiny'" :label="'25%'" @click.native="handleInputAmountSetAmountPercentage(20)"></Button>
                    <Button :size="'tiny'" :label="'50%'" @click.native="handleInputAmountSetAmountPercentage(50)"></Button>
                    <Button :size="'tiny'" :label="'75%'" @click.native="handleInputAmountSetAmountPercentage(75)"></Button>
                    <Button :size="'tiny'" :label="'100%'" @click.native="handleInputAmountSetAmountPercentage(100)"></Button>
                  </div>
                </div>
                <div class="input__body">
                  <input type="text" name="amount" :placeholder="`Amount of ${selectedCurrency} you want`" v-model="formData.amount" />
                  <small>Maximum amount with given price: 1.000</small>
                </div>
              </div>
            </div>
            <!-- <div>
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
            </div> -->

            <div class="order-summary">
                <header class="order-summary__header">
                  <h3>[Buy] order summary</h3>
                </header>
                <div class="order-summary__body">
                  <ul>
                    <li><span>Total {{ selectedCurrency }}:</span> {{ formData.amount }}</li>
                    <li><span>Price per {{ selectedCurrency }}:</span> {{ formData.price }} {{ selectedMainPair }} ({{ calculateUsdPrice(formData.price, selectedMainPair) | currency }})</li>
                    <li><span>Bittrex Fee:</span> 0.15 {{ selectedCurrency }} <!-- ({{ calculateUsdPrice(0.15, selectedMainPair) | currency }}) --></li>
                    <li><span>Total costs:</span> {{ totalCostsBTC | toFixed }} {{ selectedMainPair }} ({{ calculateUsdPrice(totalCostsBTC, selectedMainPair) | currency }})</li>
                  </ul>
                </div>
                <div class="order-summary__footer">
                  <Button :label="'Cancel'" :className="'danger'" @click.native="$emit('close')"></Button>
                  <Button :typeName="'submit'" :label="`${readableType} ${formData.amount} ${selectedCurrency}`" :className="'success'"></Button>
                </div>

              </div>
          </div>


        </div>
        <!-- <div class="modal-popup__footer">
          <Button :label="'Cancel'" :className="'danger'" @click.native="$emit('close')"></Button>
          <Button :typeName="'submit'" :label="`${readableType} 1.000 XRP`" :className="'success'"></Button>
        </div> -->
      </form>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import Button from '@/components/Button.vue'
import Search from '@/components/Search.vue'
import ChartOverlay from '@/components/ChartOverlay.vue'
import Market from '@/components/Market.vue'
import pickBy from 'lodash/pickBy'

// Bittrex API 2.0 > https://github.com/ericsomdahl/python-bittrex/issues/35#issuecomment-326191279

export default {
  name: 'Modal',
  props: ['type', 'visible', 'currency'],
  components: {
    Button,
    Search,
    ChartOverlay,
    Market
  },
  data () {
    return {
      selectedMarket: null,
      searchQuery: null,
      showMarketsSearch: true,
      formData: {
        symbol: null, // BTC-XRP
        OrderType: 'LIMIT', // LIMIT
        amount: null, // 1000
        price: null, // 0.0001
        TimeInEffect: 'GOOD_TIL_CANCELED', // GOOD_TIL_CANCELED, IMMEDIATE_OR_CANCEL, FILL_OR_KILL
        ConditionType: 'NONE', // (required, default NONE) NONE, GREATER_THAN, LESS_THAN, STOP_LOSS_FIXED, STOP_LOSS_PERCENTAGE
        Target: 0 // (required, default 0) 0.0001 (condition target)
      }
    }
  },
  created () {
    console.log('created OrderModal')
  },
  computed: {
    ...mapGetters({
      priceIndexes: 'markets/priceIndexes',
      allFilledBalances: 'balances/allFilledCurrencies',
      allMarkets: 'markets/allMarkets'
    }),
    selectedCurrency () {
      return (this.selectedMarket) ? this.selectedMarket.split('/')[0] : null
    },
    selectedMainPair () {
      return (this.selectedMarket) ? this.selectedMarket.split('/')[1] : null
    },
    readableType () {
      if (this.type === 'sell') {
        return 'Sell'
      } else {
        return 'Buy'
      }
    },
    market () {
      if (this.selectedMarket) {
        return this.allMarkets.filter(market => {
          return market.symbol === this.selectedMarket
        })[0]
      } else {
        return null
      }
    },
    searchQueryInLowerCase () {
      return (this.searchQuery ? this.searchQuery.toLowerCase().trim() : null)
    },
    filteredMarkets () {
      if (this.searchQueryInLowerCase) {
        return this.allMarkets.filter(market => {
          return market.symbol.toLowerCase().includes(this.searchQueryInLowerCase)
        })
      }
    },
    priceMarketDifference () {
      return this.formData.price - this.market.last
    },
    priceMarketDifferencePercentage () {
      return ((this.priceMarketDifference) / this.market.last) * 100
    },
    totalCostsBTC () {
      if (this.formData.amount && this.formData.price) {
        return this.formData.amount * this.formData.price
      } else {
        return null
      }
    }
  },
  methods: {
    calculateUsdPrice (rate, currency) {
      if (currency === 'USDT') {
        return this.market.last
      } else {
        return this.priceIndexes[currency].rate * rate
      }
    },
    handleInputAmountSetAmountPercentage (percentage) {
      this.formData.amount = percentage
    },
    handleInputPriceSetPrice (type) {
      this.formData.price = this.market[type]
    },
    handleInputPriceIncreace () {
      this.formData.price++
    },
    handleInputPriceDecreace () {
      this.formData.price--
    },
    handleClose () {
      this.$emit('close')
    },
    handleSelectMarket (symbol) {
      this.selectedMarket = symbol
    },
    handleMarketSearchQuery (searchQuery) {
      this.searchQuery = searchQuery
    },
    isInWallet (currency) {
      const inBalanceCurrencyNames = pickBy(this.allFilledCurrenciesInBalance, (currency, currencyName) => {
        return currency === currencyName
      })
      return Object.keys(inBalanceCurrencyNames).length
    },
    handleOutsideClick (event) {
      if (event.target.classList.contains('modal')) {
        this.$emit('close')
      }
    },
    handleSubmit () {
      if (this.priceMarketDifferencePercentage < -10) {
        if (window.confirm(`Your buy price is ${this.priceMarketDifferencePercentage.toFixed(2)}% below the current market price. Are you sure you want to do this?`)) {
          console.log('Send this', this.formData)
        }
      } else {
        console.log('Send this', this.formData)
      }
    }
  },
  watch: {
    selectedMarket: function (newValue, oldValue) {
      this.showMarketsSearch = false
      Vue.nextTick(() => {
        this.$refs.inputPrice.focus()
      })
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
  text-align: center;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  .market {
    border: 1px $color-loblolly solid;
  }

  .modal-popup {
    width: 100%;
    position: relative;
    height: auto;
    background-color: $color-white;
    max-width: 500px;
    display: inline-block;
    text-align: left;
    margin-bottom: 30px;

    .modal-popup__header {
      max-width: 500px;
      display: flex;
      line-height: 3rem;
      height: 60px;
      border-bottom: 1px $color-loblolly solid;
      padding: 15px;
      margin: auto;
      width: 100%;
      background-color: $color-white;
      z-index: 10;

      .modal-popup__header-change {
        button {
          position: relative;
          top: -5px;
          left: 10px;
        }
      }

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
      padding: 15px;
    }

    .modal-popup__footer {
      text-align: right;
    }

    .modal-popup__control {
      font-size: 4rem;
      color: $color-black;
      margin: 0;
      position: absolute;
      top: 0;
      right: 15px;
      background: none;
      appearance: none;
      border: 0;
    }
  }

  .markets-search {
    background-color: $color-athens-gray;
    padding: 12px 15px 15px 15px;
    margin: -15px;
  }

  .markets-results {
    margin-top: 12px;

    .markets-results__header {
      //
    }

    .markets-results__body {
      //
    }

    .markets-results__market {
      position: relative;

      input {
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      label {
        width: 100%;
        display: block;
        background: $color-white;
        padding: 10px;
        border: 1px $color-loblolly solid;
        margin-bottom: -1px;
        font-weight: normal;

        strong {
          display: inline-block;
          width: 100px;
        }

        span {
          opacity: 0.5;
        }
      }

      input {
        &:checked + label {
          background-color: $color-azure-radiance;
          color: $color-white;
          border-color: $color-azure-radiance;
        }
      }
    }
  }


  .input-group {
    position: relative;

    input {
      padding-left: 45px;
      padding-right: 45px;
      outline: none;
    }
    button {
      position: absolute;
      width: 40px;
      padding-left: 0;
      padding-right: 0;
      height: 40px;
      top: 0;


      &:first-child {
        left: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &:last-child {
        right: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }

  .input {
    margin-top: 15px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    // border-bottom: 1px $color-loblolly solid;

    &:first-child {
      margin-top: -16px;
      border-bottom: 0;
      background-color: $color-athens-gray;
      margin-left: -15px;
      margin-right: -15px;
      padding-top: 15px;
      padding-left: 15px;
      padding-right: 15px;
    }

    &:last-child {
      border-bottom: 0;
    }

    .input__header {
      display: flex;
      margin-bottom: 7px;

      .input-helpers {
        margin-left: auto;
      }
    }

    small {
      opacity: 0.5;
    }
  }

  .order-summary {
    background-color: $color-azure-radiance;
    padding: 15px;
    color: $color-white;
    margin-left: -15px;
    margin-right: -15px;
    margin-bottom: -15px;
    margin-top: 15px;

    .order-summary__header {
      h2, h3 {
        margin: 0;
        font-size: 1.8rem;
      }
    }

    .order-summary__footer {
      padding-top: 30px;
      text-align: right;
    }

    .order-summary__body {
      padding-top: 12px;

      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          &:last-child {
            margin-top: 7px;
            padding-top: 7px;
            border-top: 1px rgba($color-white, 0.5) solid;
          }

          span {
            opacity: 0.6;
            display: inline-block;
            width: 110px;
          }
        }
      }
    }
  }
}
</style>
