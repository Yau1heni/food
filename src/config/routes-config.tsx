import App from 'app/App.tsx';
import { RecipePage, RecipesPage } from 'app/pages';
import { routes } from 'config/routes.ts';
import { Navigate, type RouteObject } from 'react-router';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.recipes.mask,
        element: <RecipesPage />,
      },
      {
        path: routes.recipe.mask,
        element: <RecipePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
