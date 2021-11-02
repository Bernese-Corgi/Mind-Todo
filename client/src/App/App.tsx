import { HomePage } from 'pages';
import { Route } from 'react-router';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route component={HomePage} path="/" />
    </div>
  );
}

export default App;
