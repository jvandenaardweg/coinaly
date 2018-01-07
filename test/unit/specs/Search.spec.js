import { mount, shallow } from 'vue-test-utils'
import Search from '@/components/Search'

describe('Search.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Search)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct input field', () => {
    const testPlaceholderText = 'Search what you want'
    const wrapper = mount(Search, {
      propsData: {
        placeholder: testPlaceholderText,
        attachToDocument: true
      }
    })
    const inputField = wrapper.find('input')

    expect(wrapper.props().placeholder).toBe(testPlaceholderText)
    expect(inputField.attributes().type).toBe('search')
    expect(inputField.attributes().placeholder).toBe(testPlaceholderText)
  })

  it('should emit the correct search keywords', () => {
    const testSearchQuery = 'Just a test'
    const wrapper = mount(Search)
    wrapper.vm.$emit('searchQuery', testSearchQuery)
    expect(wrapper.emitted().searchQuery[0][0]).toBe(testSearchQuery)
  })
})
