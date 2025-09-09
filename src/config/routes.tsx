import App from 'app/App.tsx';
import { FoodPage } from 'app/pages';
import { Navigate, type RouteObject } from 'react-router';

export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  food: {
    mask: 'food',
    create: () => '/food',
  },
};

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.food.mask,
        element: <FoodPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
