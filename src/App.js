import React from 'react';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import Footer from './components/fragments/Footer';

import MainContent from './components/other/MainContent';

import InstructorList from './components/instructor/InstructorList';
import InstructorDetails from './components/instructor/InstructorDetails';
import InstructorForm from './components/instructor/InstructorForm';
import InstructorDelete from './components/instructor/InstructorDelete';

import CourseList from './components/course/CourseList';
import CourseDetails from './components/course/CourseDetails';
import CourseForm from './components/course/CourseForm';

import ClientList from './components/client/ClientList';
import ClientDetails from './components/client/ClientDetails';
import ClientForm from './components/client/ClientForm';

import { getCurrentUser } from './helpers/authHelper'
import ProtectedRoute from './components/other/ProtectedRoute';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import LoginForm from './components/other/LoginForm';

 class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            user: undefined,
            prevPath: ''
        }
    }

    handleLogin = (user) => {
        localStorage.setItem("user", user)
        this.setState({ user: user })
    }

    handleLogout = () => {
        localStorage.removeItem("user")
        this.setState({ user: undefined })
    }

    componentDidMount(){
        const currentUser = getCurrentUser()
        this.setState({ user: currentUser })
    }

    render(){
        return (
            <Router>
                <div>
                <Header />
                <Navigation handleLogout={this.handleLogout} />
                <Switch>
                    <Route exact path="/" component={MainContent} />
                    
                    <Route exact path="/instructor" component={InstructorList} />
                    <ProtectedRoute exact={true}  path="/instructor/delete/:instructorId" component={InstructorDelete} />
                    <ProtectedRoute exact={true}  path="/instructor/details/:instructorId" component={InstructorDetails} />
                    <ProtectedRoute exact={true}  path="/instructor/edit/:instructorId" component={InstructorForm} />
                    <Route exact path="/instructor/add" component={InstructorForm} />
    
                    <ProtectedRoute exact={true} path="/course" component={CourseList} />
                    <ProtectedRoute exact={true} path="/course/details/:courseId" component={CourseDetails} />
                    <ProtectedRoute exact={true} path="/course/edit/:courseId" component={CourseForm} />
                    <ProtectedRoute exact={true} path="/course/add" component={CourseForm} />
    
                    <Route exact path="/client" component={ClientList} />
                    <ProtectedRoute exact={true}  path="/client/details/:clientId" component={ClientDetails} />
                    <ProtectedRoute exact={true}  path="/client/edit/:clientId" component={ClientForm} />
                    <Route exact path="/client/add" component={ClientForm} />

                    <Route exact 
                        path="/login" 
                        render={(props) => (
                            <LoginForm handleLogin={this.handleLogin} />
                        )} 
                    />
                </Switch>
                <Footer />
                </div>
            </Router>
        );
    }
}

export default App;