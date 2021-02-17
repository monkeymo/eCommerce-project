import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/createStore';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>    {/* pass store to Provider, make redux store to be accessable by all  */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, Switch} from 'react-router-dom'
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//     <Switch>
//       <App />
//     </Switch>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );


