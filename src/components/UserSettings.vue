<template>
  <div class="settings" v-bind:class="{ active: show }">
    <img src="@/assets/settings2.png" class="settings" @click="show = true" />
    <transition name="modal-appear">
      <section v-if="show" class="modal-group">
          <div class="modal-container">
            <div class="modal-settings-list">
            <p>How would you describe a good day?</p>
            <p v-for="(config, index) in userPreferences" :key="index">
              <label>{{config.name}}:
                <input
                  class="settings-input"
                  type="range"
                  :min="config.min"
                  :max="config.max"
                  @input="preferenceValueChanged(index, $event)"
                  :value="config.value"
                >
              </label>
              <span> {{config.value}} {{config.units}}</span>
            </p>
            </div>
            <button class="save-button" @click="savePreferences()">Save</button>
          </div>
      </section>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import storage from '@/utils/storage';

export default {
  name: 'UserSettings',
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
.settings {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  &.active {
    width: 100%;
    height: 100%;
  }
  .settings {
    margin-left: 20px;
    margin-top: 20px;
    transition: all 0.2s;
    width: 32px;
    height: 32px;
    &:hover {
      transform: scale(1.2) rotate(45deg);;
    }
  }
  .save-button {
    padding: 5px 15px;
    background-color: #047fa5;
    color: #dddddd;
    font-size: 20px;
    border-radius: 6px;
  }
  .modal-group {
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .modal-container {
      width: 290px;
      padding: 20px 30px;
      background-color: #2593b4;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      .modal-settings-list {
        text-align: left;
        .settings-input {
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
