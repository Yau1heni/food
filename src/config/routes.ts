export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  recipes: {
    mask: '/recipes',
    create: () => '/recipes',
  },
  recipe: {
    mask: '/recipes/:id',
    create: (id: string) => `/recipes/${id}`,
  },
};
