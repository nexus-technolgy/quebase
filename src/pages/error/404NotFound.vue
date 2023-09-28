<template>
  <ErrorFullPage code="404" />
</template>

<script lang="ts">
import ErrorFullPage from "components/ErrorFullPage.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "404NotFound",
  components: { ErrorFullPage },
});
</script>
