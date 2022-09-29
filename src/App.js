import './App.css';
import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './context/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { useState } from 'react';
import OrderSummary from './pages/summary/OrderSummary';


function App() {
  // Possible value for order phase 'inProgress','review','completed'
  const [orderPhase, setOrderPhase] = useState()
  let Component = OrderEntry

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry
      break;
    case 'review':
      Component = OrderSummary
      break
    case 'completed':
      Component = OrderConfirmation
      break
  }

  return (
    < OrderDetailsProvider >
      <Container>
        {<Component setOrderPhase={setOrderPhase} />}
      </Container>
    </OrderDetailsProvider >

  );
}

export default App;
