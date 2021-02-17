// convert it to function component

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import { signUpUserStart } from './../../redux/User/user.actions'
import './styles.scss';

//import { auth, handleUserProfile } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import { set } from 'object-path';

const mapState = ({user}) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
}) 

const Signup = (props) => {
  const history = useHistory()
  const {currentUser, userErr } =useSelector (mapState)
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect (() => {
    if(currentUser) {
      reset();
      history.push('/')
    }
  },[currentUser])

  useEffect (() => {
    if (Array.isArray(userErr) && userErr.length > 0){
      setErrors(userErr)
    }
  },[userErr])

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUserStart({displayName,email,password,confirmPassword}))

  };

  const configAuthWrapper = {
    headline: 'Registration',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li key={index} className='errColor'>
                  {err}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full name'
            handleChange={(e) => setDisplayName(e.target.value)}
          />

          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            handleChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type='submit'>Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;



//https://github.com/simpletut/React-Redux-Firebase-eCommerce-Website/commit/cd7e223a81ea57dca14a9e859c95ba2f96596df7
// Ashley Bibizadeh committed on Apr 24, 2020
//commit cd7e223a81ea57dca14a9e859c95ba2f96596df7
//the first checkin in class based component
// later on start on May, react hook refactor
// below is the latest version

/* import React, { Component } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;  //destructure

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      const err = ['Password Don\'t match'];
      this.setState({
        errors: err
      });
      return;
    }

    try {

      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await handleUserProfile(user, { displayName });

      this.setState({  
        ...initialState    //why ? after sugn up, you need to login again 
      });


    } catch(err) {
      // console.log(err);
    }

  }

  render() {
    const { displayName, email, password, confirmPassword, errors } = this.state;
    const configAuthWrapper = {
      headline: 'Registration'
    }

    return (
     <AuthWrapper {...configAuthWrapper}>
          <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return (
                  <li key={index}  className="errColor">
                    {err}
                  </li>
                );
              })}
            </ul>
          )}

            <form onSubmit={this.handleFormSubmit}>

              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full name"
                onChange={this.handleChange}
                />

              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
                />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
                />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
                />

              <Button type="submit">
                Register
            </Button>
            </form>
          </div>
    </AuthWrapper>
    );
  }
}
 */

//latest version using react hook
/*
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signUpUserStart } from './../../redux/User/user.actions';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

 const Signup = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }

  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(signUpUserStart({
      displayName,
      email,
      password,
      confirmPassword
    }));
  }

  const configAuthWrapper = {
    headline: 'Registration'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li key={index}>
                  {err}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>

          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={e => setDisplayName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">
            Register
          </Button>
        </form>

        <div className="links">
          <Link to="/login">
            LogIn
          </Link>
          {` | `}
          <Link to="/recovery">
            Reset Password
            </Link>
        </div>
      </div>
    </AuthWrapper>
  );
}
 */
//export default Signup;
