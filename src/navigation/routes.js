import { Dashboard, Settings, SignIn } from "../pages";

export const routesPublic = [
  {
    path: "/signIn",
    exact: true,
    component: SignIn,
  },
];

export const routesPrivate = [
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/settings",
    exact: true,
    component: Settings,
  },
];
