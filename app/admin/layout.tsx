import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s · Admin",
    default: "Admin",
  },
  robots: { index: false, follow: false },
};

/**
 * Bare passthrough. The auth guard lives on the dashboard route group rather
 * than here, because /admin/login must stay reachable while signed out.
 */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
