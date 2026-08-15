import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="theme-dark flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="text-idx text-xs text-acc">404</span>
      <h1 className="mt-6 font-serif text-display-md font-light">
        This road doesn&rsquo;t go through.
      </h1>
      <p className="mt-5 max-w-md text-body-lg text-ink-muted">
        The page you&rsquo;re looking for has moved or never existed. Let&rsquo;s
        get you back on route.
      </p>
      <div className="mt-10">
        <Button href="/" arrow>
          Back to home
        </Button>
      </div>
    </main>
  );
}
