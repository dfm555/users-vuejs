import objectPath from "object-path";
import axios from "axios";
import merge from "deepmerge";
import config from "@/core/config/layout.config.json";

// action types
export const SET_LAYOUT_CONFIG = "setLayoutConfig";
export const RESET_LAYOUT_CONFIG = "resetLayoutConfig";
export const OVERRIDE_LAYOUT_CONFIG = "overrideLayoutConfig";
export const OVERRIDE_PAGE_LAYOUT_CONFIG = "overridePageLayoutConfig";
export const LIST_ALL_COUNTRIES = "listAllCountries";

// mutation types

export default {
  state: {
    config: config,
    initial: config,
    countries: []
  },
  getters: {
    /**
     * Get config from layout config
     * @param state
     * @returns {function(path, defaultValue): *}
     */
    layoutConfig: state => (path, defaultValue) => {
      return objectPath.get(state.config, path, defaultValue);
    },
    countries(state) {
      return state.countries;
    }
  },
  actions: {
    /**
     * Set and replace the whole config
     * @param state
     * @param payload
     */
    [SET_LAYOUT_CONFIG](state, payload) {
      state.commit(SET_LAYOUT_CONFIG, payload);
    },

    /**
     * Reset the config at the initial state
     * @param state
     */
    [RESET_LAYOUT_CONFIG](state) {
      state.commit(RESET_LAYOUT_CONFIG);
    },

    /**
     * Reset the config using saved config in the cache by the layout builder
     * @param state
     */
    [OVERRIDE_LAYOUT_CONFIG](state) {
      state.commit(OVERRIDE_LAYOUT_CONFIG);
    },

    /**
     * Override config by page level
     * @param state
     * @param payload
     */
    [OVERRIDE_PAGE_LAYOUT_CONFIG](state, payload) {
      state.commit(OVERRIDE_PAGE_LAYOUT_CONFIG, payload);
    },

    [LIST_ALL_COUNTRIES](context) {
      return new Promise(resolve => {
        axios
          .get("https://restcountries.eu/rest/v2/all")
          .then(({ data }) => {
            context.commit(LIST_ALL_COUNTRIES, data);
            resolve(data);
          })
          .catch(response => {
            throw new Error(`[KT] ApiService ${response}`);
          });
      });
    }
  },
  mutations: {
    [SET_LAYOUT_CONFIG](state, payload) {
      state.config = payload;
    },
    [RESET_LAYOUT_CONFIG](state) {
      state.config = Object.assign({}, state.initial);
    },
    [OVERRIDE_LAYOUT_CONFIG](state) {
      state.config = state.initial = Object.assign(
        {},
        state.initial,
        JSON.parse(localStorage.getItem("config"))
      );
    },
    [OVERRIDE_PAGE_LAYOUT_CONFIG](state, payload) {
      state.config = merge(state.config, payload);
    },
    [LIST_ALL_COUNTRIES](state, countries) {
      state.countries = countries.map(country => country.name);
    }
  }
};
