export default function Home() {
  return (
    <div className="flex flex-1">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">Contract Dev Tools</h1>
          <p className="text-sm text-muted-foreground">
            Dashboard for contract development and testing.
          </p>
        </div>
      </main>
    </div>
  );
}
