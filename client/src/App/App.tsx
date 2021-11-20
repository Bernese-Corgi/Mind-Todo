import React from 'react';
import AddMindmapDialogContainer from 'container/mindmaps/AddMindmapDialogContainer';
import { AuthPage, HomePage, MindmapListPage, NodePage } from 'pages';
import { Route, Switch } from 'react-router';
import './App.css';
import MindmapPage from 'pages/MindmapPage';
import { HeaderbarContainer } from 'container/common';

function App() {
  return (
    <div className="App">
      <Route component={HeaderbarContainer} path="/" />
      <Switch>
        <Route component={HomePage} exact path="/" />

        <Route component={AuthPage} path="/auth" />

        <Route exact component={MindmapListPage} path="/mindmaps" />
        <Route
          component={AddMindmapDialogContainer}
          path="/mindmaps/create-mindmap"
        />

        <Route component={MindmapPage} path="/mindmap/:mindmapId" exact />
        <Route component={NodePage} path="/mindmap/:mindmapId/:nodeId" />
      </Switch>
    </div>
  );
}

export default App;
