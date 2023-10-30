import React from 'react';

import './styles/base.css';
import { Layout } from './layout/Layout';
import { HomeView } from './views/Home';

function App() {

  return (
    <Layout>
      <HomeView />
    </Layout>
  );
}

export default App;
