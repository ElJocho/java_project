import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/login.css';
import AriaModal from 'react-aria-modal'

async function loginUser(credentials, isLogin, api_url) {
 return fetch(`http://${api_url}/${isLogin ? 'login_player' : 'create_player'}`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
 .then(data =>data.text())
 .then(data=>{
     if (data.length == 0){
       return null
     }
     else {
       return JSON.parse(data) 
     }
    })
}

export default function Login({ setPlayer, modalActive , disableModal, isLogin, api_url }) {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    const player = await loginUser(
    {
      name: name,
      password: password
    }, isLogin, api_url );
    if (player && player.playerId != undefined){
      setPlayer(player);
      disableModal()
    }
    else {
      alert(isLogin ? "Wrong combination of username and password" : "Username already taken")
    }
  }

  return(
    <div>
      {modalActive
        ?    <AriaModal
                onExit={disableModal}
                underlayStyle={{ paddingTop: '2em', zIndex: 1150 }}
                titleText = {isLogin ? "Login":"SignUp"}
                
                >
                <div id="demo-one-modal" className="modal">
                    <div className="modal-body">
                    <h1 className="modal-heading">Please {isLogin ? "Log In": "Sign Up"}</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                            <p>Username</p>
                            <input type="text" onChange={e => setName(e.target.value)} />
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
  setPlayer: PropTypes.func.isRequired
};
