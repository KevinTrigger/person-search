import PersonPage from "@containers/PersonPage";
import SearchPage from "@containers/SearchPage";

const routesConfig = [
  {
    path: '/people/:id',
    exact: true,
    component: <PersonPage />,
  },
  {
    path: "/",
    exact: true,
    component: <SearchPage />,
  },
];

export default routesConfig;
