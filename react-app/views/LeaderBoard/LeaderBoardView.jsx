import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";

import { gql, useQuery } from "@apollo/client";
import { FETCH_BUGS } from "../../components/GraphQL/Queries";

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
  }
};

const useStyles = makeStyles(styles);


const userTableHeads = ["User", "email", "Bugs Reported", "Badge Earned"]

//get the customers and feed in the date to table date

export default function UserProfile() {
  const classes = useStyles();
  const clickListenerFunction = function(event){
    console.log(event.target);
  }
  const { error, loading, data } = useQuery(FETCH_BUGS, {
    fetchPolicy: "network-only"
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  const userList = data.bugReport.map((item)=>{
    let l = [item.reporterName, item.reporterEmail, 1]
    if (item.bugcount<=3){
      l.push('Bronze');
    } else if(item.bugcount>3 && item.bugcount<=10){
      l.push('Silver');
    } else {
      l.push('Gold')
    }
    return l;
  });
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Leader Board List
              </h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={userTableHeads}
                tableData={userList}
                clickListener={clickListenerFunction}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
