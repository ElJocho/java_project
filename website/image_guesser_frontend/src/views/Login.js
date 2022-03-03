import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/login.css';
import AriaModal from 'react-aria-modal'

async function loginUser(credentials) {
 return fetch('http://localhost:8090/create_player', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken, modalActive , disableModal}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
    {
      username: username,
      password: password
    });
    setToken(token);
  }

  return(
    <div>
      {modalActive
        ?    <AriaModal
                onExit={disableModal}
                underlayStyle={{ paddingTop: '2em' }}
                titleText="Login"
                >
                <div id="demo-one-modal" className="modal">
                    <div className="modal-body">
                    <h1 className="modal-heading">Please Log In</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                            <p>Username</p>
                            <input type="text" onChange={e => setUserName(e.target.value)} />
                            </label>
                            <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} />
                            </label>
                            <div>
                            <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
              </AriaModal>
        : false}
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
