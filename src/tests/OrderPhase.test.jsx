import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('Order Phase for Happy Path', async () => {
    // render App Component
    render(<App />)

    // Add ice creams scoop and topping
    const vanillaInput = await screen.findByRole('spinbutton', { name: /Vanilla/i })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')

    const cherriesInput = await screen.findByRole('checkbox', { name: /Cherries/i })
    userEvent.click(cherriesInput)


    // Find and click order button
    const orderButton = screen.getByRole('button', { name: /Place Order/i })
    userEvent.click(orderButton)


    // Check summary information on summary page and order details
    const summaryHeader = screen.getByRole('heading', { name: 'Order Summary' })
    expect(summaryHeader).toBeInTheDocument();

    // Confirm Scoop Data
    const scoopHeading = screen.getByRole('heading', { name: 'Scoops:$4.00' })
    expect(scoopHeading).toBeInTheDocument();

    // Confirm topping Data
    const toppingHeader = screen.getByRole('heading', { name: 'Toppings:$1.50' })
    expect(toppingHeader).toBeInTheDocument();

    // // Confirm Total Heading
    // const totalHeading = screen.getByRole('heading', { name: 'Total:$5.50' })
    // expect(totalHeading).toBeInTheDocument();

    // Check Summary item display or not
    expect(screen.getByText('2 Vanilla')).toBeInTheDocument()
    expect(screen.getByText('Cherries')).toBeInTheDocument()

    // accept terms and condition and click button to confirm order
    const termAndConditions = screen.getByRole('checkbox', { name: /terms/i })
    userEvent.click(termAndConditions)

    // Check confirm button is there and user click on it
    const confirmOrder = screen.getByRole('button', { name: /Confirm Order/i })
    userEvent.click(confirmOrder)

    // Expect "loading" to show
    const loading = await screen.getByRole('heading', { name: /loading/i });
    expect(loading).toBeInTheDocument();

    // After clicking on Confirm Order it move to next page that is  confirmation page
    const thankYouHeader = await screen.getByRole('heading', { name: /thank you/i })
    expect(thankYouHeader).toBeInTheDocument();

    // expect that loading has disappeared
    const notLoading = await screen.getByRole('heading', { name: /loading/i });
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = await screen.getByText(/order number/i)
    expect(orderNumber).toBeInTheDocument();

    // click "new order" button on confirmation page
    const newOrder = await screen.getByRole('button', { name: /create new order/i })
    userEvent.click(newOrder)

    // check that Scoop total and Topping Total is reset
    const scoopTotal = screen.getByText('Scoops total:$0.00')
    expect(scoopTotal).toBeInTheDocument();
    const toppingTotal = screen.getByText('Toppings total:$0.00')
    expect(toppingTotal).toBeInTheDocument();

    // Now wait check that item apper in the page
    await screen.findByRole('spinbutton', { name: /Vanilla/i })
    await screen.findByRole('checkbox', { name: /Cherries/i })



})