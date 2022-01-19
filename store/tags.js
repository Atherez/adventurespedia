import axios from "axios";

export const state= ()  => ({
  items:[],
  initialized: false,
})

export const mutations = {
  setData(state, payload) {
    state.items = payload.tags;
    state.initialized = true
  },
}
export const actions = {
  async init({ commit, state, rootState }) {
    if (state.initialized) {
      return;
    }
    // Fetching recent posts
    let tags = []
    const response = await axios.get(`${rootState.config.wp_url}/wp-json/wp/v2/tags`,{
      params:{
        hide_empty: true
      }
    });
    if(response && response.data)
    {
      tags =  response.data;
    }
    commit('setData', { tags })
  },
};

