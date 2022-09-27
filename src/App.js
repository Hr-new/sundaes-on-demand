import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './context/OrderDetails';


function App() {
  return (
    <Container>
      {/* Need Provider for Summary page and Order Entry page*/}
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>

      {/* <SummaryForm /> */}
      {/* Confirmation Page not required Provider */}
    </Container>
  );
}

export default App;
