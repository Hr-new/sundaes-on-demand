import { screen, render } from "@testing-library/react";
import Options from "../Options";

test("Intial rendering", async() => {
    render(<Options optionType={"scoops"} />)

    // Find images
    const ScoopImages = await screen.findAllByRole('img', { name: /scoop/i })
    expect(ScoopImages).toHaveLength(2)

    // Get alternate Text of image and confirm it.
    const altText = ScoopImages.map(elem => elem.alt)
    expect(altText).toEqual(['Chocolate Scoop', 'Vanila Scoop'])

})