import React, { Component } from 'react';


class Logout extends Component {
    componentDidMount(){
        localStorage.removeItem('token'); //removes jwt from local storage (logout)

        window.location = '/'; //redirect to homepage w/ full reload 
    }
    render() { 
        return null;
    }
}
 
export default Logout;


