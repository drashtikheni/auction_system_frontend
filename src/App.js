import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import "./App.css"
import Users from "./users/pages/Users"
import NewPlace from "./places/pages/NewPlace"
import MainNavigation from "./shared/components/Navigation/MainNavigation"
import UserPlaces from "./places/pages/UserPlaces"
import UpdatePlace from "./places/pages/UpdatePlace"
import Auth from "./users/pages/Auth"
import { AuthContext } from "./shared/context/auth-context"
import { useAuth } from "./shared/hooks/auth-hook"

// const Users = React.lazy(() => import("./users/pages/Users"))
// const NewPlace = React.lazy(() => import("./places/pages/NewPlace"))
// const MainNavigation = React.lazy(() => import("./shared/components/Navigation/MainNavigation"))
// const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"))
// const UpdatePlace = React.lazy(() => import("./places//pages/UpdatePlace"))
// const Auth = React.lazy(() => import("./users/pages/Auth"))
// const LoadingSpinner = React.lazy(() => import("./shared/components/UIElements/LoadingSpinner"))

function App()
{

  const { token, userId, login, logout } = useAuth()
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places/" exact>
          <UserPlaces />
        </Route>
        <Route path="/auctions/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places/" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
        <BrowserRouter>
          <MainNavigation />
          <main>{routes}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App;
