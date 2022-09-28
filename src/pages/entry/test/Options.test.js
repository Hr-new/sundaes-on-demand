import { screen, render } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("Intial rendering of Scoops", async () => {
    render(<Options optionType="scoops" />)

    // Find images
    const ScoopImages = await screen.findAllByRole('img', { name: /scoop/i })
    expect(ScoopImages).toHaveLength(2)

    // Get alternate Text of image and confirm it.
    const altText = ScoopImages.map(scoop => scoop.alt)
    expect(altText).toEqual(['Chocolate Scoop', 'Vanilla Scoop'])

})
// test failed because not find role img with name topping find Alert Banner because of error in handler file
test("Initial rendering of Toppings", async () => {
    render(<Options optionType="toppings" />)
    // Find Topping Image using await
    const ToppingImages = await screen.findAllByRole('img', { name: /topping$/i })
    expect(ToppingImages).toHaveLength(3)

    // Find Alternate text of image and confirm it
    const altToppingText = ToppingImages.map(topping => topping.alt)
    expect(altToppingText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping',])

})