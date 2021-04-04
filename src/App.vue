<template>
  <div id="app">
    <app-chat-panel />

    <app-settings-panel />
  </div>
</template>

<script>
import {
  mapActions,
  mapMutations,
  mapState,
} from 'vuex';

import firebase from './firebase';

import ChatPanel from './components/ChatPanel.vue';
import SettingsPanel from './components/SettingsPanel.vue';

export default {
  components: {
    AppChatPanel: ChatPanel,
    AppSettingsPanel: SettingsPanel,
  },
  data() {
    return {
      messageSubscriber: undefined,
      audio: undefined,
      isLoading: false,
    };
  },
  created() {
    this.messageSubscriber = firebase.firestore()
      .collection('messages')
      .where('time', '>=', new Date())
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges()
          .forEach((change) => {
            if (change.type === 'added') {
              this.pushMessage({
                id: change.doc.id,
                ...change.doc.data(),
              });
            } else if (change.type === 'removed') {
              this.deleteMessage(change.doc.id);
            }
          });
      });

    firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          this.setUser(user);
        }
      });
  },
  beforeDestroy() {
    this.messageSubscriber();
  },
  methods: {
    ...mapMutations(['setUser', 'pushMessage', 'deleteMessage']),
    ...mapActions(['login']),
  },
  computed: {
    ...mapState(['isPlaying', 'isChatPanelOpen']),
  },
};

</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Oxygen', 'Helvetica', sans-serif;
}

#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height: 100vh;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-size: cover;
}

#app-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height: 100vh;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.4);
}

.main-panel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;

  transition: all 250ms ease-in-out;

  @media screen and (max-width: 1000px) {
    &.shrink {
      height: 40vh;
    }
  }

  img {
    position: absolute;
    left: 50%;
    top: 10px;

    transform: translateX(-50%);

    max-width: 100px;
  }

  .play-pause-button {
    position: absolute;
    left: 50%;
    top: 50%;

    display: flex;

    transform: translateY(-50%) translateX(-50%);

    color: #D8D8D8;

    cursor: pointer;

    transition: all 250ms ease-in-out;

    &:hover {
      transform: translateY(-50%) translateX(-50%) scale(1.1);
    }

    &:active {
      transform: translateY(-50%) translateX(-50%) scale(0.9);
    }

    svg {
      width: 30vmin;
      height: 30vmin;
    }
  }

  &>.bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    text-align: center;

    span {
      color: white;
      font-size: 80px;

      cursor: pointer;
    }
  }
}
</style>
