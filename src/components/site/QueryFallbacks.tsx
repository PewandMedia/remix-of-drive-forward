export function ErrorBox({ error }: { error: Error }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground">Inhalt konnte nicht geladen werden.</p>
      <p className="mt-2 text-xs text-muted-foreground/70">{error.message}</p>
    </div>
  );
}
export function NotFoundBox({ label = "Inhalt nicht gefunden" }: { label?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}