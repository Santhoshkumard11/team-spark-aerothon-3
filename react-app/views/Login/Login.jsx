import React from "react";
import { useHistory } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card";
//GraphQL
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "components/GraphQL/Queries.jsx";

const styles = {
  container: {
    margin: "10% 30% 0 30%",
    width: "800px",
    height: "500px",
    alignItems: "center",
  },
  gridItems: {
    marginLeft: "20%",
  },
};

export default function Login(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorStatus, setErrorStatus] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [loginUser, { loginError, loginData }] = useMutation(LOGIN_USER);

  const history = useHistory();
  function setErrors(status, text) {
    setErrorStatus(status);
    setErrorText(text);
  }

  function handleChange(e) {
    const item = e.target;
    if (item.id === "email") {
      setEmail(item.value);
    } else {
      setPassword(item.value);
    }
  }

  function handleSubmitError(err) {
    console.error(err.message);
    // console.log(err);
  }
  function handleSubmitSuccess(res) {
    const reqResult = res.data.tokenAuth;
    console.log(reqResult);

    if (reqResult.success == true) {
      console.log("login successful");

      localStorage.setItem("id_token", reqResult.token);
      history.push("/admin/dashboard");

    } else {
      console.log("error in login");
      setErrors(true, "Please enter valid username and password");
    }
  }

  const handleLoginClick = (e) => {
    e.preventDefault();

    setErrors(false,"");

    loginUser({ variables: { email: email, password: password } })
      .then(handleSubmitSuccess)
      .catch(handleSubmitError);
  };

  return (
    <div>
      <Card className={classes.container}>
        <h2>Login</h2>
        <form onSubmit={handleLoginClick} autoComplete="off">
          <GridContainer>
            <GridItem md={8} style={{ marginLeft: "20%" }}>
              <CustomInput
                labelText="Email Id"
                id="email"
                value={email}
                onChange={handleChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>person_pin</Icon>
                    </InputAdornment>
                  ),
                  type: "email",
                  required: true,
                }}
                error={errorStatus}
              />
            </GridItem>
            <GridItem md={8} style={{ marginLeft: "20%" }}>
              <CustomInput
                labelText="Password"
                id="password"
                onChange={handleChange}
                helperText={errorText}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>https</Icon>
                    </InputAdornment>
                  ),
                  type: "password",
                  required: true,
                  min: "6",
                }}
                error={errorStatus}
              />
            </GridItem>
            <GridItem xs={12} md={8} style={{ marginLeft: "40%" }}>
              <Button type="submit" color="info" style={{ marginTop: "10%" }}>
                Login
              </Button>
            </GridItem>
          </GridContainer>
        </form>
      </Card>
    </div>
  );
}
