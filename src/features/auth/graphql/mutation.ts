import { gql } from '@apollo/client';

export interface LoginResponse {
  profile: {
    signin: {
      token: string;
    };
  };
}

export interface LoginRequestVariables {
  email: string;
  password: string;
}

export const LOGIN_MUTATION = gql`
  mutation Signin($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
      }
    }
  }
`;
