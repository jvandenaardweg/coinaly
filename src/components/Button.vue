<template>
  <button :type="(!typeName ? 'button': typeName)" class="button" :class="{
    'button--primary': !className,
    'button--danger': className === 'danger',
    'button--success': className === 'success',
    'button--warning': className === 'warning',
    'button--outlined': className === 'outlined',
    'button--link': className === 'link',
    'button--link-gray': className === 'link-gray'
  }">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['label', 'typeName', 'className']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  &[disabled] {
    opacity: 0.5;
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
