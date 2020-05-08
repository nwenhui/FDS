import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { authenticationService, customerService, orderService } from "../../../../services"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
}));

const RecentLocations = (props) => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [id, setId] = useState();
  const [addresses, setAddresses] = useState([]);
  const [value, setValue] = useState(null)

  useEffect(() => {
    // setValues(props);
    authenticationService.currentUser.subscribe((x) => {
      console.log('omo',x);
      if (x !== null) {
        setId(
            x.id
        )
        console.log('omomom', id);
        customerService.getRecentAddress(id).then((response) => {
          response.json().then((data) => {
            console.log('omo?',data);
            setAddresses(
              customerService.addressResults(data)
            )
          })
        })
          // this.setState({ id: x.id, email: x.email, firstname: x.first_name, lastname: x.last_name, points: x.points, password: x.password, creditcard: x.ccid }, () => {console.log('weewoo', this.state.password)})
      }
  });
  }, [props]);

  const handleChange = (event) => {
    orderService.setLocation(addresses[event.target.value]);
    setValue(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Choose Recent Locations
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={value}
          onChange={handleChange}
          color="secondary"
        >
          <MenuItem value="">
            <em>Use New Location</em>
          </MenuItem>
          {addresses.map((address, index) => (
          <MenuItem value={index}>{address}</MenuItem>
          ))}
          {/* <MenuItem value={10}>SengKang</MenuItem>
          <MenuItem value={20}>CCK</MenuItem>
          <MenuItem value={30}>BP</MenuItem>
          <MenuItem value={40}>KR</MenuItem>
          <MenuItem value={50}>Buona Vista</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
};
export default RecentLocations;
