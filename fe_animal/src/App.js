import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { useCookies } from "react-cookie";
import { adminRoute, authRoute, mainRoute } from "./Routes";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  const [cookies] = useCookies(["auth"]);

  const routing = useRoutes([
    ...mainRoute(cookies.auth),
    ...authRoute(cookies.auth),
    ...adminRoute(cookies.auth),
  ]);

  return <>{routing}</>;
};
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export default AppWrapper;
