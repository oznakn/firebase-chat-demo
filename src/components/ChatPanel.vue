<template>
  <div class="chat-panel">
    <div class="messages-container">
      <div class="messages" ref="messages">
        <div v-for="message in messages"
            :key="message.id">
            <span>{{ message.user.name }}</span>
          {{ message.text }}
        </div>
      </div>
    </div>

    <div class="new-message">
      <textarea
          v-model="message"
          rows="1"
          :disabled="!isLoggedIn"
          ref="textarea"
      />

      <template v-if="!isLoggedIn" >
        <span class="login-to-message">Yazabilmek için giriş yap</span>
      </template>

      <template v-else>
        <span class="send-button material-icons" @click="submit">
          send
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import autosize from 'autosize';
import {
  mapState, mapActions, mapGetters,
} from 'vuex';

export default {
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    const $textarea = this.$refs.textarea;
    autosize($textarea);

    $textarea.addEventListener('autosize:resized', this.onTextareaResize);
    $textarea.addEventListener('keydown', this.onKeyDown);
  },
  beforeDestroy() {
    const $textarea = this.$refs.textarea;

    $textarea.removeEventListener('autosize:resized', this.onTextareaResize);
    $textarea.removeEventListener('keydown', this.onKeyDown);
  },
  watch: {
    messages() {
      this.$nextTick(this.resizeMessages);
    },
    message(val) {
      this.message = val.length < 350 ? val : val.slice(0, 350);

      this.$nextTick(() => {
        const $textarea = this.$refs.textarea;
        autosize.update($textarea);
      });
    },
  },
  methods: {
    ...mapActions(['sendMessage']),
    onKeyDown(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();

        if (this.computedMessage !== '') {
          this.submit();
        }
      }
    },
    onTextareaResize() {
      this.$nextTick(this.resizeMessages);
    },
    resizeMessages() {
      const $em = this.$refs.messages;
      $em.scrollTop = $em.scrollHeight;
    },
    submit() {
      this.sendMessage({ text: this.computedMessage })
        .catch(() => {});

      this.message = '';
      const $textarea = this.$refs.textarea;
      $textarea.style.rows = 1;

      this.$nextTick(() => {
        autosize.update($textarea);
      });
    },
  },
  computed: {
    ...mapState(['messages']),
    ...mapGetters(['isLoggedIn']),
    computedMessage() {
      return this.message.trim();
    },
  },
};
</script>

<style lang="scss">
.chat-panel {
  position: fixed;

  display: flex;
  flex-flow: column nowrap;

  transition: all 250ms ease-in-out;

  left: 0;
  top: 0;
  bottom: 0;

  min-width: 240px;
  width: 25vw;

  margin-top: 25px;

  &>.messages-container {
    flex: 1;
    position: relative;

    overflow: hidden;

    &>.messages {
      width: calc(105%);
      display: flex;
      flex-flow: column nowrap;
      height: 100%;

      overflow-x: hidden;
      overflow-y: scroll;

      position: relative;

      word-break: break-all;

      &>div {
        margin: 5px auto 5px 40px;

        padding: 8px;

        background: #FEFEFE;
        border-radius: 12.5px;

        font-size: 13px;
        max-width: 75%;

        &>span {
          font-size: 12px;

          font-weight: bold;
        }
      }
    }
  }

  &>.new-message {
    position: relative;
    margin: 20px 40px;
    padding: 7px 14px;

    color: white;
    background: rgba(216, 216, 216, 1);

    display: flex;
    flex-flow: row nowrap;

    align-items: center;

    textarea {
      flex: 1;
      background: none;

      border: none;
      outline: none;
      resize: none;
      font-size: 15px;

      font-family: 'Oxygen', 'Helvetica', sans-serif;
    }

    .send-button {
      cursor: pointer;
      color: black;

      transition: all 250ms ease-in-out;

      &:hover, &:focus, &:active {
        transform: scale(1.1);
      }
    }

    .login-to-message {
      color: black;

      position: absolute;
      text-align: center;
      width: 100%;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
