export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-72 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-12 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 h-10 w-40 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 space-y-3">
            <div className="h-16 animate-pulse rounded bg-slate-200" />
            <div className="h-16 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
