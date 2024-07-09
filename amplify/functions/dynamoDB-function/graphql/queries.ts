/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSessionAttended = /* GraphQL */ `query GetSessionAttended($id: ID!) {
  getSessionAttended(id: $id) {
    createdAt
    date
    earningsThatSession
    id
    sessionAttendedId
    updatedAt
    user {
      createdAt
      email
      firstName
      id
      lastName
      role
      totalEarnings
      updatedAt
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSessionAttendedQueryVariables,
  APITypes.GetSessionAttendedQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    createdAt
    email
    firstName
    id
    lastName
    role
    sessionsAttended {
      nextToken
      __typename
    }
    totalEarnings
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listSessionAttendeds = /* GraphQL */ `query ListSessionAttendeds(
  $filter: ModelSessionAttendedFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listSessionAttendeds(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      date
      earningsThatSession
      id
      sessionAttendedId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSessionAttendedsQueryVariables,
  APITypes.ListSessionAttendedsQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      email
      firstName
      id
      lastName
      role
      totalEarnings
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
