import { mount } from 'vue-test-utils'
import AlertBar from '@/components/AlertBar'

describe('AlertBar.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(AlertBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should show an red alert when BTC is UP more then 20%', () => {
    const wrapper = mount(AlertBar, {
      propsData: {
        btcUsdMarket: {
          last: 10000,
          info: {
            PrevDay: 8000
          }
        }
      }
    })
    expect(wrapper.vm.showAlert).toBe(true)
    expect(wrapper.vm.showUpAlert).toBe(true)
    expect(wrapper.vm.upDownText).toBe('up')
    expect(wrapper.classes()).toContain('is-red')
  })

  it('should show an red alert when BTC is DOWN more then 20%', () => {
    const wrapper = mount(AlertBar, {
      propsData: {
        btcUsdMarket: {
          last: 10000,
          info: {
            PrevDay: 13000
          }
        }
      }
    })
    expect(wrapper.vm.showAlert).toBe(true)
    expect(wrapper.vm.showDownAlert).toBe(true)
    expect(wrapper.vm.upDownText).toBe('down')
    expect(wrapper.classes()).toContain('is-red')
  })

  it('should show an orange alert when BTC is UP more then 4%', () => {
    const wrapper = mount(AlertBar, {
      propsData: {
        btcUsdMarket: {
          last: 10000,
          info: {
            PrevDay: 9000
          }
        }
      }
    })
    expect(wrapper.vm.showAlert).toBe(true)
    expect(wrapper.vm.showUpAlert).toBe(true)
    expect(wrapper.vm.upDownText).toBe('up')
    expect(wrapper.classes()).not.toContain('is-red')
  })

  it('should show an orange alert when BTC is DOWN more then 4%', () => {
    const wrapper = mount(AlertBar, {
      propsData: {
        btcUsdMarket: {
          last: 10000,
          info: {
            PrevDay: 11000
          }
        }
      }
    })
    expect(wrapper.vm.showAlert).toBe(true)
    expect(wrapper.vm.showDownAlert).toBe(true)
    expect(wrapper.vm.upDownText).toBe('down')
    expect(wrapper.classes()).not.toContain('is-red')
  })
})
