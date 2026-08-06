import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 renamed Middleware to Proxy; the behaviour is unchanged.
 *
 * This exists only to refresh the Supabase auth cookie so admin sessions do
 * not expire mid-use. It is deliberately NOT the authorization check — that
 * lives in `requireWeddingAdmin()` (lib/auth/dal.ts), which runs on the server
 * for every /admin render. Next's own guidance is that proxy should not be
 * relied on as a full authorization solution.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Without config the site should still serve; /admin will fail closed at the DAL.
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Touching getUser() is what triggers the token refresh.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
