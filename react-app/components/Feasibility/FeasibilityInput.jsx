//-> feasibility/new
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { gql, useQuery } from "@apollo/client";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";

//queries
import { LOAD_CUSTOMERS_NAME_LIST } from "../GraphQL/Queries.jsx";

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
}));

export default function FeasibilityInput(props) {
  const { updateDialogStatus} = props;
  const classes = useStyles();
  const [customerName, setCustomerName] = useState("");
  const [coresNo, setCoresNo] = React.useState(1);
  const [coresNoLabel, setCoresNoLabel] = useState("Single Core Fiber");

  const [customersNameList, setCustomersNameList] = useState(null);

  const { error, loading, data } = useQuery(LOAD_CUSTOMERS_NAME_LIST, {
  fetchPolicy: "network-only"
});

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

  const coresList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const bEnd = [
    ["b-text-field", "Address"],
    ["b-Latitude", "Latitude"],
    ["b-Longitude", "Longitude"],
    ["b-city-name", "City Name"],
  ];

  const aEnd = [
    ["a-text-field", "Address"],
    ["a-Latitude", "Latitude"],
    ["a-Longitude", "Longitude"],
    ["a-city-name", "City Name"],
  ];

  useEffect(() => {
    if (data) {
      setCustomersNameList(data.customers);
    }
  }, [data]);

  let dropDownCustomersNameList =
    <React.Fragment>
      <Select
        id="customer-name-select"
        value={customerName}
        className={classes.selectInput}
        onChange={handleCustomerNameChange}
      >
        {customersNameList !== null
          ? customersNameList.map((customer) => {
            return (
              <MenuItem value={customer.name} key={customer.name}>
                {customer.name}
              </MenuItem>
            );
          }) : ""}
      </Select>
    </React.Fragment>;

  return (
    <React.Fragment>
      <GridContainer className={classes.root}>
        <GridItem xs={12} sm={12} md={8}>
          <span className={classes.labelText}> Customer Name</span>
          {dropDownCustomersNameList}
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
          <div>
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
          </div>
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          style={{ marginTop: 15, marginLeft: 20 }}
        >
          <Button color="success" type="submit">Submit</Button>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
}
