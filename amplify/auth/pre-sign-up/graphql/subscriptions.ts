/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateSessionAttended = /* GraphQL */ `subscription OnCreateSessionAttended(
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
` as GeneratedSubscription<
  APITypes.OnCreateSessionAttendedSubscriptionVariables,
  APITypes.OnCreateSessionAttendedSubscription
>;
export const onCreateTimer = /* GraphQL */ `subscription OnCreateTimer($filter: ModelSubscriptionTimerFilterInput) {
  onCreateTimer(filter: $filter) {
    createdAt
    id
    nextSessionDate
    nextSessionTime
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTimerSubscriptionVariables,
  APITypes.OnCreateTimerSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $profileOwner: String
) {
  onCreateUser(filter: $filter, profileOwner: $profileOwner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteSessionAttended = /* GraphQL */ `subscription OnDeleteSessionAttended(
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
` as GeneratedSubscription<
  APITypes.OnDeleteSessionAttendedSubscriptionVariables,
  APITypes.OnDeleteSessionAttendedSubscription
>;
export const onDeleteTimer = /* GraphQL */ `subscription OnDeleteTimer($filter: ModelSubscriptionTimerFilterInput) {
  onDeleteTimer(filter: $filter) {
    createdAt
    id
    nextSessionDate
    nextSessionTime
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTimerSubscriptionVariables,
  APITypes.OnDeleteTimerSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $profileOwner: String
) {
  onDeleteUser(filter: $filter, profileOwner: $profileOwner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateSessionAttended = /* GraphQL */ `subscription OnUpdateSessionAttended(
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
` as GeneratedSubscription<
  APITypes.OnUpdateSessionAttendedSubscriptionVariables,
  APITypes.OnUpdateSessionAttendedSubscription
>;
export const onUpdateTimer = /* GraphQL */ `subscription OnUpdateTimer($filter: ModelSubscriptionTimerFilterInput) {
  onUpdateTimer(filter: $filter) {
    createdAt
    id
    nextSessionDate
    nextSessionTime
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTimerSubscriptionVariables,
  APITypes.OnUpdateTimerSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $profileOwner: String
) {
  onUpdateUser(filter: $filter, profileOwner: $profileOwner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
