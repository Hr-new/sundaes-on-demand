import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from '../../../context/OrderDetails'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

// The issue: $NaN scoops total not solved because in userEvent.function() provide argument as a string
test('Check initial scoops subtotal and when scoop change check total ', async () => {
    render(<Options optionType='scoops' />)

    // Check initial subtotal $0.0
    const scoopSubTotals = screen.getByText('Scoops Total:$', { exact: false })
    expect(scoopSubTotals).toHaveTextContent('0.00')


    // Add vanila 1 and check subTotal
    const vanilaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await userEvent.clear(vanilaInput)
    await userEvent.type(vanilaInput, '1')
    expect(scoopSubTotals).toHaveTextContent('2.00')

    // Add choclate 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })
    await userEvent.clear(chocolateInput)
    await userEvent.type(chocolateInput, '2')
    expect(scoopSubTotals).toHaveTextContent('6.00')

})

// Not find checkbox instead of find error banner because in handler file create different function for different handler create one function only
test('Check initial toppings subtotal and when topping change check total ', async () => {
    render(<Options optionType='toppings' />)

    // Check initial subtotal $0.0
    const toppingSubTotals = screen.getByText('Toppings Total:$', { exact: false })
    expect(toppingSubTotals).toHaveTextContent('0.00')

    // Add Cherries  and check subtotal
    const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' })
    await userEvent.click(cherriesInput)
    expect(toppingSubTotals).toHaveTextContent('1.50')


    // Add Hot fudge  and check subTotal
    const HotfudgeInput = await screen.findByRole('checkbox', { name: 'Hot fudge' })
    await userEvent.click(HotfudgeInput)
    expect(toppingSubTotals).toHaveTextContent('3.00')


    // Remove Hot fudge   and check subtotal
    await userEvent.click(HotfudgeInput)
    expect(toppingSubTotals).toHaveTextContent('1.50')

})

// Here we have many test se for grand total so we are going to make group all that in desribe()
describe('Various test case of grand total', () => {

    test('Now test grand total when we are add scoops first and then topping', async () => {
        render(<OrderEntry />)

        // First get GrandTotal Element using getBtrole because no async process involved
        const grandTotals = screen.getByRole('heading', { name: /Grand Total/i })

        // Check that grand Total is 0.0
        expect(grandTotals).toHaveTextContent('0.0')

        // Add vanilla scoops and get element using findByRole because async operation involve
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '2')
        expect(grandTotals).toHaveTextContent('4.0')

        // Now add cherries topping
        const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' })
        userEvent.click(cherriesInput)
        expect(grandTotals).toHaveTextContent('5.50')
    })

    test('Now test grand total when adding toppings first and then scoop', async () => {
        render(<OrderEntry />)

        // First get GrandTotal Element
        const grandTotals = screen.getByRole('heading', { name: /Grand Total/i })

        const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' })
        userEvent.click(cherriesInput)
        expect(grandTotals).toHaveTextContent('1.50')

        // Add vanilla scoops and get element using findByRole because async operation involve
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '2')
        expect(grandTotals).toHaveTextContent('5.50')
    })

    test('Grand Total update properly when we remove items', async () => {
        render(<OrderEntry />)

        // First find GrandTotal element
        const grandTotals = screen.getByRole('heading', { name: /Grand Total/i })

        // First add 2 scoop vanilla and  toppings
        const vanillaInput = await screen.findByRole('spinbutton', { name: /Vanilla/i })
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '2')
        expect(grandTotals).toHaveTextContent('4.00')

        const cherriesInput = await screen.findByRole('checkbox', { name: /Cherries/i })
        userEvent.click(cherriesInput)
        expect(grandTotals).toHaveTextContent('5.50')

        // Now remove one Vanila Scoop
        userEvent.clear(vanillaInput)
        userEvent.type(vanillaInput, '1')
        expect(grandTotals).toHaveTextContent('3.50')

        // Now remove topping
        userEvent.click(cherriesInput)
        expect(grandTotals).toHaveTextContent('2.00')



    })
})