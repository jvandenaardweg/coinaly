<template>
  <div class="modal" :class="{'is-visible': visible }" @click="handleOutsideClick($event)">
    <div class="modal-popup">
      <header class="modal-popup__header">
        <h2>{{ readableType }} {{ currency.Currency }}</h2>
        <small v-if="type === 'sell'">{{ currency.Available }} available</small>
      </header>
      <div class="modal-popup__body">
        <strong>This is a work in progress.<br/><br/><br/></strong>
        <div>
          <label>Amount</label>
          <input type="text" name="amount" />
        </div>
        <div>
          <label>Price</label>
          <input type="text" name="amount" />
        </div>
      </div>
      <div class="modal-popup__footer">
        <Button :label="'Cancel'" :className="'danger'" @click.native="$emit('close')"></Button>
        <Button :label="readableType" :className="'success'"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  name: 'Modal',
  props: ['type', 'visible', 'currency'],
  components: {
    Button
  },
  computed: {
    readableType () {
      if (this.type === 'sell') {
        return 'Sell'
      } else {
        return 'Buy'
      }
    }
  },
  methods: {
    handleOutsideClick (event) {
      if (event.target.classList.contains('modal')) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  padding: 15px;
  text-align: center;
  display: none;

  &.is-visible {
    display: block;
  }

  .modal-popup {
    width: 100%;
    position: relative;
    height: auto;
    background-color: #fff;
    padding: 15px;
    max-width: 500px;
    display: inline-block;
    text-align: left;

    .modal-popup__header {
      display: flex;
      line-height: 3rem;
      border-bottom: 1px #DFE1E3 solid;
      padding: 0 0 15px 0;

      h2 {
        margin: 0;
      }

      small {
        margin-left: auto;
        font-size: 1.2rem;
        opacity: 0.5;
      }
    }

    .modal-popup__body {
      padding: 15px 0 0 0;
    }

    .modal-popup__footer {
      text-align: right;
    }
  }
}
</style>
