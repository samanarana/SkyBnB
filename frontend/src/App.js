// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { ModalProvider, Modal } from './context/Modal';
import SpotTileList from './components/SpotTileList/SpotTileList';
import SpotDetails from './components/SpotDetails/index';
import CreateSpotForm from './components/CreateSpotForm';
import ManageSpots from './components/ManageSpots/index';
import UpdateSpot from './components/ManageSpots/UpdateSpot';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <ModalProvider>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route path="/create-spot">
            <CreateSpotForm />
          </Route>
          <Route path="/manage-spots">
            <ManageSpots />
          </Route>
          <Route path="/update-spot/:spotId">
            <UpdateSpot />
          </Route>
          <Route path="/">
            <SpotTileList />
          </Route>

        </Switch>
      )}
      <Modal />
    </ModalProvider>
  );
}

export default App;
