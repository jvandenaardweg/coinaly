import { mount } from 'vue-test-utils'
import Label from '@/components/Label'

describe('Label.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Label)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct text', () => {
    const testText = 'Buy'
    const wrapper = mount(Label, {
      propsData: {
        text: testText
      }
    })
    expect(wrapper.props().text).toBe(testText)
    expect(wrapper.text()).toBe(testText)
  })

  it('should render the correct color class', () => {
    const testColor = 'red'
    const wrapper = mount(Label, {
      propsData: {
        color: testColor
      }
    })
    expect(wrapper.props().color).toBe(testColor)
    expect(wrapper.classes()).toContain(`label--${testColor}`)
  })
})
