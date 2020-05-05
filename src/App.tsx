import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouteComponentProps, Link } from '@reach/router';

function App(props: RouteComponentProps & { children?: React.ReactNode }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          douglasgoodman.net
        </p>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="user/doug">Doug</Link>
        { props.children }
      </header>
    </div>
  );
}

export default App;
