import React, { Component } from "react";
import { ToastContainer } from "react-toastify"; //toastify
import { toast } from "react-toastify";
import http from "./services/httpService"; //hide axios behind http module (re-usable)
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css"; //toasty .css
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint); //returns a promise, desctructure response, {data: posts} member only
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj); //destructure response, pick data prop
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    //const { data } = await http.patch(config.apiEndpoint + '/' + post.id, {title: post.title }); //sending only properties to be updated
    const { data } = await http.put(config.apiEndpoint + "/" + post.id, post); //send entire post obj to be updated
    console.log(data);

    const posts = [...this.state.posts]; //clone posts array (state)
    const index = posts.indexOf(post);
    posts[index] = { ...post }; //clone new post
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    //update DOM (optimistic update)
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    //call server
    try {
      await http.delete(config.apiEndpoint + "/" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This post has already been deleted");

      this.setState({ posts: originalPosts }); //revert back to previous state
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
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
