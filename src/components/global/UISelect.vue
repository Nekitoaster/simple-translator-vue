<script setup>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
const props = defineProps(["lang"]);
const store = useStore();
const languagesData = computed(() => {
  return store.state.languagesData;
});
const currentLang = computed(() => {
  return props.lang === "firstLang"
    ? store.state.firstLang
    : store.state.secondLang;
});
const switchLang = (e) => {
  if (props.lang === "firstLang") {
    store.commit("SET_FIRST_LANG", e.target.value);
  } else {
    store.commit("SET_SECOND_LANG", e.target.value);
  }
  store.dispatch("fetchTranslateResponse");
};
onMounted(() => {
  store.dispatch("fetchLanguagesData");
});
// Следить за изменением currentLang и вызывать fetchTranslateResponse
watch(
  () => currentLang.value,
  () => {
    store.dispatch("fetchTranslateResponse");
  }
);
</script>

<template>
  <select
    @input="switchLang($event)"
    v-model="currentLang"
    class="custom-select"
  >
    <option
      v-for="lang in languagesData.languages"
      :key="lang.language"
      class="custom-select__option"
      v-bind:value="lang.language"
    >
      {{ lang.name }}
    </option>
  </select>
</template>

