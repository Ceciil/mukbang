import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import { DataContainer, useDB } from './data';

// const Dummy = () => {
//   const { db, user } = useDB();

//   return (
//     <text
//       onClick={() =>
//         db.auth.createUserWithEmailAndPassword('timmy2@tim.com', 'fooooooobar')
//       }
//     >
//       {JSON.stringify(user, null, 2)}
//     </text>
//   );
// };

ReactDOM.render(
  <React.StrictMode>
    <DataContainer>
      {/* <Dummy /> */}
      <App />
    </DataContainer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
