import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import NewPlace from "./places/pages/newPlace/newPlace.page.jsx";
// import UserPlace from "./places/pages/userPlace/userPlace.page.jsx";
// import User from "./users/pages/users.page.jsx";
// import UpdatePlace from "./places/pages/updatePlace/updatePlace.page.jsx";
// import Auth from "./users/pages/authJs/auth.component.jsx";
import MainNavigation from "./shared/navigation/mainNavigation/mainNavigation.component.jsx";
import { AuthContext } from "./shared/context/auth-context.js";
import { useAuth } from "./shared/hooks/auth-hook";

import "./App.css";
import LoadingSpinner from "./shared/uiElements/LoadingSpinner.jsx";

const User = React.lazy(() => import("./users/pages/users.page.jsx"));
const UserPlace = React.lazy(() =>
  import("./places/pages/userPlace/userPlace.page.jsx")
);
const NewPlace = React.lazy(() =>
  import("./places/pages/newPlace/newPlace.page.jsx")
);
const UpdatePlace = React.lazy(() =>
  import("./places/pages/updatePlace/updatePlace.page.jsx")
);
const Auth = React.lazy(() =>
  import("./users/pages/authJs/auth.component.jsx")
);

function App() {
  const { login, logout, token, userId } = useAuth();

  const route1 = (
    <Switch>
      <Route path="/" exact>
        <User />
      </Route>
      <Route path="/:userId/places" exact>
        <UserPlace />
      </Route>
      <Route path="/places/new" exact>
        <NewPlace />
      </Route>
      <Route path="/places/:placeId" exact>
        <UpdatePlace />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  const route2 = (
    <Switch>
      <Route path="/" exact>
        <User />
      </Route>
      <Route path="/:userId/places" exact>
        <UserPlace />
      </Route>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );
  let routes = token ? route1 : route2;

  return (
    <div className="app">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <MainNavigation />
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner asOverlay />
            </div>
          }
        >
          {routes}
        </Suspense>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
