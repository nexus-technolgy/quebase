<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { fingerprint } from "@nexustech/fingerprint";
import { logger } from "@nexustech/logger";
import { defineComponent, onMounted, ref } from "vue";

import { localStore } from "@/services";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    onMounted(async () => {
      const now = Date.now();
      const { uniqueId, browserId } = await fingerprint(logger);
      logger.debug(`Fingerprint complete (${Date.now() - now}ms)`, {
        uniqueId,
        browserId,
      });
      const b64 = btoa(
        JSON.stringify({
          uniqueId,
          browserId,
        })
      );
      const stored = JSON.parse(atob(localStore.get<string>("sid", b64)));
      if (!localStore.has("sid")) localStore.set("sid", b64);
      if (uniqueId !== stored.uniqueId && browserId !== stored.browserId) {
        logger.warn("Device mismatch", {
          stored,
          derived: { uniqueId, browserId },
        });
        localStore.set("sid", b64);
      }
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
