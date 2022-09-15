import React from 'react'
import { Amplify, Auth, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

async function addToGroup() { 
  let apiName = 'AdminQueries';
  let path = '/addUserToGroup';
  let myInit = {
      body: {
        "username" : "richard",
        "groupname": "Editors"
      }, 
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      } 
  }
  return await API.post(apiName, path, myInit);
}

let nextToken;

async function listEditors(limit){
  let apiName = 'AdminQueries';
  let path = '/listUsersInGroup';
  let myInit = { 
      queryStringParameters: {
        "groupname": "Editors",
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
  nextToken = NextToken;
  return rest;
}

function Test() {
  return (
    <div className="App">
      <button onClick={addToGroup}>Add to Group</button>
      <button onClick={() => listEditors(10)}>List Editors</button>
    </div>
  );
}

export default withAuthenticator(Test, true);