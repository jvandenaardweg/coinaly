import { mount } from 'vue-test-utils'
import Tabs from '@/components/Tabs'

const exampleTabItems = [
  {
    link: '/tab',
    storeName: 'tabs',
    storeType: null,
    label: 'Tab One'
  },
  {
    link: '/tab/two',
    storeName: 'tabs',
    storeType: 'two',
    label: 'Tab Two'
  }
]
describe('Tabs.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Tabs)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct tab items', () => {
    const wrapper = mount(Tabs, {
      propsData: {
        items: exampleTabItems
      }
    })
    const tabsItemElements = wrapper.findAll('.tabs__item')
    const tabsItemLinkElements = wrapper.findAll('.tabs__item router-link')
    expect(wrapper.props().items.length).toBe(2)
    expect(tabsItemElements.exists()).toBe(true)
    expect(tabsItemElements.length).toBe(2)
    expect(tabsItemLinkElements.at(0).attributes().to).toBe('/tab')
    expect(tabsItemLinkElements.at(1).attributes().to).toBe('/tab/two')
  })
})
