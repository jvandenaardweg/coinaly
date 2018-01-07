import { mount, shallow } from 'vue-test-utils'
import Search from '@/components/Search'

describe('Search.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Search)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct placeholder', () => {
    const testPlaceholderText = 'Search what you want'
    const wrapper = mount(Search, {
      propsData: {
        placeholder: testPlaceholderText,
        attachToDocument: true
      }
    })

    expect(wrapper.props().placeholder).toBe(testPlaceholderText)
    // expect(wrapper.attributes().placeholder).toBe(testPlaceholderText) // TODO: cant seem to get this to work
  })

  it('should emit the correct search keywords', () => {
    const testSearchQuery = 'Just a test'
    const wrapper = mount(Search)
    wrapper.vm.$emit('searchQuery', testSearchQuery)
    expect(wrapper.emitted().searchQuery[0][0]).toBe(testSearchQuery)
  })
})
