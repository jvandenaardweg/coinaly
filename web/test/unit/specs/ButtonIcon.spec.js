import { mount } from 'vue-test-utils'
import ButtonIcon from '@/components/ButtonIcon'

describe('ButtonIcon.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(ButtonIcon)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct label', () => {
    const testLabelText = 'Test button'
    const wrapper = mount(ButtonIcon, {
      propsData: {
        label: testLabelText
      }
    })
    expect(wrapper.props().label).toBe(testLabelText)
    expect(wrapper.text()).toBe(testLabelText)
  })

  it('should render the correct SVG icon', () => {
    const testIcon = 'chart'
    const wrapper = mount(ButtonIcon, {
      propsData: {
        icon: testIcon
      }
    })
    const iconElement = wrapper.find('.button-icon__icon')
    const iconElementSvg = iconElement.find('svg')

    expect(wrapper.props().icon).toBe(testIcon)
    expect(iconElement.exists()).toBe(true)
    expect(iconElementSvg.exists()).toBe(true)
  })
})
