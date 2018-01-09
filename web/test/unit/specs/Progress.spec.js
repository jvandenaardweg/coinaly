import { mount } from 'vue-test-utils'
import Progress from '@/components/Progress'

describe('Button.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Progress)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render the correct progress bars', () => {
    const testPercentage = '25'
    const wrapper = mount(Progress, {
      propsData: {
        blue: testPercentage,
        orange: testPercentage,
        green: testPercentage,
        black: testPercentage
      }
    })
    const blueProgressBar = wrapper.find('.progress__blue')
    const orangeProgressBar = wrapper.find('.progress__orange')
    const greenProgressBar = wrapper.find('.progress__green')
    const blackProgressBar = wrapper.find('.progress__black')
    expect(blueProgressBar.exists()).toBe(true)
    expect(orangeProgressBar.exists()).toBe(true)
    expect(greenProgressBar.exists()).toBe(true)
    expect(blackProgressBar.exists()).toBe(true)
  })

  it('should render the correct progress bars widths', () => {
    const testPercentage = '25'
    const wrapper = mount(Progress, {
      propsData: {
        blue: testPercentage,
        orange: testPercentage,
        green: testPercentage,
        black: testPercentage
      }
    })
    const blueProgressBar = wrapper.find('.progress__blue')
    const orangeProgressBar = wrapper.find('.progress__orange')
    const greenProgressBar = wrapper.find('.progress__green')
    const blackProgressBar = wrapper.find('.progress__black')
    expect(blueProgressBar.element.style.width).toBe(`${testPercentage}%`)
    expect(orangeProgressBar.element.style.width).toBe(`${testPercentage}%`)
    expect(greenProgressBar.element.style.width).toBe(`${testPercentage}%`)
    expect(blackProgressBar.element.style.width).toBe(`${testPercentage}%`)
  })
})
