import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tagihan from './Pages/Tagihan';
import Login from './Pages/Login';
import Pembayaran from './Pages/Pembayaran';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Tagihan} />
        <Route path="/login" component={Login} />
        <Route path="/pembayaran" component={Pembayaran} />
      </Switch>
    );
  }
}
export default App;
