import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import GamesPage from './components/GamesPage';
import Art from "./components/Art";
import ArtFormPage from "./components/ArtFormPage";
import Crochet from "./components/CrochetPage";
import VFXPage from "./components/VFXPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/art'>
            <Art />
          </Route>
          <Route exact path='/artformpage'>
            <ArtFormPage />
          </Route>
          <Route exact path='/login'>
            <LoginFormPage />
          </Route>
          <Route exact path='/games'>
            <GamesPage />
          </Route>
          <Route exact path='/crochet'>
            <Crochet />
          </Route>
          <Route exact path='/vfx'>
            <VFXPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
