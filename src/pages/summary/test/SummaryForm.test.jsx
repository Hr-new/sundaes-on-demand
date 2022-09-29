import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event"

test("check initial condition", () => {
    render(<SummaryForm />)

    // find checkbox and checkinitially it is unchecked
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
    expect(checkbox).not.toBeChecked()

    // Find Button and check that initially it is not enabled 
    const confirmButton = screen.getByRole('button', { name: /Confirm Order/i })
    expect(confirmButton).not.toBeEnabled()
});

test("Now click checkbox and check button is enable and when unchecked button is disable", () => {

    render(<SummaryForm />)

    // Find Button and checkbox 
    const confirmButton = screen.getByRole('button', { name: /Confirm Order/i })
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })

    // Now check Checkbox and check button is enable or not
    userEvent.click(checkbox)
    expect(confirmButton).toBeEnabled()

    // Now uncheck the checkbox and check button is disable now
    userEvent.click(checkbox)
    expect(confirmButton).not.toBeEnabled()
})

test("Popover on hover of checkbox label", async () => {
    render(<SummaryForm />)
    // initially popover is hidden
    const nullPopover = screen.queryByText(/no icecream will actually be delivery/i)
    expect(nullPopover).not.toBeInTheDocument()

    // When mourhover label popover is display
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndConditions)

    const popOver = screen.getByText(/no icecream will actually be delivery/i)
    expect(popOver).toBeInTheDocument()

    // when mouseout popover is disppear
    userEvent.unhover(termsAndConditions)
    await waitForElementToBeRemoved(() => screen.queryByText(/no icecream will actually be delivery/i))
    // expect(nullPopover).not.toBeInTheDocument()
})