import React from 'react';
import {
  AddPostPage,
  AuthPage,
  HomePage,
  MindmapListPage,
  MindmapPage,
  NodePage,
  PostListPage,
  PostPage,
  TodoListPage,
} from 'pages';
import { HeaderbarContainer } from 'container/common';
import { AddMindmapDialogContainer } from 'container/mindmaps';
import { Route, Switch } from 'react-router';
import './App.css';

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
          component={PostListPage}
          path={['/posts?@:username', '/posts', '/posts?:tag']}
          exact
        />
        <Route
          component={AddPostPage}
          path={[
            '/mindmap/:mindmapId/:nodeId/write-post',
            '/posts/:postId/edit',
          ]}
          exact
        />
        <Route component={PostPage} path="/posts/:postId" exact />

        <Route component={TodoListPage} path="/todos" exact />
      </Switch>
    </div>
  );
}

export default App;
