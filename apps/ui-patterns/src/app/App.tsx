import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UIPatterns from './UIPatterns';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={UIPatterns} />
      </Switch>
    </Router>
  );
};

export default App;
