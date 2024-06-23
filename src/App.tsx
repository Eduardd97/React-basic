import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Counter } from './components/Counter';
import { LoginForm } from './components/LoginForm';

const App = () => {
  return (
    <div className = "red">
      <h1>My first React project</h1>

      <Counter/>
      <LoginForm/>
    </div>
  );
}

export default App;
