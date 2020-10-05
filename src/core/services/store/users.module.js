import ApiService from "@/core/services/api.service";

// action types

export const LIST_USERS = "listUsers";
export const ADD_USER = "addUser";
export const UPDATE_USER = "updateUser";
export const DELETE_USER = "deleteUser";

// mutation types
export const SET_ERROR = "setError";
export const SET_LOADING = "setLoading";
export const SET_SUCCESS = "setSuccess";

const state = {
  errors: null,
  success: null,
  loading: false,
  users: []
};

const getters = {
  listUsers(state) {
    return state.users;
  },
  errors(state) {
    return state.errors;
  },
  success(state) {
    return state.success;
  },
  loading(state) {
    return state.loading;
  }
};

const actions = {
  [LIST_USERS](context) {
    context.commit(SET_LOADING, true);
    return new Promise(resolve => {
      ApiService.setHeader();
      ApiService.query("users", {
        params: {
          $limit: "-1"
        }
      })
        .then(({ data }) => {
          context.commit(LIST_USERS, data);
          context.commit(SET_LOADING, false);
          context.commit(SET_ERROR, false);
          context.commit(SET_SUCCESS, null);
          resolve(data);
        })
        .catch(response => {
          context.commit(SET_ERROR, response.data);
          context.commit(SET_LOADING, false);
        });
    });
  },
  [ADD_USER](context, payload) {
    context.commit(SET_LOADING, true);
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.post("users", payload)
        .then(({ data }) => {
          resolve(data);
          context.commit(SET_LOADING, false);
          context.commit(SET_SUCCESS, true);
          context.commit(SET_ERROR, false);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
          context.commit(SET_LOADING, false);
          context.commit(SET_SUCCESS, false);
          reject(response);
        });
    });
  },
  [DELETE_USER](context, id) {
    context.commit(SET_LOADING, true);
    return new Promise((resolve, reject) => {
      ApiService.setHeader();
      ApiService.delete(`users/${id}`)
        .then(({ data }) => {
          resolve(data);
          context.commit(DELETE_USER, data);
          context.commit(SET_LOADING, false);
          context.commit(SET_ERROR, false);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
          context.commit(SET_LOADING, false);
          reject(response);
        });
    });
  },
  [UPDATE_USER](context, payload) {
    context.commit(SET_LOADING, true);
    return new Promise((resolve, reject) => {
      const { _id } = payload;
      ApiService.setHeader();
      ApiService.update("users", _id, payload)
        .then(({ data }) => {
          resolve(data);
          context.commit(SET_LOADING, false);
          context.commit(SET_SUCCESS, true);
          context.commit(SET_ERROR, false);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
          context.commit(SET_LOADING, false);
          context.commit(SET_SUCCESS, false);
          reject(response);
        });
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_SUCCESS](state, success) {
    state.success = success;
  },
  [SET_LOADING](state, status) {
    state.loading = status;
  },
  [LIST_USERS](state, users) {
    state.users = users;
  },
  [DELETE_USER](state, user) {
    state.users = state.users.filter(value => value._id !== user._id);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
