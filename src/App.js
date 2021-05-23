import React from 'react';
import './styles/App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomeScreen from './screens/Home-Screen/Home-Screen';
import GistDetails from './screens/Gist-Details/Gist-Details';

function App() {

  return (
    <Router>
      <div className="app">
        <div className="app__body">
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route>
              <GistDetails path="/gistDetails" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
