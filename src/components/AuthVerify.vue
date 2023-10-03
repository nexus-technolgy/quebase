<template>
  <q-page class="window-height window-width row justify-center bg-image">
    <div class="column">
      <div class="row">
        <h5 class="q-pt-xl text-white text-center full-width">Verify Email</h5>
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
              label="Verify"
              @click="fn.verifyEmail(email)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { localStore } from "@/services";

export default defineComponent({
  name: "AuthVerify",
  setup(props, { emit }) {
    const email = ref(localStore.get<string>("email"));
    const fn = {
      verifyEmail: (verify: string) => {
        localStore.set("email", verify);
        emit("verify", verify);
      },
    };

    return { email, fn };
  },
});
</script>
