import { render } from '@testing-library/react'
import { OrderDetailsProvider } from '../context/OrderDetails'

const renderWithContext = (ui, options) =>
    render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything else
export * from '@testing-library/react'

// export render method
export { renderWithContext as render }; 