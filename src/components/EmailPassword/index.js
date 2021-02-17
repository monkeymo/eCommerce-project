import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
//import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { resetPasswordStart , resetUserState} from './../../redux/User/user.actions'
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

import { auth } from './../../firebase/utils';
import { setegid } from 'process';
import userReducer from '../../redux/User/user.reducer';

const mapState = ({ user}) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
})

const EmailPassword = (props) => {
  const history = useHistory()
  const { resetPasswordSuccess, userErr} = useSelector(mapState)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(()=>{
    if(resetPasswordSuccess) {
      dispatch(resetUserState)
      history.push('/login')
    }
  },[resetPasswordSuccess])

  useEffect(()=>{
    if(Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr)
    }
  },[userErr])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email}));
  }

    const configAuthWrapper = {
      headline: 'Email Password'
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">

          {errors.length > 0 && (
            <ul>
              {errors.map((e, index) => {
                return (
                  <li key={index} className="errColor">
                    {e}
                  </li>
                );
              })}
            </ul>
          )}

          <form onSubmit={handleSubmit}>

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange = {e=> setEmail(e.target.value)}
            />

            <Button type="submit">
              Email Password
            </Button>

          </form>

        </div>
      </AuthWrapper>
    );
}

export default EmailPassword; 
 

//class based version
/* import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

import { auth } from './../../firebase/utils';

const initialState = {
  email: '',
  errors: []
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;

      const config = {
        url: 'http://localhost:3003/login'   //the url you go back to after you changed password 
      };

      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push('/login');
        })
        .catch(() => {
          const err = ['Email not found. Please try again.'];
          this.setState({
            errors: err
          });
        });

    } catch(err) {
      // console.log(err);
    }

  }

  render() {
    const { email, errors } = this.state;

    const configAuthWrapper = {
      headline: 'Email Password'
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">

          {errors.length > 0 && (
            <ul>
              {errors.map((e, index) => {
                return (
                  <li key={index} className="errColor">
                    {e}
                  </li>
                );
              })}
            </ul>
          )}

          <form onSubmit={this.handleSubmit}>

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />

            <Button type="submit">
              Email Password
            </Button>

          </form>

        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword); 
 */



/* import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
});

const EmailPassword = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push('/login');
    }

  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  }

  const configAuthWrapper = {
    headline: 'Email Password'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (
                <li key={index}>
                  {e}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <Button type="submit">
            Email Password
          </Button>

        </form>

        <div className="links">
          <Link to="/login">
            LogIn
          </Link>
          {` | `}
          <Link to="/registration">
            Register
          </Link>
        </div>

      </div>
    </AuthWrapper>
  );


export default EmailPassword;
}*/
