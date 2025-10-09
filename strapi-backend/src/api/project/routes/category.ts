export default {
  routes: [
    {
      method: 'GET',
      path: '/projects/categories',
      handler: 'project.getCategories',
      config: {
        policies: [],
        auth: false, // Set to true if you want it protected
      },
    },
  ],
};