export const state = () => ({
});

export const actions = {
  async nuxtServerInit({ dispatch, state }, { req }) {
    await dispatch('categories/init');
    await dispatch('posts/init');
    await dispatch('authors/init');
    //await dispatch('tags/init');
  },
};
