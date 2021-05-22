import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import FeasibilityInput from "components/Feasibility/FeasibilityInput.jsx";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

import Select from "@material-ui/core/Select";
import { Input, MenuItem, Radio } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  selectInput: {
    minWidth: 230,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  labelText: {
    margin: theme.spacing(3),
  },
  labelTextMT: {
    marginTop: theme.spacing(1),
  },
  dateRight: {
    float: "right",
  },
  dateRightText: {
    float: "right",
    marginLeft: "2%",
    fontWeight: "bold",
  }
}));

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;

  const [customerName, setCustomerName] = React.useState("");
  const [coresNo, setCoresNo] = React.useState(1);
  const [coresNoLabel, setCoresNoLabel] = React.useState("Single Core Fiber");
  const [partnerName, setPartnerName] = React.useState("");
  const [selectStatus, setSelectStatus] = React.useState("null");

  const handleCoresChange = (event) => {
    const value = event.target.value;
    setCoresNo(value);

    if (value === 1) {
      setCoresNoLabel("Single Core Fiber");
    } else if (value === 2) {
      setCoresNoLabel("Pair of Fiber");
    } else {
      setCoresNoLabel("");
    }
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handlePartnerNameChange = (event) => {
    setPartnerName(event.target.value);
  };

  const handleSelectStatus = (event) => {
    setSelectStatus(event.target.value);
    console.log(event);
  };

  const coresList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //get the customers and feed in the date to table date
  const customerNameList = ["santhosh", "kumar"];

  const bEnd = [
    ["b-address", "Address"],
    ["b-Latitude", "Latitude"],
    ["b-Longitude", "Longitude"],
    ["b-city-name", "City Name"],
  ];

  const aEnd = [
    ["a-address", "Address"],
    ["a-Latitude", "Latitude"],
    ["a-Longitude", "Longitude"],
    ["a-city-name", "City Name"],
  ];

  //should be from the database
  const partnerNameList = ["partner1", "partner2"];

  let dropDownCustomerName = (
    <React.Fragment>
      <Select
        id="customer-name-select"
        value={customerName}
        className={classes.selectInput}
        onChange={handleCustomerNameChange}
      >
        {customerNameList.map((name) => {
          return (
            <MenuItem value={name} key={name}>
              {name}
            </MenuItem>
          );
        })}
      </Select>
    </React.Fragment>
  );

  let selectPartnerNameList = (
    <Select
      id="partner-name-select"
      onChange={handlePartnerNameChange}
      value={partnerName}
      style={{ minWidth: 210 }}
    >
      {partnerNameList.map((props) => {
        return (
          <MenuItem key={props} value={props}>
            {props}
          </MenuItem>
        );
      })}
    </Select>
  );

  return (
    <React.Fragment>
      <GridContainer className={classes.root}>
        <GridItem xs={12} sm={12} md={12}>
          <span className={classes.labelText}> Customer Name</span>
          {dropDownCustomerName}

          <span className={classes.dateRightText}> 1 Jan 2021</span>
          <span className={classes.dateRight}> Created Date</span>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginTop: 15 }}>
          <span className={classes.labelText}>
            <strong>A End</strong>
            {aEnd.map((date, item) => {
              return (
                <TextField
                  id={date[0]}
                  label={date[1]}
                  className={classes.labelText}
                  key={item}
                />
              );
            })}
          </span>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginTop: 15 }}>
          <span className={classes.labelText}>
            <strong>B End</strong>
            {bEnd.map((date, item) => {
              return (
                <TextField
                  id={date[0]}
                  label={date[1]}
                  className={classes.labelText}
                  key={item}
                />
              );
            })}
          </span>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginTop: 10 }}>
          <span className={classes.labelText}>Number of Fiber Cores</span>
          <Select
            id="cored-no-select"
            onChange={handleCoresChange}
            value={coresNo}
          >
            {coresList.map((cores, key) => {
              return (
                <MenuItem value={cores} key={cores}>
                  {cores}
                </MenuItem>
              );
            })}
          </Select>
          <span className={classes.labelText}>{coresNoLabel}</span>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginTop: 25 }}>
          <span className={classes.labelText}>Road Distance</span>
          <TextField id="road-distance" key="road-distance" value="234" />
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginTop: 25 }}>
          <span className={classes.labelText}>Partner Name</span>
          {selectPartnerNameList}
          <span className={classes.labelText}>
            Feasibility Distance(meters)
          </span>
          <Input type="tel" id="feasibility-distance" required></Input>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} style={{ marginTop: 25 }}>
          <span className={classes.labelText}>Status</span>
          <Radio
            name="feasibility-status"
            checked={selectStatus === "Open"}
            onChange={handleSelectStatus}
            value="Open"
          />
          Open
          <Radio
            name="feasibility-status"
            checked={selectStatus === "Feasible"}
            onChange={handleSelectStatus}
            value="Feasible"
          />
          Feasible
          <Radio
            name="feasibility-status"
            checked={selectStatus === "TNF"}
            onChange={handleSelectStatus}
            value="TNF"
          />
          TNF
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{
            marginTop: 15,
            marginLeft: 20,
          }}
        >
          <Button color="success">Update</Button>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
}
