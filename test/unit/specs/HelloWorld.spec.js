import Vue from 'vue'
import Button from '@/components/Button'

describe('Button.vue', () => {
  it('should render correct button', () => {
    const Constructor = Vue.extend(Button)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.button'))
    .toBeDefined()
  })
})
