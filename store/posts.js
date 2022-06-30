
import axios from "axios";


export const state= ()  => ({
  recent_posts:[],
  category_posts: {},
  relevant_posts: [],
  initialized: false,
})

export const mutations = {
  setData(state, payload) {
    state.recent_posts = payload.recent_posts;
    state.relevant_posts = payload.relevant_posts;
    state.category_posts = payload.category_posts;
    state.initialized = true
  },
}
export const actions = {
  async init({ commit, state, rootState }) {
    if (state.initialized) {
      return;
    }
    // Fetching recent posts
    let response = await axios.get(`${rootState.config.wp_url}/wp-json/wp/v2/posts`, {
      params:{
        per_page: 12
      }
    });
    let payload = {
      recent_posts: [],
      relevant_posts:[],
      category_posts: []
    }
    if(response && response.data)
      payload.recent_posts = response.data;

    commit('setData', payload)
  },
};

