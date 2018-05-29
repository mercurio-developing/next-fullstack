import React from "react";
import withRedux from "next-redux-wrapper";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

import initStore from "../store";

class Index extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Login />
        </div>
      </div>
    );
  }
}

export default withRedux(initStore)(Index);
