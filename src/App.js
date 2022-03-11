import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend Online Store</h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/shoppingCart" component={ ShoppingCart } />
          <Route exaxt path="/productDetail/:id" component={ ProductDetail } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
