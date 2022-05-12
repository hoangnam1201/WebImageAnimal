import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { useCookies } from "react-cookie";

import { authRoute, galleryRoute, mainRoute } from "./Routes";

const App = () => {
  const [cookies] = useCookies(["auth"]);

  const routing = useRoutes([
    ...mainRoute(cookies.auth),
    ...authRoute(cookies.auth),
    ...galleryRoute(),
  ]);

  return <>{routing}</>;
};
const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
