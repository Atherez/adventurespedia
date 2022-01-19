import axios from "axios";

export const state= ()  => ({
  items:[],
  initialized: false,
})

export const mutations = {
  setData(state, payload) {
    state.items = payload.authors;
    state.initialized = true
  },
}
export const actions = {
  async init({ commit, state, rootState }) {
    if (state.initialized) {
      return;
    }
    // Fetching recent posts
    let authors = []
    const response = await axios.get(`${rootState.config.wp_url}/wp-json/wp/v2/users`);
    if(response && response.data)
    {
      authors =  response.data
    }
    commit('setData', { authors})
  },
};

