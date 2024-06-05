<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps(["lang"]);
const store = useStore();

const translateRequest = computed(() => {
  return store.state.translateRequest;
});

const translateResponse = computed(() => {
  return store.state.translateResponse;
});

let timer = null;

const onChange = (e) => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }

  if (e.target.value === '') {
      store.commit('SET_TRANSLATE_RESPONSE', '');
    }
  timer = setTimeout(() => {
    console.log(translateResponse.value);
    store.commit("SET_TRANSLATE_REQUEST", e.target.value);
    store.dispatch("fetchTranslateResponse");
  }, 600);
};

console.log(translateRequest);

</script>

<template>
  <div class="translate-container__input-box">
    <textarea
      v-model="translateRequest"
      @input="onChange($event)"
      v-if="props.lang === 'firstLang'"
      class="input-box__textarea"
    />
    <div v-else-if="props.lang === 'secondLang'" class="input-box__results">
      {{ translateResponse.data?.translations.translatedText }}
    </div>
  </div>
</template>

<style scoped>

</style>