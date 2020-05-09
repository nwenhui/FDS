import React, { Component } from "react";
import { data } from "../../../Customer/CustomerHistory/components";
import { managerService } from "../../../../services";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

class DeliverySummaryInfo extends Component {
  state = {
    start: this.props.start,
    end: this.props.end,
    location: this.props.location,
    hr1: 0,
    hr2: 0,
    hr3: 0,
    hr4: 0,
    hr5: 0,
    hr6: 0,
    hr7: 0,
    hr8: 0,
    hr9: 0,
    hr10: 0,
    hr11: 0,
    hr12: 0,
  };

  componentDidMount() {
      console.log();
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "10:00",
        "11:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
          this.setState({ hr1: data.count });
        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "11:00",
        "12:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr2: data.count });

        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "12:00",
        "13:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr3: data.count });

        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "13:00",
        "14:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr4: data.count });

        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "14:00",
        "15:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr5: data.count });

        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "15:00",
        "16:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr6: data.count });

        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "16:00",
        "17:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr7: data.count });

        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "17:00",
        "18:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr8: data.count });

        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "18:00",
        "19:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr9: data.count });

        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "19:00",
        "20:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr10: data.count });
        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "20:00",
        "21:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr11: data.count });
        });
      });
    managerService
      .locationsperhr(
        this.state.start,
        this.state.end,
        "21:00",
        "22:00",
        this.state.location
      )
      .then((response) => {
        response.json().then((data) => {
            this.setState({ hr12: data.count });
        });
        });
  }

  render() {
    return (
      <TableRow>
        <TableCell align="center">{this.state.location}</TableCell>
        <TableCell align="center">{this.state.hr1}</TableCell>
        <TableCell align="center">{this.state.hr2}</TableCell>
        <TableCell align="center">{this.state.hr3}</TableCell>
        <TableCell align="center">{this.state.hr4}</TableCell>
        <TableCell align="center">{this.state.hr5}</TableCell>
        <TableCell align="center">{this.state.hr6}</TableCell>
        <TableCell align="center">{this.state.hr7}</TableCell>
        <TableCell align="center">{this.state.hr8}</TableCell>
        <TableCell align="center">{this.state.hr9}</TableCell>
        <TableCell align="center">{this.state.hr10}</TableCell>
        <TableCell align="center">{this.state.hr11}</TableCell>
        <TableCell align="center">{this.state.hr12}</TableCell>

      </TableRow>
    );
  }
}

export default DeliverySummaryInfo;
