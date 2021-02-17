import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart} from './../../redux/User/user.actions';

import './styles.scss';
//import { signInWithGoogle } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const SignIn = (props) => {
  const history = useHistory()
  const {currentUser} =useSelector (mapState)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      resetForm();
      //dispatch(resetAllAuthForms())
      history.push('/')    
    }
  },[currentUser])

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  //use redux hook dispatch, not async
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart ({email, password}));
  
  }

  //refactor googleSignIn and let it come to home page if success
  const handleGoogleSignIn = () =>{
    dispatch(googleSignInStart());
  }

    const configAuthWrapper = {
      headline: 'LogIn',
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className='formWrap'>
          <form onSubmit={handleSubmit}>
            <FormInput
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              handleChange={e => setEmail(e.target.value)}
            />

            <FormInput
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              handleChange={e => setPassword(e.target.value)}
            />

            <Button type='submit'>LogIn</Button>

            <div className='socialSignin'>
              <div className='row'>
                <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
              </div>
            </div>

            <div className='links'>
              <Link to ='/recovery'>
                Reset Password
              </Link>
            </div>

          </form>
        </div>
      </AuthWrapper>
    );
  
}

export default SignIn;

/*
const SignIn = props =>
{
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push('/');
    }

  }, [currentUser]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  const configAuthWrapper = {
    headline: 'LogIn'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>

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

          <Button type="submit">
            LogIn
          </Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button>
            </div>
          </div>

          <div className="links">
            <Link to="/registration">
              Register
            </Link>
            {` | `}
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>

        </form>
      </div>
    </AuthWrapper>
  );
} */

//export default SignIn;


//class form after #7 clip8
/*
import React, { useState, useEffect, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  emailSignInStart,
  googleSignInStart,
} from './../../redux/User/user.actions';

import './styles.scss';
import { signInWithGoogle, auth } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const initialState = {
  email: '',
  password: '',
};

//const SignIn = (props) => {
class SignIn extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
      headline: 'LogIn',
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className='formWrap'>
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              handleChange={this.handleChange}
            />

            <FormInput
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              handleChange={this.handleChange}
            />

            <Button type='submit'>LogIn</Button>

            <div className='socialSignin'>
              <div className='row'>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>

            <div className='links'>
              <Link to ='/recovery'>
                Reset Password
              </Link>
            </div>

          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default SignIn;

*/
