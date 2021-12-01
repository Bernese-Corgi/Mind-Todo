import React from 'react';
import AddMindmapDialogContainer from 'container/mindmaps/AddMindmapDialogContainer';
import {
  AddPostPage,
  AuthPage,
  HomePage,
  MindmapListPage,
  NodePage,
  UpdatePostPage,
} from 'pages';
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
        <Route component={NodePage} path="/mindmap/:mindmapId/:nodeId" exact />

        <Route
          component={AddPostPage}
          path="/mindmap/:mindmapId/:nodeId/write-post"
          exact
        />
        <Route component={UpdatePostPage} path="/post/:postId/edit" />
      </Switch>
    </div>
  );
}

export default App;
