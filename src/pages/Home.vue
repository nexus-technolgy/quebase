<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <q-img v-if="user.photoURL" :src="user.photoURL" />
      <h3>{{ user.displayName }}</h3>
      <pre>{{ JSON.stringify(user.metadata, null, 2) }}</pre>
      <q-space />
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Logout"
        @click="logout"
        color="primary"
      />
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Test API"
        @click="apiTest('test')"
        color="primary"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { User } from "firebase/auth";
import { Notify } from "quasar";
import { defineComponent, onMounted, reactive } from "vue";

import { api, logger } from "@/boot";
import { getCurrentUser, logout } from "@/services";

export default defineComponent({
  name: "HomePage",
  setup() {
    const user = reactive({} as User);

    const apiTest = (url: string) => {
      api
        .call(url)
        .then((result) => {
          Notify.create({
            message: "API request success",
            position: "top-right",
            type: "positive",
          });
          logger.info(result);
        })
        .catch(() => {
          Notify.create({ message: "API request failed", position: "top-right", type: "negative" });
        });
    };

    onMounted(async () => {
      getCurrentUser().then((details) => Object.assign(user, details));
    });
    return { apiTest, logout, user };
  },
});
</script>
