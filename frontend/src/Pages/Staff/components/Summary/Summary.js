import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import NavBar from "../../../../components/Navigation/Navigation";
import { Sidebar } from "../../../../layouts/Staff/components";
import {
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import moment from "moment";
import ErrorAlert from "../../../../components/Alerts/ErrorAlert/ErrorAlert"


import { NumOfOrders, TopFive, TotalProfit } from "./components";
import { staffService, authenticationService } from "../../../../services"

function format(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  console.log([year, month, day].join('-'))

  return [year, month, day].join('-');
};

const now = new Date();
const tomorrow = new Date(now)
tomorrow.setDate(tomorrow.getDate() + 1)
var dd = String(tomorrow.getDate()).padStart(2, '0');
var mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
var yyyy = tomorrow.getFullYear();

const today = yyyy + '-' + mm + '-' + dd;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  formControl: {
    minWidth: 120,
  },
}));

const SummaryDashboard = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(today);
  const [showData, setShowData] = useState(false);
  const [start, setStart] = useState(today)
  const [end, setEnd] = useState(today)

  const handleDateChange = (e) => {
    setSelectedDate(e);
  };

  const handleStartDate = (e) => {
    setStart(e.target.value)
    console.log(start)
  }

  const handleEndDate = (e) => {
    setEnd(e.target.value)
    console.log(end);
  }

  const id = authenticationService.currentUserValue.restaurantid;
  const [top, setTop] = useState([])
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)

  const handleSubmit = (e) => {
    console.log('end: ', end)
    staffService.topitems(id,start,end).then((response) => {
      console.log('hellp')
      response.json.then((data) => {
        setTop( staffService.topitemsresults(data) )
      })
    })
    // staffService.totalcost(id,start,end).then((response) => {
    //   response.json.then((data) => {
    //     setTotal( data.sum )
    //   })
    // })
    // staffService.totalcount(id,start,end).then((response) => {
    //   response.json.then((data) => {
    //     setCount( data.count )
    //   })
    // })
    // console.log(moment(selectedDate).month());

    /**** Upload the selected month to the backend ****

    const month = moment(selectedDate).month();
    const url = 'api/v1/...' + month;
    let summary;

    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      summary = JSON.parse(result);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

    ****/

    setShowData(true);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center" item spacing={3}>
        {/* <Grid item xs={6} sm={3}> */}

        <form onSubmit={handleSubmit}>
                <div class="form-row">
                    <div class="col" align="center">
                        <label>Start Date</label>
                        <input type="date" class="form-control" defaultValue={start} onChange={handleStartDate} />
                    </div>
                    <div class="col" align="center">
                        <label>End Date</label>
                        <input type="date" class="form-control" defaultValue={end} onChange={handleEndDate} />
                    </div>
                    <div class="col" align="left">
                    <Button type="button" class="btn btn-dark" type="submit">
                            Get Summary
                        </Button>
                    </div>
                </div>
                {/* {this.state.error && ErrorAlert(this.state.errorMessage)} */}
            </form>
          
          {/* <text style={{ marginRight: "8px" }}>Start Date:</text>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={start} onChange={handleStartDate} />
          </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6} sm={3}>
          <text style={{ marginRight: "8px" }}>End Date:</text>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={end} onChange={handleEndDate} />
          </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6} sm={3}>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={handleEnterButton}
          >
            Enter
          </Button>
        </Grid> */}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TopFive
            results={top}
              data={[
                "Prata",
                "Oyako Don",
                "Thai Milk Tea",
                "Gong Cha",
                "Chicken Rice",
              ]}
            />
            {/* <TopFive data={summary.topFive} /> */}
          </Grid>
        )}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <NumOfOrders data={20} results={count}/>
            {/* <NumOrders data={summary.numOrders} /> */}
          </Grid>
        )}
        {showData && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalProfit data={20} results={total} />
            {/* <TotalProfit data={summary.totalProfit} /> */}
          </Grid>
        )}
        </Grid>
    </div>
  );
};

class Summary extends Component {
  state = {
    id: authenticationService.currentUserValue.restaurantid,
    start: today,
    end: today,
    topitems: [],
    error: false,
    errorMessage: "",
    total: 0,
    count: 0,
    showtop:false,
    showtotal: false,
    showcount:false
  }
  setStartDate = (event) => {
    this.setState({ start: event.target.value }, () => {console.log('start: ', this.state.start)})
}

setEndDate = (event) => {
    this.setState({ end: event.target.value }, () => {console.log('start: ', this.state.end)})
}
handleSubmit(event) {
  event.preventDefault();
  console.log('clickyyyy')
  staffService.topitems(this.state.id,this.state.start,this.state.end).then((response) => {
    console.log('hellp')
    response.json().then((data) => {
      this.setState({ error: false, topitems: staffService.topitemsresults(data) }, () => {
      console.log(this.state.topitems)
      this.setState({ showtop: true })
      })
    })
    .catch((error) => {
      error.text().then((errorMessage) => {
        this.setState({ showtop: false })
        this.setState({ error: true, errorMessage }, () => {})
      })
    })
  })

  
  staffService.totalcost(this.state.id,this.state.start,this.state.end).then((response) => {
    console.log('hellp')
    response.json().then((data) => {
      this.setState({ total: data.sum, showtotal: true }, () => {
      console.log(this.state.total)
      })
    })
  })
    .catch((error) => {
      this.setState({ showtop: false })
      error.text().then((errorMessage) => {
        this.setState({ error: true, errorMessage })
      })
    })
  
  staffService.totalcount(this.state.id,this.state.start,this.state.end).then((response) => {
    console.log('hellp')
    response.json().then((data) => {
      this.setState({ count: data.count, showcount: true }, () => {
      console.log(this.state.count)
      })
    })
  })
    .catch((error) => {
      this.setState({ showtop: false })
      error.text().then((errorMessage) => {
        this.setState({ error: true, errorMessage })
      })
    })
  }

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
              {/* <SummaryDashboard></SummaryDashboard> */}
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div class="form-row">
                    <div class="col" align="center">
                        <label>Start Date</label>
                        <input type="date" class="form-control" defaultValue={this.state.start} onChange={this.setStartDate.bind(this)} />
                    </div>
                    <div class="col" align="center">
                        <label>End Date</label>
                        <input type="date" class="form-control" defaultValue={this.state.end} onChange={this.setEndDate.bind(this)} />
                    </div>
                    <div class="col" align="left">
                    <Button type="button" class="btn btn-dark" type="submit">
                            Get Summary
                        </Button>
                    </div>
                </div>
                
            </form>
            </Grid>
            {this.state.showtop && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TopFive
            results={this.state.topitems}
              data={[
                "Prata",
                "Oyako Don",
                "Thai Milk Tea",
                "Gong Cha",
                "Chicken Rice",
              ]}
            />
            {/* <TopFive data={summary.topFive} /> */}
          </Grid>
        )}
        {this.state.showcount && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <NumOfOrders data={20} results={this.state.count}/>
            {/* <NumOrders data={summary.numOrders} /> */}
          </Grid>
        )}
        {this.state.showtotal && (
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalProfit data={20} results={this.state.total} />
            {/* <TotalProfit data={summary.totalProfit} /> */}
          </Grid>
        )}
          </Grid>
        </Grid>
        {this.state.error && ErrorAlert(this.state.errorMessage)}
      </div>
    );
  }
}

export default Summary;
