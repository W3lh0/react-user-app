import React from 'react';

import Card from '../UI/Card';
import classes from './UsersList.module.css';

const UsersList = (props) => {
  console.log(props.users);
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old) Password: {user.password}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
