<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column col-6">
      <div class="row">
        <q-card class="q-px-lg shadow-w full-width">
          <q-card-section
            ><h5>Sign In</h5>
            <q-form class="q-gutter-md">
              <q-input filled clearable v-model="email" type="email" label="email address" name="email" autofocus>
                <template v-slot:before><q-icon name="email" /></template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated size="lg" class="full-width" label="Magic Link" @click="fn.loginWithMagicLink(email)" />
            <q-btn unelevated size="lg" class="full-width q-mt-sm" label="google" @click="fn.loginWithGoogle(email)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";

import { feedbackWrapper } from "@/helpers";
import { localStore, loginWithEmail, loginWithGoogle } from "@/services";

export default defineComponent({
  name: "AuthLogin",
  setup() {
    const q = useQuasar();
    const email = ref(localStore.get<string>("email", ""));
    const fn = {
      loginWithMagicLink: (email: string) => feedbackWrapper<string>(loginWithEmail, email),
      loginWithGoogle: (email?: string) => {
        q.loading.show();
        loginWithGoogle(email);
      },
    };

    return { email, fn };
  },
});
</script>
