export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-40 animate-pulse  rounded bg-slate-200" />
        <div className="h-4 w-72 animate-pulse  rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
          >
            <div className="aspect-square animate-pulse  rounded bg-slate-200" />
            <div className="h-fll w-full animate-pulse rounded bg-slate-200" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-3/4 animate-pulse  rounded bg-slate-200" />
              <div className="h-3 w-1/2 animate-pulse  rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
