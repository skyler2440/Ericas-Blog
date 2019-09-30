import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/nav/Header'
import AppRouter from './utils/AppRouter';
import sideDrawer from './components/nav/SideDrawer/SideDrawer';
function App(props) {
  return (
    <div className="App" style={{height: '100%'}}>

<Header />

<AppRouter props = {props} />
    </div>
  );
}
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
export default App;
