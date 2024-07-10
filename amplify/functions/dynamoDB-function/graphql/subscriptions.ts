/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
import * as APITypes from "./API";

type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateSessionAttended =
  /* GraphQL */ `subscription OnCreateSessionAttended(
  $filter: ModelSubscriptionSessionAttendedFilterInput
) {
  onCreateSessionAttended(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateSessionAttendedSubscriptionVariables,
    APITypes.OnCreateSessionAttendedSubscription
  >;
export const onCreateUser =
  /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateUserSubscriptionVariables,
    APITypes.OnCreateUserSubscription
  >;
export const onDeleteSessionAttended =
  /* GraphQL */ `subscription OnDeleteSessionAttended(
  $filter: ModelSubscriptionSessionAttendedFilterInput
) {
  onDeleteSessionAttended(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteSessionAttendedSubscriptionVariables,
    APITypes.OnDeleteSessionAttendedSubscription
  >;
export const onDeleteUser =
  /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteUserSubscriptionVariables,
    APITypes.OnDeleteUserSubscription
  >;
export const onUpdateSessionAttended =
  /* GraphQL */ `subscription OnUpdateSessionAttended(
  $filter: ModelSubscriptionSessionAttendedFilterInput
) {
  onUpdateSessionAttended(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateSessionAttendedSubscriptionVariables,
    APITypes.OnUpdateSessionAttendedSubscription
  >;
export const onUpdateUser =
  /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateUserSubscriptionVariables,
    APITypes.OnUpdateUserSubscription
  >;
