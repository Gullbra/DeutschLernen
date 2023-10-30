import React from 'react';

import './styles/base.css';
import { Layout } from './layout/Layout';
import { HomeView } from './views/Home';
import { AppRouting } from './AppRouting' 

function App() {

  return (
    <Layout>
      <AppRouting />
    </Layout>
  );
}

export default App;
