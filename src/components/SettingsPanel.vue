<template>
  <div class="settings-panel">
    <div v-if="isLoggedIn">
      {{ user.name }}

      <div>
        <a @click="onSignOutClicked">Çıkış yap</a>
      </div>
    </div>
    <div v-else>
      <div>
        <a class="social" @click="onGoogleClicked" :style="{ backgroundColor: '#4285F4' }">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google icon</title><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
          <span>Login With Google</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState, mapActions, mapGetters,
} from 'vuex';

export default {
  methods: {
    ...mapActions(['signInWithGoogle', 'signOut']),
    onGoogleClicked() {
      this.signInWithGoogle().catch(() => {});
    },
    onSignOutClicked() {
      this.signOut().catch(() => {});
    },
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isLoggedIn']),
  },
};
</script>

<style lang="scss">
.settings-panel {
  position: fixed;
  right: 0;
  top: 0;

  height: 23vh;

  width: 250px;

  display: flex;
  flex-flow: column nowrap;

  &>div {
    flex: 1;

    text-align: center;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    &>div {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      color: white;
    }

    a {
      width: 100%;
      padding: 7px;
      margin: 7px;
      color: black;

      display: block;

      cursor: pointer;
      transition: all 250ms ease-in-out;

      text-align: center;

      &:hover {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }

      &>svg {
        max-width: 20px;
        fill: white;
      }

      &>span {
        display: block;
      }
    }
  }
}
</style>
