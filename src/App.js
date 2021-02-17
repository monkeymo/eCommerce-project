/*Now refactor to remove all {connect} to use { useDispactch}
*/
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser,  checkUserSession} from './redux/User/user.actions';
//hoc
import WithAuth from './hoc/withAuth' 

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import './default.scss';

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    
  })

  /* useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          }));
        });
      }

      dispatch(setCurrentUser(userAuth)); 
    });
    return () => {
      authListener(); //unsubscribing the listener to avoid the memory leak
    };
  }, []); */

  return (
    <div className='App'>
      <Switch>
        <Route  exact  path='/' 
        render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path='/registration'
          /* render={() => currentUser ? (<Redirect to='/' />) : ( */
          render={() =>  (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path='/login'
          render={() =>  (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path='/recovery'
          render={() => (
          <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path='/dashboard' 
           render={() => (
             <WithAuth>
             <MainLayout>
               <Dashboard />
            </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;

/*
//this the version in githup on  
//Latest commit 391f24f on May 14, 2020
//-- it's working in clip8 29:22

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import './default.scss';

class App extends Component {
  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;  //distruct it as local ref setCurrentUser becase two places use it
                                            // or we can use this.props.setCurrentUser directly

    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        //before we didn't use redux store, 
        //the currentUser is local state,
        //so we need update local currentUser.

        // userRef.onSnapshot(snapshot => {
        //   this.setState({
        //     currentUser: {
        //     id: snapshot.id,
        //     ...snapshot.data()
        //     }
        //   })

        //By using redux, the currentUser is from store, we need get currentUser form store every time
        //and need to update the currentUser in store (by dispatch) if currentUser is changed.
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      }

      setCurrentUser(userAuth);    // changed here too
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
          />
          <Route path="/registration" render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
          <Route path="/login"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout>
                <Login />
              </MainLayout>
            )} />
          <Route path="/recovery" render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
*/

///////////////////////////////////////////////////////////////////////////////////
//before clip 7 we were using this
/* import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
//layout
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

import './default.scss';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery'

const initialState = {
  currentUser: null,
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  // for a event listner
  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
     
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
            id: snapshot.id,
            ...snapshot.data()
            }
          })

        })
      }

      this.setState({
        ...initialState
      })  

    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser} = this.state;

    return (
      <div className='App'>
        
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            )}
          />

          <Route
            path='/registration'
            render={() => currentUser? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )}
          />

          <Route
            path='/login'
            render={() => currentUser? <Redirect to="/"/> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )}
          />

          <Route
            path='/recovery'
            render={() => (
              <MainLayout >
                <Recovery />
              </MainLayout>
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
 */
