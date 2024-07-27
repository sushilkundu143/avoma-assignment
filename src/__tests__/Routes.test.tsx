// src/__tests__/Routes.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import AppRoutes from "../router/Routes";


// Mock the components used in the routes
jest.mock("../pages/Posts", () => () => <div>Posts Page</div>);
jest.mock("../pages/Post", () => () => <div>Post Page</div>);

describe("AppRoutes", () => {
  test("renders Posts component for / route", () => {
    render(
        <AppRoutes />
    );

    expect(screen.getByText("Posts Page")).toBeInTheDocument();
  });

  test("renders Post component for /post/:id route", () => {
    window.history.pushState({}, "Post Page", "/post/1");
    render(
        <AppRoutes />
    );

    expect(screen.getByText("Post Page")).toBeInTheDocument();
  });

  test("renders error boundary for invalid routes", () => {
    window.history.pushState({}, "Invalid Route", "/invalid");
    render(
        <AppRoutes />
    );

    // Since we don't have a NotFound component in the provided routes,
    // the error boundary should ideally handle any errors. This is a placeholder
    // and should be replaced with the actual behavior of the ErrorBoundary component.
    expect(screen.queryByText("Posts Page")).not.toBeInTheDocument();
    expect(screen.queryByText("Post Page")).not.toBeInTheDocument();
  });
});
