<template>
  <div class="preferences">
    <img src="@/assets/settings2.png" class="settings" @click="show = true" />
    <transition name="modal-appear">
      <section v-if="show" class="modal-group">
          <div class="modal-container">
            <div class="modal-preferences-list">
            <label for="">How would you describe a good day?</label>
            <p v-for="(config, index) in userPreferences" :key="index">
              <label>{{config.name}}: </label>
              <input
                class="preferences-input"
                type="range"
                :min="config.min"
                :max="config.max"
                @input="preferenceValueChanged(index, $event)"
                :value="config.value"
              >
              <label> {{config.value}} {{config.units}}</label>
            </p>
            </div>
            <button @click="savePreferences()">Save</button>
          </div>
      </section>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import storage from '@/utils/storage';

export default {
  name: 'Preferences',
  data() {
    return {
      show: false,
    };
  },
  computed: mapState(['userPreferences']),
  methods: {
    preferenceValueChanged(index, event) {
      const { target } = event;
      const { value } = target;

      this.$store.commit('setUserPreference', {
        index,
        value: parseInt(value, 10),
      });
    },
    savePreferences() {
      storage.setPreferences(this.userPreferences);

      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.preferences {
  color: #2c3e50;
  position: absolute;
  top: 20px;
  left: 20px;
  .settings {
    transition: all 0.1s;
    width: 32px;
    height: 32px;
    &:hover {
      transform: scale(1.2) rotate(45deg);;
    }
  }
  .modal-group {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .modal-container {
      width: 290px;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      font-family: Arial, sans-serif;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      .modal-preferences-list {
        text-align: left;
        .preferences-input {
          width: 100px;
        }
      }
    }
  }
  .modal-appear-enter-active,
  .modal-appear-leave-active {
    transition: all .5s;
    .modal-container {
      transition: width .5s ease;
    }
  }
  .modal-appear-enter,
  .modal-appear-leave-to{
    opacity: 0;
    .modal-container {
      width: 0;
    }
  }
}

</style>
