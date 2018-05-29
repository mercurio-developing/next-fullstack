import React from "react";
import { connect } from "react-redux";
import axios from "axios";

class Login extends React.Component {
  getInitialProps = async ({ req, query }) => {
    console.log(req.headers);
    const res = await axios.post("http://localhost:3000/login");
    return { data: res.data };
  };

  render() {
    console.log(this.props.data);
    return (
      <div>
        <h1>LOGIN</h1>
      </div>
    );
  }
}

export default Login;
