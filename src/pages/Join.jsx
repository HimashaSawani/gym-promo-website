export default function Join() {
  return (
    <section className="py-20" style={{ background: '#111', color: '#fff', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold">Join the community</h1>
        <p className="mt-4 text-slate-300">
          Sign up today and get access to our full suite of classes, personal training, and nutrition
          coaching.
        </p>
        <div className="mt-8 rounded-2xl bg-black/40 p-10">
          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Full name"
              className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email address"
              className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-black hover:bg-sky-400"
            >
              Get started
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
