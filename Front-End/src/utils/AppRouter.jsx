import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import Login from "../components/form/Login";
import AddPost from "../components/pages/blog/AddPost";
import Blog from "../components/pages/blog/Blog";
import PrivateRoute from "./PrivateRoute";
import Logout from "../components/pages/Logout";
import NewUser from "../components/form/NewUser";
import UserProfile from "../components/form/UserProfile";
import Blog1 from "../components/pages/blog/Blog1";
import UserProfilePage from "../components/pages/UserProfilePageSetup";
import Photos from "../components/form/Photos";


const AppRouter = props => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} props={props} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/post" component={AddPost} props={props} />
        {/* <Route path="/comment" component={AddComment} props={props} /> */}
        <PrivateRoute exact path="/blog/:postid" component={Blog1}/>
        <PrivateRoute path="/blog" component={Blog} props={props} />
        <Route path="/createaccount" component={NewUser} />
        <Route path='/profile' component={UserProfilePage}/>
        <Route path='/photos' component={Photos}/>
      </Switch>
    </>
  );
};

export default AppRouter;
