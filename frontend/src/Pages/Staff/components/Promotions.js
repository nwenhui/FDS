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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  TableContainer,
  Paper,
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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
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
              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={addRow}
              >
                Add Promotion
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Food Item</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Discount</TableCell>
                      <TableCell>Free Delivery</TableCell>
                      <TableCell>Condition</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const addRow = () => {
  //   props.onClick();
};

export default Promotions;
