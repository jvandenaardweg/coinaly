import { mount } from 'vue-test-utils'
import ServerError from '@/components/ServerError'

describe('ServerError.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(ServerError)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct message', () => {
    const testErrorMessage = 'Something went wrong, please try again.'
    const wrapper = mount(ServerError, {
      propsData: {
        message: testErrorMessage
      }
    })
    const messageParagraph = wrapper.find('.server-error__body p strong')
    expect(wrapper.props().message).toBe(testErrorMessage)
    expect(messageParagraph.text()).toBe(testErrorMessage)
  })

  it('should have a link to GitHub issues', () => {
    const wrapper = mount(ServerError)
    const issueUrl = wrapper.find('.server-error__footer a')
    expect(issueUrl.attributes().href).toBe('https://github.com/jvandenaardweg/coinaly/issues')
  })
})
