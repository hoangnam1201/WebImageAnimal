import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import { useCookies } from "react-cookie";
import { adminRoute, authRoute, galleryRoute, mainRoute } from "./Routes";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  const [cookies] = useCookies(["infoUser"]);

  const routing = useRoutes([
    ...mainRoute(cookies.infoUser),
    ...authRoute(cookies.infoUser),
    ...adminRoute(cookies.infoUser),
    ...galleryRoute(),
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
