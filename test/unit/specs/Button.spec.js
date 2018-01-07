import { mount } from 'vue-test-utils'
import Button from '@/components/Button'

describe('Button.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Button)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct label', () => {
    const wrapper = mount(Button, {
      propsData: {
        label: 'Test button'
      }
    })
    expect(wrapper.props().label).toBe('Test button')
    expect(wrapper.text()).toBe('Test button')
  })

  it('should render the correct type', () => {
    const wrapper = mount(Button, {
      propsData: {
        typeName: 'submit'
      }
    })
    expect(wrapper.props().typeName).toBe('submit')
    expect(wrapper.attributes().type).toBe('submit')
  })

  it('should render the correct type when null', () => {
    const wrapper = mount(Button, {
      propsData: {
        typeName: null
      }
    })
    expect(wrapper.props().typeName).toBe(null)
    expect(wrapper.attributes().type).toBe('button')
  })

  it('should render the correct class', () => {
    const wrapper = mount(Button, {
      propsData: {
        className: 'danger'
      }
    })
    expect(wrapper.props().className).toBe('danger')
    expect(wrapper.classes()).toContain('button--danger')
  })
})
