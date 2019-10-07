import React from "react";

import "./App.scss";
import Header from "./components/nav/Header";
import AppRouter from "./utils/AppRouter";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
  }
  componentWillMount(){
    if(localStorage.getItem('token') != null && localStorage.getItem('uuid') != null){
      this.setState({loggedIn:true});
    }
  }
  render() {
    return(
      <div className="App" style={{ height: "100%" }}>
      <Header props={this.state.loggedIn} />

      <AppRouter />
    </div>
    )
  }
}
// function App(props) {
//   return (
//     <div className="App" style={{ height: "100%" }}>
//       <Header props={props} />

//       <AppRouter props={props} />
//     </div>
//   );
// }
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
export default App;
