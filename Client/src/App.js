import { BrowserRouter, Switch, Route } from "react-router-dom";
import Summary from "./pages/Summary";
import Order from "./pages/Order";
import Complete from "./pages/Complete";
import { OrderContextProvider } from "./contexts/OrderContext";

function App() {
  return (
    <OrderContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/summary" component={Summary} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/complete" component={Complete} />
        </Switch>
      </BrowserRouter>
    </OrderContextProvider>
  );
}

export default App;
