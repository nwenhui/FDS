import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./style.css";
import foodpic from "../../../src/images/lily-banse--YHSwy6uqvk-unsplash.jpg";
import NavBar from '../../components/Navigation/Navigation';


class HomePage extends Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history}/>
        <div class="image">
          <img
            src={foodpic}
            style={{
              width: null,
              height: null,
              resizeMode: "Cover", 
              fit: "Cover",
            }}
            class="img-fluid"
            alt=""
          />
          <h1 class="welcome">Welcome to DeliverMeow!</h1>
          <Link to="/login">
            <button class="loginBTN">Log in</button>
          </Link>
          <Link to="/signup">
            <button class="signupBTN">Sign up</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;

// const Home = props => {
//   return (
//     <div>
//       <a>HOME</a>
//       <div class="image">
//         <img
//           src={foodpic}
//           style={{
//             width: null,
//             height: null,
//             resizeMode: "Cover",
//             fit: "Cover"
//           }}
//           class="img-fluid"
//           alt=""
//         />
//         <button class="btn">Order</button>
//       </div>
//     </div>
//   );
// };

// export default Home;
