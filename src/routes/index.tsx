import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: PublicPage,
});

function PublicPage() {
  return (
    <>
      <div></div>
    </>
  );
}
