<template>
  <button :type="(!typeName ? 'button': typeName)" class="button" :class="{
    'button--primary': !className,
    'button--danger': className === 'danger',
    'button--success': className === 'success',
    'button--warning': className === 'warning',
    'button--outlined': className === 'outlined',
    'button--link': className === 'link'
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
  background: #0077FF;
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
    background: #DC3A4E;

    .button__icon {
      svg {
        fill: #ffffff;
      }
    }
  }

  &.button--success {
    background: #23CF5F;

    .button__icon {
      svg {
        fill: #ffffff;
      }
    }
  }

  &.button--warning {
    background: #F4BC5F;

    .button__icon {
      svg {
        fill: #ffffff;
      }
    }
  }

  &.button--outlined {
    background: transparent;
    color: #0077FF;
    border-color: #0077FF;

    .button__icon {
      svg {
        fill: #0077FF;
      }
    }
  }

  &.button--link {
    background: transparent;
    color: #0077FF;
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
      background: #0077FF;
    }

    .button__icon {
      svg {
        fill: #0077FF;
      }
    }
  }

  .button__icon {
    width: 24px;
    display: inline-block;

    svg {
      width: 100%;
      fill: #fff;
    }
  }
}
</style>
