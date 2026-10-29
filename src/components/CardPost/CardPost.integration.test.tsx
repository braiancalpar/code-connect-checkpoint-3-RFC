import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "@/components/AuthProvider";
import { CardPost } from "@/components/CardPost";
import { FeatureFlagsProvider } from "@/lib/feature-flags/FeatureFlagsProvider";
import { FEATURE_FLAGS_STORAGE_KEY } from "@/lib/feature-flags/types";
import type { Post } from "@/types";

const post: Post = {
  id: 42,
  cover: "https://example.test/cover.png",
  imageUrl: "https://example.test/image.png",
  title: "Projeto integrado",
  slug: "projeto-integrado",
  body: "Descrição do projeto",
  markdown: "## Projeto",
  likes: 6,
  author: { id: "author-1", name: "Pessoa autora", username: "autora" },
  comments: [],
};

afterEach(() => {
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe("CardPost integration", () => {
  it("loads the session, submits a like, updates the count and matches the visual baseline", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url === "/api/auth/session") {
        return {
          ok: true,
          json: async () => ({
            id: "user-1",
            name: "Pessoa usuária",
            email: "user@example.test",
          }),
        };
      }

      if (url === "/api/posts/42/like") {
        return { ok: true, json: async () => ({ likes: 7 }) };
      }

      throw new Error(`Unexpected request: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    const { asFragment } = render(
      <FeatureFlagsProvider>
        <AuthProvider>
          <CardPost post={post} />
        </AuthProvider>
      </FeatureFlagsProvider>,
    );

    const likeButton = await screen.findByTitle("Curtir");
    await waitFor(() => expect(likeButton).toBeEnabled());
    expect(screen.queryByText("Destaque experimental")).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();

    await user.click(likeButton);

    await waitFor(() => expect(screen.getByText("7")).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/posts/42/like",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("shows the optional highlight when enabled by local configuration", async () => {
    window.localStorage.setItem(
      FEATURE_FLAGS_STORAGE_KEY,
      JSON.stringify({ showPostHighlight: true }),
    );
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Sessão ausente" }),
      }),
    );

    render(
      <FeatureFlagsProvider>
        <AuthProvider>
          <CardPost post={post} />
        </AuthProvider>
      </FeatureFlagsProvider>,
    );

    expect(
      await screen.findByText("Destaque experimental"),
    ).toBeInTheDocument();
  });
});
