import Vue from 'vue'
import { mount } from 'vue-test-utils'
import ChartOverlay from '@/components/ChartOverlay'

describe('ChartOverlay.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(ChartOverlay)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct currency pair', () => {
    const testCurrencyPair = 'XRPBTC'
    const wrapper = mount(ChartOverlay, {
      propsData: {
        currencyPair: testCurrencyPair
      }
    })
    const chartHeader = wrapper.find('.chart__header h2')
    expect(wrapper.props().currencyPair).toBe(testCurrencyPair)
    expect(chartHeader.text()).toBe(testCurrencyPair)
  })

  it('should have the correct exchange name', () => {
    const testExchangeName = 'Bittrex'
    const wrapper = mount(ChartOverlay, {
      propsData: {
        exchange: testExchangeName
      }
    })
    expect(wrapper.props().exchange).toBe(testExchangeName)
  })

  it('should use the correct TradingView symbol naming', () => {
    const testExchangeName = 'Bittrex'
    const testCurrencyPair = 'XRPBTC'
    const wrapper = mount(ChartOverlay, {
      propsData: {
        exchange: testExchangeName,
        currencyPair: testCurrencyPair
      }
    })
    expect(wrapper.vm.tradingViewSymbol).toBe(`${testExchangeName}:${testCurrencyPair}`)
  })

  it('should generate a timezone name', () => {
    const wrapper = mount(ChartOverlay)
    expect(wrapper.vm.userTimezone).toBeTruthy()
  })

  it('should emit a close event when using the close button', () => {
    const wrapper = mount(ChartOverlay)
    const closeButton = wrapper.find('.chart__header-control')
    closeButton.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
