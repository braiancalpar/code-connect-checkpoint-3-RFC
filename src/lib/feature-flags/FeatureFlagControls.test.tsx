import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import {
  FeatureFlagsProvider,
  useFeatureFlags,
} from "./FeatureFlagsProvider";
import { FEATURE_FLAGS_STORAGE_KEY } from "./types";
import { FeatureFlagControls } from "@/components/FeatureFlagControls";

function FlagPreview() {
  const { flags } = useFeatureFlags();
  return flags.showPostHighlight ? (
    <p>Destaque ativo</p>
  ) : (
    <p>Destaque inativo</p>
  );
}

function renderControls() {
  return render(
    <FeatureFlagsProvider>
      <FeatureFlagControls />
      <FlagPreview />
    </FeatureFlagsProvider>,
  );
}

describe("FeatureFlagControls", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("updates the feature and persists the setting without a code change", async () => {
    const user = userEvent.setup();
    const { unmount } = renderControls();
    const toggle = screen.getByRole("checkbox", {
      name: "Destacar posts no feed",
    });

    await waitFor(() => expect(toggle).toBeEnabled());
    expect(toggle).not.toBeChecked();
    expect(screen.getByText("Destaque inativo")).toBeInTheDocument();

    await user.click(toggle);

    expect(screen.getByText("Destaque ativo")).toBeInTheDocument();
    expect(
      JSON.parse(
        window.localStorage.getItem(FEATURE_FLAGS_STORAGE_KEY) ?? "{}",
      ),
    ).toEqual({ showPostHighlight: true });

    unmount();
    renderControls();
    await waitFor(() =>
      expect(
        screen.getByRole("checkbox", {
          name: "Destacar posts no feed",
        }),
      ).toBeChecked(),
    );
  });

  it("keeps optional flags off and reports invalid local configuration", async () => {
    window.localStorage.setItem(FEATURE_FLAGS_STORAGE_KEY, "{invalid");
    renderControls();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "as flags opcionais foram desativadas",
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByText("Destaque inativo")).toBeInTheDocument();
  });
});
