<script setup>
import { ref } from "vue";
import TranslateWindow from "@/components/TranslateWindow.vue";
import ArrowsIcon from "@/components/icons/ArrowsIcon.vue";
import { useStore } from "vuex";

const store = useStore();
const isButtonActive = ref(true);

const onClick = () => {
  if (isButtonActive.value) {
    isButtonActive.value = false;
    store.dispatch("swipeLangAndRequest");
    setTimeout(() => {
      isButtonActive.value = true;
    }, 1000);
  }
};
</script>

<template>
  <div class="wrapper">
    <TranslateWindow v-bind:lang="'firstLang'" />
    <span
      @click="onClick"
      :class="{ inactive: !isButtonActive }"
      class="lang-switcher"
    >
      <ArrowsIcon />
    </span>
    <TranslateWindow v-bind:lang="'secondLang'" />
  </div>
</template>
