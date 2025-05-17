import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const passwordInputRef = useRef();

  const [error, setError] = useState();

  const generateRandomPassword = () => {
    let generatedPassword = '';
      const passwordCharactes = "aBCdEfGhIjKlMnOpQr123456789";
      const max = passwordCharactes.length;

      for (let i = 0; i < 12; i++) {
        let randomInt = Math.floor(Math.random() * max);
        generatedPassword += passwordCharactes.charAt(randomInt);
      }
      passwordInputRef.current.value = generatedPassword;
  };

  const handleGeneratePassword = () => {
    generateRandomPassword();
    setError(null);
  }
  
  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name, age and password (non-empty values).',
        type: 'nameOrAge'
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
        type: 'age'
      });
      return;
    }
    if (enteredPassword.trim().length < 12) {
      setError({
        title: 'Invalid Password',
        message: 'Please enter a valid password (atleast twelve characters long)',
        type: 'passwordInvalid'
      });
      
      return;
    }

    props.onAddUser(enteredUsername, enteredAge, enteredPassword);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    passwordInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
          onGeneratePassword={handleGeneratePassword}
          errorType={error.type}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
        //    value={enteredUsername}
        //    onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
        //    value={enteredAge}
        //    onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            ref={passwordInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
