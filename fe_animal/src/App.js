import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { useCookies } from "react-cookie";

import { authRoute, mainRoute } from "./Routes";

const App = () => {
  const [cookies] = useCookies(["auth"]);

  const routing = useRoutes([
    ...mainRoute(cookies.auth),
    ...authRoute(cookies.auth),
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
