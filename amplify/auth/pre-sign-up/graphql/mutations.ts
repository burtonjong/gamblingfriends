/* tslint:disable */

/* eslint-disable */
// this is an auto generated file. This will be overwritten
import * as APITypes from "./API";

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createSessionAttended =
  /* GraphQL */ `mutation CreateSessionAttended(
  $condition: ModelSessionAttendedConditionInput
  $input: CreateSessionAttendedInput!
) {
  createSessionAttended(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.CreateSessionAttendedMutationVariables,
    APITypes.CreateSessionAttendedMutation
  >;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteSessionAttended =
  /* GraphQL */ `mutation DeleteSessionAttended(
  $condition: ModelSessionAttendedConditionInput
  $input: DeleteSessionAttendedInput!
) {
  deleteSessionAttended(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.DeleteSessionAttendedMutationVariables,
    APITypes.DeleteSessionAttendedMutation
  >;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateSessionAttended =
  /* GraphQL */ `mutation UpdateSessionAttended(
  $condition: ModelSessionAttendedConditionInput
  $input: UpdateSessionAttendedInput!
) {
  updateSessionAttended(condition: $condition, input: $input) {
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
` as GeneratedMutation<
    APITypes.UpdateSessionAttendedMutationVariables,
    APITypes.UpdateSessionAttendedMutation
  >;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
