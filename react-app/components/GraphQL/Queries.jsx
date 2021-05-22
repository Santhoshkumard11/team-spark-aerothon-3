import { gql } from "@apollo/client";

export const LOAD_CUSTOMERS_NAME_LIST = gql`
  {
    customers {
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation TokenAuth($email: String, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      refreshToken
      errors
      success
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($name: String, $address: String) {
    createCustomer(input: { name: $name, address: $address }) {
      customer {
        name
        address
      }
    }
  }
`;

export const FETCH_BUGS = gql`{
  bugReport
    {
      id
      reporterName
      reporterEmail
      bugDescription
      reporterPhoneNumber
      status
    }
  }
`;

export const UPDATE_BUG = gql`
  mutation UpdateBugReport($id: Int, $status: String!) {
    updateBugReport(id: $id, status: $status) {
      id
      reporterName
      reporterEmail
      bugDescription
      reporterPhoneNumber
      status
    }
  }
`;


