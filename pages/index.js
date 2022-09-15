import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

const Home = ({ signOut, user })=> {
  return (
    <>
    <h1>Hello {user.attributes.email}</h1>
    <button onClick={signOut}>Sign out</button>
  </>
  )
}


export default withAuthenticator(Home);
