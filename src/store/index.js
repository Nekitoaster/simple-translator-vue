import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    languagesData: {},
    translateRequest: "",
    translateResponse: {},
    firstLang: "en",
    secondLang: "ru",
  },
  getters: {
    getLanguagesData: (state) => {
      return state.languagesData;
    },
  },
  actions: {
    fetchLanguagesData({ commit }) {
      const options = {
        method: "GET",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2/languages",
        headers: {
          "x-rapidapi-key":
            "11c3c231eamsh0c86a40fc748a63p1d7c0cjsnf4dd0c57a608",
          "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then((res) => res.data)
        .then((data) => {
          commit("SET_LANGUAGES_DATA", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fetchTranslateResponse({ commit, state }) {
      const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "x-rapidapi-key":
            "11c3c231eamsh0c86a40fc748a63p1d7c0cjsnf4dd0c57a608",
          "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          q: state.translateRequest,
          source: state.firstLang,
          target: state.secondLang,
        },
      };

      if (state.translateRequest) {
        axios
          .request(options)
          .then((res) => res.data)
          .then((data) => {
            commit("SET_TRANSLATE_RESPONSE", data);
            // console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    swipeLangAndRequest({ commit, state }) {
      const newFirstLang = state.secondLang;
      const newSecondLang = state.firstLang;
      const newRequest =
        state.translateResponse.data?.translations.translatedText;
      commit("SET_FIRST_LANG", newFirstLang);
      commit("SET_SECOND_LANG", newSecondLang);
      commit("SET_TRANSLATE_REQUEST", newRequest);
    },
  },
  mutations: {
    SET_LANGUAGES_DATA(state, languagesData) {
      state.languagesData = languagesData;
    },

    SET_TRANSLATE_RESPONSE(state, translateResponse) {
      state.translateResponse = translateResponse;
    },

    SET_TRANSLATE_REQUEST(state, translateRequest) {
      state.translateRequest = translateRequest;
    },

    SET_FIRST_LANG(state, firstLang) {
      state.firstLang = firstLang;
    },
    SET_SECOND_LANG(state, secondLang) {
      state.secondLang = secondLang;
    },
  },
});
