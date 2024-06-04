<script setup>
import UISelect from "./global/UISelect.vue";
import UIInput from "./global/UIInput.vue";

const props = defineProps(['lang'])
</script>


<template>
  <div class="translate-container">
    <div class="translate-container__lang-change-container">
      <UISelect v-bind:lang="props.lang" />
    </div>
    <UIInput v-bind:lang="props.lang" />
  </div>
</template>
