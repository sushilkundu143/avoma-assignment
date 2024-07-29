// src/__tests__/Routes.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this is imported
import AppRoutes from "../router/Routes";

// Mock the components used in the routes
jest.mock("../pages/Posts", () => () => <div>Posts Page</div>);

describe("AppRoutes", () => {
  test("renders Posts component for / route", () => {
    render(<AppRoutes />);

    expect(screen.getByText("Posts Page")).toBeInTheDocument();
  });
});