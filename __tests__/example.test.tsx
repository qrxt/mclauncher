import React from "react";
import { render, screen } from "@testing-library/react";
import { default as TestComponent } from "./t";

describe("example test describe [.tsx]", () => {
  test("example test [.tsx]", () => {
    render(<TestComponent />);

    expect(screen.getByText("Some text")).toBeInTheDocument();
    expect(screen.queryByText("Another text")).not.toBeInTheDocument();
  });
});
