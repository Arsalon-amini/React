import React, { Component } from "react";
import MoviePage from "./context/MoviePage";
import UserContext from "./context/userContext";
import CartContext from "./context/cartContext";
import Login from "./context/Login";
import Users from "./hooks/Users";
import Counter from "./hooks/Counter";

class App extends Component {
  handleLoggedIn = username => {
    console.log("Getting the user: " + username);
    const user = { name: "Arsi" };
    this.setState({ currentUser: user });
  };

  state = { currentUser: null };

  render() {
    return (
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.handleLoggedIn
          }}
        >
          <div>
            <MoviePage />
            <Login />
          </div>
        </UserContext.Provider>
    );
  }
}

export default App;
