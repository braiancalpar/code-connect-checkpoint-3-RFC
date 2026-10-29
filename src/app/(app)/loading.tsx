import { Spinner } from "@/components/Spinner";
export default function Loading() {
  return (
    <main style={{ minHeight: 240, display: "grid", placeItems: "center" }}>
      <Spinner />
    </main>
  );
}
