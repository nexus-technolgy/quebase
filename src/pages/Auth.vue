<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="verify">
      <AuthVerify @verify="verifyLinkCode" />
    </div>
    <div v-else>
      <AuthLogin />
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { logger } from "@/boot";
import AuthLogin from "@/components/AuthLogin.vue";
import AuthVerify from "@/components/AuthVerify.vue";
import { navTo } from "@/router";
import { localStore, verifyLinkCode, verifyRedirectResult } from "@/services";

export default defineComponent({
  name: "AuthPage",
  components: { AuthLogin, AuthVerify },
  setup() {
    const q = useQuasar();
    const verify = ref(false);
    const { apiKey, lang, mode, oobCode } = useRoute().query;

    const toggleVerify = () => {
      verify.value = !verify.value;
    };

    q.loading.show();

    onMounted(async () => {
      // Check for OAuth Response Pending
      const result = await verifyRedirectResult();
      logger.debug("Auth Result", result);

      // Check for Magic Link redirection params
      if (apiKey && lang && mode && oobCode) {
        const email = localStore.get<string>("email");
        if (email) await verifyLinkCode(email);
        else toggleVerify();
      }

      q.loading.hide();

      if (localStore.has("uid")) {
        logger.info("Already logged in");
        navTo("/home");
      }
    });

    return { verify, verifyLinkCode };
  },
});
</script>
