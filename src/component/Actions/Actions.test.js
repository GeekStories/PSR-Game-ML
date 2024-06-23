import { render, screen, fireEvent } from "@testing-library/react";
import Actions from "./Actions";
import gestureConstants from "gestures/gestureConstants";

const handleSelection = jest.fn();
const gestureNames = Object.values(gestureConstants);



test.skip("Should display one button for each gesture", () => {
  render(<Actions />);
  const buttons = screen.getAllByRole("button");
  const buttonNames = buttons.map((x) => x.name);
  expect(gestureNames).toEqual(buttonNames);
});

test.skip("Should call the handler function with the selected gesture as an argument", () => {
  render(<Actions />);

  const buttons = screen.getAllByRole("button");

  // act
  buttons.forEach((button) => {
    fireEvent.click(button);

    // assert
    expect(handleSelection).toHaveBeenLastCalledWith(button.name);
  });

  // assert the handler was not called more times than the buttons were clicked
  expect(handleSelection).toHaveBeenCalledTimes(gestureNames.length);
});
