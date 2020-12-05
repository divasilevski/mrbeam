<template lang="pug">
  .app
    .app-wrap
      .app__tabs
        nuxt-link.tab(exact to="/")
          .tab__title Documentation
        nuxt-link.tab(exact to="/create")
          .tab__title Creation
        nuxt-link.tab(exact to="/calculate")
          .tab__title Calculation
      .app__pages
        .container
          Nuxt
</template>

<style lang="scss">
.app {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: $bg;
  color: $imain;

  .app-wrap {
    display: flex;
    justify-content: center;
    padding: 20px;

    .app__tabs {
      width: 200px;
      display: flex;
      flex-direction: column;
      margin-right: 10px;
    }

    .app__pages {
      max-width: 800px;
      width: 100%;
      height: calc(100vh - 2 * 20px);
      background: $main;
    }
  }
}

.tab {
  position: relative;
  background: $main;
  height: 50px;
  margin-bottom: 10px;
  padding: 7px;

  &.nuxt-link-active::after {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 7px;
    background: $accent;
  }

  .tab__title {
    color: $imain;
  }
}

@include md {
  .app .app-wrap {
    padding: 5px;

    .app__tabs {
      margin-right: 0;
      position: fixed;
      bottom: 0;
      flex-direction: row;
      width: 100vw;
      border-top: 1px solid $bg;
    }
    .app__pages {
      max-width: none;
      height: calc(100vh - 5px - 50px);
    }
  }

  .tab {
    margin: 0;
    width: calc(100% / 3);

    &:not(:last-child) {
      border-right: 1px solid $bg;
    }
  }
}

.container {
  padding: 10px;
}
</style>
