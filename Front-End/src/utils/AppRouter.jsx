import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from '../components/pages/Home';
import About from '../components/pages/About';
import Contact from '../components/pages/Contact';
import Login from '../components/pages/Login';
import AddPost from '../components/pages/AddPost';
import Blog from '../components/pages/Blog';
import PrivateRoute from './PrivateRoute';
import Logout from '../components/pages/Logout';

const AppRouter = (props) => {
    return(
        <>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/login" component={Login} props={props} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute path="/post" component={AddPost} props={props} />
            {/* <Route path="/comment" component={AddComment} props={props} /> */}
            <PrivateRoute path="/blog" component={Blog} props={props} />



        </Switch>
        </>
    )
}

export default AppRouter;