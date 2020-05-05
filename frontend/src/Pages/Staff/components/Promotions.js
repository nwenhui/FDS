import React, { Component, useState } from "react";

import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import NavBar from "../../../components/Navigation/Navigation";
import { Sidebar } from "../../../layouts/Staff/components";
import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    // marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

// const AddPromo = (props) => {
//   const { className, ...rest } = props;

//   const classes = useStyles();

//   const [selectedCategory, setSelectedCategory] = useState("restaurant");
//   const [RestaurantReview, setRestaurantReview] = useState("");
//   const [RReview, setRReview] = useState("");
//   const [RRating, setRRating] = useState("");

//   const [DeliveryReview, setDeliveryReview] = useState("");
//   const [DRating, setDRating] = useState("");

//   const handleSelectChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };
//   const handleRestaurantReview = (e) => {
//     setRestaurantReview(e.target.value);
//   };
//   const handleRReview = (e) => {
//     setRReview(e.target.value);
//   };
//   const handleRRating = (e) => {
//     setRRating(e.target.value);
//   };
//   const handleDeliveryReview = (e) => {
//     setDeliveryReview(e.target.value);
//   };

//   const handleDRating = (e) => {
//     setDRating(e.target.value);
//   };

//   // QUERY: INSERT data
//   const handleEnterButton = () => {
//     switch (selectedCategory) {
//       case "restaurant":
//         console.log(RRating);
//         console.log(RReview);

//         break;
//       case "delivery":
//         console.log(DRating);

//         break;
//       default:
//         console.log("error");
//     }
//     props.onClick();
//   };
// };

class Promotions extends Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <Grid container spacing={6}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
          </Grid>
          <Grid container item spacing={4} id="page-wrap">
            <Grid item lg={6} sm={6} xl={6} xs={12}></Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              {/* <AccountDetails
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                email={this.state.email}
                password={this.state.password}
                id={this.state.id}
                resid={this.state.resid}
                history={this.props.history} */}
              {/* <RestaurantDetails
                resid={this.state.resid}
                resname={this.state.resname}
                min={this.state.min}
                history={this.props.history}
              /> */}
              <table></table>
              <Button
                color="primary"
                size="small"
                variant="contained"
                // onClick={handleEnterButton}
              >
                Add Promotion
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Promotions;
