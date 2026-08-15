"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="theme-dark flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="text-idx text-xs text-acc">Error</span>
      <h1 className="mt-6 font-serif text-display-md font-light">
        Something stalled.
      </h1>
      <p className="mt-5 max-w-md text-body-lg text-ink-muted">
        An unexpected error interrupted this page. Try again, or head back to
        the homepage.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button onClick={reset} arrow>
          Try again
        </Button>
        <Button href="/" variant="line">
          Back to home
        </Button>
      </div>
    </main>
  );
}
