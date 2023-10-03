<template>
  <q-page class="window-height window-width row justify-center bg-image">
    <div class="column">
      <div class="row">
        <h5 class="q-pt-xl text-white text-center full-width">Sign In</h5>
      </div>
      <div class="row">
        <q-card square class="q-pa-lg shadow-0" style="background: none">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                dark
                square
                filled
                clearable
                :disable="linkSent"
                v-model="email"
                name="email"
                type="email"
                label="Email"
                color="dark"
                bg-color="field"
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon name="email" color="white" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              class="full-width"
              color="dark"
              size="lg"
              :label="linkSent ? 'Resend Link' : 'Magic Link'"
              :loading="waiting"
              @click="throttle(fn.loginWithMagicLink, email, 10000)"
            />
            <q-btn
              v-if="!linkSent && !waiting"
              unelevated
              class="full-width q-mt-sm"
              color="dark"
              size="lg"
              label="google"
              @click="fn.loginWithGoogle(email)"
            />
            <q-btn
              v-else
              unelevated
              class="full-width q-mt-sm"
              color="dark"
              size="lg"
              label="cancel"
              @click="fn.linkSentToggle()"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="row">
        <p v-if="linkSent" class="text-white text-center full-width">
          Check your email for a link to login
        </p>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";

import { feedbackWrapper, throttle } from "@/helpers";
import { localStore, loginWithEmail, loginWithGoogle } from "@/services";

export default defineComponent({
  name: "AuthLogin",
  setup() {
    const q = useQuasar();
    const waiting = ref(false);
    const linkSent = ref(false);
    const email = ref(localStore.get<string>("email", ""));
    const fn = {
      linkSentToggle: () => (linkSent.value = !linkSent.value),
      loginWithMagicLink: (email: string) => {
        waiting.value = true;
        feedbackWrapper<string>(loginWithEmail, email)
          .then(() => (linkSent.value = true))
          .catch(() => (linkSent.value = false))
          .finally(() => (waiting.value = false));
      },
      loginWithGoogle: (email?: string) => {
        q.loading.show({ message: "Checking with Google" });
        loginWithGoogle(email);
      },
    };

    return { email, linkSent, waiting, throttle, fn };
  },
});
</script>
