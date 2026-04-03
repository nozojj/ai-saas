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

          <div className="mt-4 flex items-end gap-3">
            <div className="h-12 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="h-10 w-full animate-pulse rounded bg-slate-200 sm:w-36" />
            <div className="h-10 w-full animate-pulse rounded bg-slate-200 sm:w-40" />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-4 w-full animate-pulse rounded bg-slate-200" />
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-56 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="h-10 w-full animate-pulse rounded bg-slate-200 sm:w-28" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-xl border bg-slate-50 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
