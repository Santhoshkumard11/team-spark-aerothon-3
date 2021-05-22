import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

const headerTitle = ["Customer Name", "Customer Address"];

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            {tableHead.map((data, index) => {
              return (
                <TableRow className={classes.tableHeadRow}>
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={index + 10}
                  >
                    {data[0]}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={index}
                  >
                    {data[1]}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableHead>
        ) : null}

        <TableBody>
          {tableData.map((customers, index1) => {
            return (
              <React.Fragment>
                {customers.map((customer, index2) => {
                  return (
                    <TableRow
                      key={index2 + 50}
                      className={classes.tableBodyRow}
                    >
                      <TableCell
                        className={classes.tableCell}
                        key={index2 + 10}
                        style={{ width: "20%" }}
                      >
                        {index2 === 0 ? "Contact Person - " + (index1 + 1) : ""}
                      </TableCell>
                      {customer.map((data, index3) => {
                        return (
                          <TableCell
                            className={classes.tableCell}
                            key={index3 + 10}
                          >
                            {data}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
