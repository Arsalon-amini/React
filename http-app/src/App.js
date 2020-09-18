import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    //const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const { data: posts } = await axios.get(apiEndpoint); //returns a promise, descructure response, get {data: posts} member only
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj); //destructure response, pick data prop
    console.log(post);

    const posts = [post,...this.state.posts];
    this.setState({posts}); 
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED"; 
    //const { data } = await axios.patch(apiEndpoint + '/' + post.id, {title: post.title }); //sending only properties to be updated 
    const { data } = await axios.put(apiEndpoint + '/' + post.id, post); //send entire post obj to be updated
    console.log(data); 

    const posts = [...this.state.posts]; //clone posts array (state)
    const index = posts.indexOf(post); 
    posts[index] = {...post}; //clone new post 
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const result = await axios.delete(apiEndpoint + '/' + post.id); //url that identifies resource (removed on server)

    console.log(result);
    const posts = this.state.posts.filter(p => p.id !== post.id); //delete from state (array)
    this.setState({posts}); 
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
