<script setup>
import TranslateWindow from "@/components/TranslateWindow.vue";
import ArrowsIcon from "@/components/icons/ArrowsIcon.vue";
import { useStore } from "vuex";

const store = useStore();

// console.log(firstLang.value, secondLang.value);

const onClick = () => {
  store.dispatch("swipeLangAndRequest");
  // console.log(firstLang.value, secondLang.value);
};
</script>

<template>
  <div class="wrapper">
    <TranslateWindow v-bind:lang="'firstLang'" />
    <span class="lang-switcher">
      <ArrowsIcon @click="onClick" />
    </span>
    <TranslateWindow v-bind:lang="'secondLang'" />
  </div>
</template>
