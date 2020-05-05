import React, { Component, useState } from "react";
import PropTypes from "prop-types";
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
import MaterialTable, { Column } from "material-table";

function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Food Item", field: "food item" },
      { title: "Duration", field: "duration" },
      { title: "Discount", field: "Discount" },
      { title: "Free Delivery", field: "Yes/No", type: "boolean" },
      { title: "Condition", field: "Conditions" },
    ],
    data: [
      { name: "", surname: "", birthYear: "", birthCity: "" },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });
  return (
    <Paper>
      <MaterialTable
        title="Editable Example"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </Paper>
  );
}

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

class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <MaterialTableDemo></MaterialTableDemo>
        <Grid container spacing={6}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Home"} />
          </Grid>
          <Grid container item spacing={4} id="page-wrap">
            <Grid item lg={6} sm={6} xl={6} xs={12}></Grid>

            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Button
                color="primary"
                size="small"
                variant="contained"
                onClick={() => this.setState({ count: this.state.count + 1 })}
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
MaterialTableDemo.propTypes = {
  className: PropTypes.string,
};

//export default MaterialTableDemo;
export default Promotions;
