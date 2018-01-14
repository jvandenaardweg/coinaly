<template>
  <div class="modal" :class="{'is-visible': visible }" @click="handleOutsideClick($event)">
    <div class="modal-popup">
      <form @submit.prevent="handleSubmit()">
        <header class="modal-popup__header">
          <h2>{{ readableType }} <span v-if="selectedMarket">{{ selectedCurrency }} with {{ selectedMainPair }}</span></h2>
          <div v-if="selectedMarket && !showMarketsSearch">
             <Button :className="'link'" :label="'Change'" @click.native="showMarketsSearch = true, searchQuery = null"></button>
          </div>
          <small v-if="type === 'sell'">{{ currency.Available }} available</small>
          <button class="modal-popup__control" type="button" @click.prevent="handleClose()">&times;</button>
        </header>
        <div class="modal-popup__body">


          <div v-if="showMarketsSearch">
            <Search :placeholder="'Example: XRP'" :label="'Search market'" @searchQuery="handleMarketSearchQuery"></Search>
            <div class="markets-results">
              <div class="markets-results__market" v-if="filteredMarkets" v-for="market in filteredMarkets" :key="market.symbol">
                <input type="radio" :id="market.symbol" name="selectedMarket" :value="market.symbol" v-model="selectedMarket" />
                <label :for="market.symbol">{{ market.symbol }} {{ market.last }}</label>
              </div>
            </div>
          </div>

          <div v-if="selectedMarket && !showMarketsSearch">
            <div>
              <div class="input">
                <div class="input__body">
                  <Market :market="market"></Market>
               </div>
            </div>

            <!-- <Button :label="`View ${selectedMarket} chart`"></Button> -->

              <div class="input">
                <div class="input__header">
                  <label>Price</label>
                  <div class="input-helpers">
                    <Button :size="'tiny'" :label="'last'"></Button>
                    <Button :size="'tiny'" :label="'24hr high'"></Button>
                    <Button :size="'tiny'" :label="'24hr low'"></Button>
                  </div>
                </div>
                <div class="input__body">
                  <div class="input-group">
                    <Button :label="'-1%'" :className="'outlined'"></Button>
                    <input type="text" name="amount" placeholder="Price in [BTC] for one [XRP]" v-model="formData.price" />
                    <Button :label="'+1%'" :className="'outlined'">+</Button>
                  </div>
                  <small>Difference with current market: -1% (0.000123)</small>
                </div>
              </div>
              <div class="input">
                <div class="input__header">
                  <label>Amount</label>
                  <div class="input-helpers">
                    <Button :size="'tiny'" :label="'10%'"></Button>
                    <Button :size="'tiny'" :label="'25%'"></Button>
                    <Button :size="'tiny'" :label="'50%'"></Button>
                    <Button :size="'tiny'" :label="'75%'"></Button>
                    <Button :size="'tiny'" :label="'100%'"></Button>
                  </div>
                </div>
                <div class="input__body">
                  <input type="text" name="amount" placeholder="Amount [XRP] you want" v-model="formData.amount" />
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
                    <li><span>Total XRP:</span> {{ formData.amount }}</li>
                    <li><span>Price per XRP:</span> {{ formData.price }} BTC ({{ '0.88' | currency }})</li>
                    <li><span>Bittrex Fee:</span> 0.15 XRP ({{ '0.88' | currency }})</li>
                    <li><span>Total costs:</span> 10 BTC ({{ '1000,00' | currency }})</li>
                  </ul>
                </div>
                <div class="order-summary__footer">
                  <Button :label="'Cancel'" :className="'danger'" @click.native="$emit('close')"></Button>
                  <Button :typeName="'submit'" :label="`${readableType} 1.000 XRP`" :className="'success'"></Button>
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
        MarketName: null, // BTC-XRP
        OrderType: 'LIMIT', // LIMIT
        amount: null, // 1000
        price: null, // 0.0001
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
    allMarkets () {
      return this.$store.getters['markets/allMarkets']
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
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    handleSelectMarket (symbol) {
      this.selectedMarket = symbol
    },
    handleMarketSearchQuery (searchQuery) {
      this.searchQuery = searchQuery
      console.log(searchQuery)
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
      console.log('Send this', this.formData)
    }
  },
  watch: {
    selectedMarket: function (newValue, oldValue) {
      this.showMarketsSearch = false
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
  // padding: 15px;
  text-align: center;
  display: none;
  overflow-y: scroll;

  &.is-visible {
    display: block;
  }

  .market {
    border-bottom: 1px $color-iron solid;
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
    padding-top: 60px;

    .modal-popup__header {
      max-width: 500px;
      display: flex;
      line-height: 3rem;
      height: 60px;
      border-bottom: 1px $color-iron solid;
      padding: 15px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 100%;
      background-color: $color-white;
      z-index: 10;
      // box-shadow: 0 5px 10px rgba(0,0,0,0.1);

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

  .markets-results {
    .markets-results__market {
      position: relative;

      input {
        // visibility: hidden;
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      label {
        width: 100%;
        display: block;
        // background: green;
        padding: 10px;
        border: 1px gray solid;
        margin-bottom: -1px;
      }

      input {
        &:checked + label {
          background: gray;
        }
      }
    }
  }


  .input-group {
    position: relative;
    input {
      padding-left: 45px;
      padding-right: 45px;
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
      }

      &:last-child {
        right: 0;
      }
    }
  }

  .input {
    margin-top: 15px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px $color-iron solid;

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

  .selected-market {
    // background-color: $color-iron;
    // padding: 10px;
    // border-radius: 3px;
    // margin-bottom: 12px;
  }

  .order-summary {
    background-color: $color-azure-radiance;
    padding: 15px;
    color: $color-white;
    margin-left: -15px;
    margin-right: -15px;
    margin-bottom: -15px;
    margin-top: 15px;
    // margin-bottom: 15px;

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
