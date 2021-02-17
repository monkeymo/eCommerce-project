import React from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { signOutUserStart } from './../../redux/User/user.actions'
import './styles.scss';
import { Link } from 'react-router-dom';
//import { auth } from './../../firebase/utils';

import Logo from './../../assets/logo.png';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const Header = props => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(mapState);

  const signOut = () =>{
    
    dispatch(signOutUserStart());
  }

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="SimpleTut LOGO" />
          </Link>
        </div>

        <div className="callToActions">

          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">
                  My Account
                </Link>
              </li>
              <li>
              {/*   <span onClick={() => auth.signOut()}> */}
                <span onClick={() => signOut()}>
                  LogOut
                </span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              
              <li>
                <Link to="/registration">
                  Register
              </Link>
              </li>
              <li>
                <Link to="/login">
                  Login
              </Link>
              </li>
            </ul>
          )}

        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null
};

export default Header


// the older code in clips 8, use redux 'connect'
/* 
import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';

import Logo from './../../assets/logo.png';

const Header = props => {
  const { currentUser } = props;

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="SimpleTut LOGO" />
          </Link>
        </div>

        <div className="callToActions">

          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">
                  My Account
                </Link>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>
                  LogOut
                </span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              
              <li>
                <Link to="/registration">
                  Register
              </Link>
              </li>
              <li>
                <Link to="/login">
                  Login
              </Link>
              </li>
            </ul>
          )}

        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header);
 */

