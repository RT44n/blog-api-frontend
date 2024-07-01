import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { PostCard } from "../src/components/PostCard";
const mockedUsedNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("PostCard Component", () => {
  const mockPost = {
    author: { username: "testuser" },
    date: "2024-06-11",
    title: "Test Title",
    text: "This is a test post",
    tag: "TestTag",
    status: "Published",
    _id: "12345",
  };

  it("renders the PostCard with the correct data", () => {
    render(
      <MemoryRouter>
        <PostCard {...mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.author.username)).toBeInTheDocument();
    expect(screen.getByText(mockPost.date)).toBeInTheDocument();
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.text)).toBeInTheDocument();
    expect(screen.getByText(mockPost.tag)).toBeInTheDocument();
  });

  it("opens the delete confirmation dialog when delete icon is clicked", () => {
    render(
      <MemoryRouter>
        <PostCard {...mockPost} />
      </MemoryRouter>
    );

    const deleteIcon = screen.getByTestId("delete");

    fireEvent.click(deleteIcon);

    expect(
      screen.getByText("Are you sure you want to delete this post?")
    ).toBeInTheDocument();
  });

  it("calls the handleEditClick function when edit icon is clicked", () => {
    const mockNavigate = vi.fn();
    vi.mocked(mockedUsedNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <PostCard {...mockPost} />
      </MemoryRouter>
    );

    const editIcon = screen.getByTestId("edit");
    fireEvent.click(editIcon);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/Edit/${mockPost._id}`, // Corrected this line
      expect.anything()
    );
  });

  it("closes the delete confirmation dialog when cancel button is clicked", () => {
    render(
      <MemoryRouter>
        <PostCard {...mockPost} />
      </MemoryRouter>
    );

    const deleteIcon = screen.getByTestId("delete");
    fireEvent.click(deleteIcon);

    const cancelButton = screen.getByRole("button", { name: /no/i });
    fireEvent.click(cancelButton);

    expect(
      screen.queryByText("Are you sure you want to delete this post?")
    ).not.toBeInTheDocument();
  });
});
