import { mount } from 'vue-test-utils'
import ErrorMessage from '@/components/ErrorMessage'

describe('Button.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(ErrorMessage)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct message', () => {
    const testErrorMessage = 'Something went wrong, please try again.'
    const wrapper = mount(ErrorMessage, {
      propsData: {
        message: testErrorMessage
      }
    })
    const messageParagraph = wrapper.find('p')
    expect(wrapper.props().message).toBe(testErrorMessage)
    expect(messageParagraph.text()).toBe(testErrorMessage)
  })

  it('should emit a close event when using the close button', () => {
    const wrapper = mount(ErrorMessage)
    const closeButton = wrapper.find('.error-message__control')
    closeButton.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
