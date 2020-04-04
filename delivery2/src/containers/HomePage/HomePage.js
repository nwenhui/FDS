import React, { Component } from "react";
import "./style.css";
import foodpic from "/Users/ngjingkang/Desktop/website/delivery2/src/containers/images/lily-banse--YHSwy6uqvk-unsplash.jpg";

class HomePage extends Component {
  render() {
    return (
      <div>
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
          <button class="btn">Order</button>
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
