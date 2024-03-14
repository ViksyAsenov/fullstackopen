import React from "react";
import { render, screen } from "@testing-library/react";
import SingleTodo from "./SingleTodo";

test("renders the correct message in a SingleTodo", () => {
  render(
    <SingleTodo
      todo={{ text: "This is a todo", done: false }}
      onClickDelete={jest.fn()}
      onClickComplete={jest.fn()}
    />,
  );
  const todoText = screen.getByText("This is a todo");
  expect(todoText).toBeInTheDocument();
});
