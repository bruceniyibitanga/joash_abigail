import type { Metadata } from "next";

import { RsvpTable } from "@/components/admin/rsvp-table";
import { StatTile } from "@/components/admin/stat-tile";
import { signOut } from "@/lib/auth/actions";
import { requireWeddingAdmin } from "@/lib/auth/dal";
import { listRsvps, summariseRsvps } from "@/lib/rsvp/queries";
import { COUPLE, RSVP_DEADLINE, WEDDING_DATE } from "@/lib/wedding";

export const metadata: Metadata = {
  title: "Guest list",
};

// Always fresh: a cached guest list would be worse than useless.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Authorization boundary. Redirects before any data is read.
  const admin = await requireWeddingAdmin();

  const rows = await listRsvps();
  const stats = summariseRsvps(rows);

  return (
    <main className="flex-1 bg-cream px-6 py-12 lg:px-12">
      <div className="mx-auto w-full max-w-360">
        <header className="flex flex-col gap-5 border-b border-ember-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="micro text-ember-600">{COUPLE.displayName}</p>
            <h1 className="font-display mt-3 text-[clamp(2rem,5vw,3rem)] leading-tight font-light">
              Guest list
            </h1>
            <p className="text-ink-soft mt-3 text-sm">
              {WEDDING_DATE.long} · RSVPs close {RSVP_DEADLINE}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-ink-soft text-sm">{admin.fullName}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="micro cursor-pointer rounded-full border border-ember-300 px-5 py-2.5 text-ember-700 transition-colors duration-200 hover:border-ember-600"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile
            label="Attending"
            value={stats.attendingHeadcount}
            hint={`${stats.attendingParties} ${
              stats.attendingParties === 1 ? "response" : "responses"
            }, counting every guest`}
          />
          <StatTile label="Declined" value={stats.decliningParties} />
          <StatTile
            label="Total responses"
            value={stats.responses}
            hint="Attending and declined"
          />
          <StatTile
            label="Dietary needs"
            value={stats.withDietaryNeeds}
            hint="Responses with a note for the caterer"
          />
        </section>

        <RsvpTable rows={rows} />
      </div>
    </main>
  );
}
