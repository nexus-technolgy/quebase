<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column col-6">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1 full-width">
          <q-card-section
            ><h5>Verify Email</h5>
            <q-form class="q-gutter-md">
              <q-input filled clearable v-model="email" type="email" name="email" label="email address">
                <template v-slot:before><q-icon name="email" /></template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated size="lg" class="full-width" label="Verify" @click="fn.verifyEmail(email)" />
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
