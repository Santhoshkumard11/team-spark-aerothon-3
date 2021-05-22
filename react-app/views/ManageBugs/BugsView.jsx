import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

//queries
import { gql, useQuery, useMutation } from "@apollo/client";
import { FETCH_BUGS, UPDATE_BUG } from "../../components/GraphQL/Queries";

import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  buttonRight: {
    float: "right",
  },
};

const useStyles = makeStyles(styles);

const tableHeads = [
  "Id",
  "Name",
  "Email",
  "Description",
  "Contact",
  "Status"
];

//get the customers and feed in the date to table date

export default function PartnerView() {
  const classes = useStyles();
  const [bugUpdate, { bugerror, bugdata }] = useMutation(UPDATE_BUG);
  const { error, loading, data } = useQuery(FETCH_BUGS, {
    fetchPolicy: "network-only"
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const clickListenerFunction = function(event){
    console.log(event.target);
  }
  const bugList = data.bugReport.map((item)=>[item.id, item.reporterName, item.reporterEmail, item.bugDescription, item.reporterPhoneNumber, item.status]);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                List of Bugs Reported
              </h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={tableHeads}
                tableData={bugList}
                clickListener={clickListenerFunction}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
