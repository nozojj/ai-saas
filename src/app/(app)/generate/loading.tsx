
export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="h-8 w-40 animate-pulse rounded bg-slate-200"/>
            <div className="mt-3 h-4 w-64 animate-pulse rounded bg-slate-200" />

        <div className="mt-8 space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-32 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-10 w-32 animate-pulse rounded bg-slate-200" />
            </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-4 w-48 animate-pulse rounded bg-slate-200" />

            <div className="mt-6 aspect-square w-full animate-pulse rounded-2xl bg-slate-200" />
        </div>
    </div>
  )
}
