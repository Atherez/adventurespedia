import axios from "axios";

export const state= ()  => ({
  items:[],
  initialized: false,
})

export const mutations = {
  setData(state, payload) {
    state.items = payload.categories;
    state.initialized = true
  },
}
export const actions = {
  async init({ commit, state, rootState }) {
    if (state.initialized) {
      return;
    }
    // Fetching recent posts
    let categories = []
    const response = await axios.get(`${rootState.config.wp_url}/wp-json/wp/v2/categories`);
    if(response && response.data)
    {
      for(const category of response.data.filter(c=> c.parent == 0)){
        if(category.slug !== 'uncategorized'){
           let item = {
             ...category
           }
           const children = response.data.filter(c=> c.parent == category.id)
           if(children.length){
             item['children'] = children;
           }
           categories.push(item);
        }
      }
    }
    commit('setData', { categories})
  },
};

