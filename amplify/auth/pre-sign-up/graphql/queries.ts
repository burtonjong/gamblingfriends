/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
import * as APITypes from "./API";

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSessionAttended =
  /* GraphQL */ `query GetSessionAttended($id: ID!) {
  getSessionAttended(id: $id) {
    createdAt
    date
    earningsThatSession
    id
    sessionAttendedId
    updatedAt
    user {
      completedRegistration
      createdAt
      email
      firstName
      id
      lastName
      numberSessionsAttended
      profileOwner
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
export const getTimer = /* GraphQL */ `query GetTimer($id: ID!) {
  getTimer(id: $id) {
    createdAt
    id
    nextSessionDate
    nextSessionTime
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTimerQueryVariables, APITypes.GetTimerQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    completedRegistration
    createdAt
    email
    firstName
    id
    lastName
    numberSessionsAttended
    profileOwner
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
export const listTimers = /* GraphQL */ `query ListTimers(
  $filter: ModelTimerFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTimers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      nextSessionDate
      nextSessionTime
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTimersQueryVariables,
  APITypes.ListTimersQuery
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
      completedRegistration
      createdAt
      email
      firstName
      id
      lastName
      numberSessionsAttended
      profileOwner
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
