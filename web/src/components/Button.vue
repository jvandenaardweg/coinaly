<template>
  <button :type="(!typeName ? 'button': typeName)" class="button" :selected="selected" :class="{
    'button--primary': !className,
    'button--danger': className === 'danger',
    'button--success': className === 'success',
    'button--warning': className === 'warning',
    'button--outlined': className === 'outlined',
    'button--link': className === 'link',
    'button--link-gray': className === 'link-gray',
    'button--size--tiny': size === 'tiny'
  }">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['label', 'typeName', 'className', 'size', 'selected']
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 3px;
  background: $color-azure-radiance;
  color: white;
  border: 0;
  font-size: 1.4rem;
  font-weight: bold;
  border: 1px transparent solid;
  outline: none;
  appearance: none;
  cursor: pointer;

  &[disabled] {
    opacity: 0.5;
  }

  &.button--size--tiny {
    padding: 0 7px;
    font-size: 1.2rem;
    line-height: 2rem;
    color: $color-black;
    background: none;
    border-color: $color-black;
    font-weight: normal;
    // opacity: 0.5;

    // &[selected] {
    //   opacity: 1;
    //   color: $color-azure-radiance;
    //   border-color: $color-azure-radiance;
    // }
  }

  &.button--icon {
    padding: 5px 10px;
  }

  &.button--danger {
    background: $color-alizarin-crimson;

    .button__icon {
      svg {
        fill: $color-white;
      }
    }
  }

  &.button--success {
    background: $color-chateau-green;

    .button__icon {
      svg {
        fill: $color-white;
      }
    }
  }

  &.button--warning {
    background: $color-cream-can;

    .button__icon {
      svg {
        fill: $color-white;
      }
    }
  }

  &.button--outlined {
    background: transparent;
    color: $color-azure-radiance;
    border-color: $color-azure-radiance;

    .button__icon {
      svg {
        fill: $color-azure-radiance;
      }
    }
  }

  &.button--link {
    background: transparent;
    color: $color-azure-radiance;
    padding-right: 0;
    padding-left: 0;
    position: relative;
    font-weight: normal;

    &:after {
      content: "";
      height: 1px;
      bottom: 8px;
      position: absolute;
      left: 0;
      width: 100%;
      background: $color-azure-radiance;
    }

    .button__icon {
      svg {
        fill: $color-azure-radiance;
      }
    }
  }

  &.button--link-gray {
    background: transparent;
    color: $color-black;
    padding-right: 0;
    padding-left: 0;
    position: relative;
    font-weight: normal;
    opacity: 0.5;

    &:after {
      content: "";
      height: 1px;
      bottom: 8px;
      position: absolute;
      left: 0;
      width: 100%;
      background: $color-black;
    }
  }

  .button__icon {
    width: 24px;
    display: inline-block;

    svg {
      width: 100%;
      fill: $color-white;
    }
  }
}
</style>
