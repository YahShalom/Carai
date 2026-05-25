export default function DemoLoading() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-center justify-center gap-6 px-6 py-20 text-center text-slate-300 sm:px-10">
      <div className="h-2.5 w-40 rounded-full bg-slate-700/90" />
      <div className="h-5 w-80 rounded-full bg-slate-700/90" />
      <div className="mt-8 grid w-full gap-6 sm:grid-cols-2">
        {[1, 2].map((item) => (
          <div key={item} className="h-52 rounded-[2rem] bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="h-full rounded-[1.75rem] bg-slate-800/70 p-6 skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
