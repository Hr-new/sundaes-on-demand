import { render, screen, waitFor } from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'
import { rest } from 'msw'
import { server } from '../../../mocks/server'

test('Handle the server Error', async () => {
    // Override the handler if error occurs
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    );

    render(<OrderEntry />)
    await waitFor(async () => {
        const alert = await screen.findAllByRole('alert')
        expect(alert).toHaveLength(2)
    })
})