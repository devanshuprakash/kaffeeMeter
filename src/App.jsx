import { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import CoffeeForm from './components/CoffeeForm';
import Stats from './components/Stats';
import History from './components/History';

import './App.css'

function App() {
  const isAuthencated =false;
  const authencatedContent = (
    <>
      <Stats/>
      <History/>

    </>
  )

  

  return (
    <Layout>
      <Hero/>
      <CoffeeForm/>
      {(isAuthencated) && (authencatedContent)}
    </Layout>
    
  )
}

export default App
