<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">{{ code }}</div>

      <div class="text-h2" style="opacity: 0.4">{{ message }}</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorFullPage",
  props: {
    error: {
      type: Error,
      required: false,
    },
    errorCode: {
      type: String,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    let code = props.errorCode ?? "404";
    let message = props.errorMessage ?? "Oops! Looks like there's nothing here";
    if (props.error) {
      code = props.error.name ?? "500";
      message = props.error.message;
    }
    return { code, message };
  },
});
</script>
