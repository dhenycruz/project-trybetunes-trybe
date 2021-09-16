import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './Components/Content';
import Header from './Components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
