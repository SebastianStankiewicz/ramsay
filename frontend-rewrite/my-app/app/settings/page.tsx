"use client";

export default function Settings() {
  return (
    <main className="min-h-screen p-6 flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-600">
          Manage your account and security settings
        </p>
      </header>

      {/* Legal / Warnings Section */}
      <section className="flex flex-col gap-3 p-4 border rounded-lg">
        <h2 className="font-semibold">Legal & Warnings</h2>
        <p className="text-sm">
          Make sure to read all terms before making changes.
        </p>
      </section>

      {/* Private Key Section */}
      <section className="flex flex-col gap-3 p-4 border rounded-lg">
        <h2 className="font-semibold">Recovery Key</h2>
        <p className="text-sm">
          You can export your private key. Keep it secure.
        </p>
        <button className="py-3 rounded-xl border font-semibold text-sm active:scale-95 transition-transform">
          Request Private Key
        </button>
      </section>

      {/* Danger Zone / Reset (optional) */}
      <section className="flex flex-col gap-3 p-4 border rounded-lg">
        <h2 className="font-semibold">Danger Zone</h2>
        <button className="py-3 rounded-xl border font-semibold text-sm text-red-600 active:scale-95 transition-transform">
          Delete Account
        </button>
      </section>
    </main>
  );
}