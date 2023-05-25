import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddPostPage from '../../src/components/AddPostPage';
import EditPostPage from './components/EditPostPage';
import ViewPostPage from './components/ViewPostPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/posts/add" component={AddPostPage} />
        <Route exact path="/posts/edit/:id" component={EditPostPage} />
        <Route exact path="/posts/:id" component={ViewPostPage} />
      </Switch>
    </Router>
  );
}

export default App;
