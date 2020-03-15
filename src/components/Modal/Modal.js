import React, { useState } from 'react';
import styles from './Modal.module.css';
import SignIn from './SignIn/SignIn';
import Lobbies from './Lobbies/Lobbies';
import axios from 'axios';

function Modal(props) {
  const [lobbies, setLobbies] = useState({ show: false, data: null });

  const login = async username => {
    props.setLoading(true);
    try {
      const response = await axios.post(
        'https://tortugack.herokuapp.com/api/v1/token',
        {
          username: username,
        }
      );
      props.toggleAlert('Welcome nigga welcome 😊', 'Success');
      loadLobby();
    } catch (error) {
      console.error(error);
      props.toggleAlert('Wrong nigga Wrong something went Wrong 😞', 'Warn');
    }
    props.setLoading(false);
  };

  const loadLobby = async () => {
    props.setLoading(true);
    try {
      const response = await axios.get(
        'https://tortugack.herokuapp.com/api/v1/lobby'
      );
      setLobbies({ show: true, data: response.data });
    } catch (error) {
      console.error(error);
      props.toggleAlert('Wrong nigga Wrong something went Wrong 😞', 'Warn');
      return;
    }
    props.setLoading(false); // TODO: get out of loading!
  };

  const output = lobbies.show ? (
    <Lobbies lobbiesData={lobbies.data} />
  ) : (
    <SignIn login={login} toggleAlert={props.toggleAlert} />
  );
  
  return <div className={styles.Modal}>{output}</div>;
}

export default Modal;