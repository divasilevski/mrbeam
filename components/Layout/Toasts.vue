<template>
  <AppToast v-if="pwa.needRefresh">
    <div>New content available, click on reload button to update.</div>

    <div>
      <button @click="pwa.updateServiceWorker()">Reload</button>
      <button @click="pwa.cancelPrompt()">Not now</button>
    </div>
  </AppToast>

  <AppToast v-if="isInstallNeeded">
    <div>Install app?</div>

    <div>
      <button @click="pwa.install()">Install</button>
      <button @click="pwa.cancelInstall()">Not now</button>
    </div>
  </AppToast>
</template>

<script lang="ts" setup>
const pwa = useVitePwa()

const isInstallNeeded = computed(
  () => pwa.showInstallPrompt && !pwa.offlineReady && !pwa.needRefresh
)
</script>
