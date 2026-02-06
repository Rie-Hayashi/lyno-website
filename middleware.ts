import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["ja", "en"],
  defaultLocale: "ja",
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ① ルートアクセス時のみブラウザ言語を見る
  if (pathname === "/") {
    const acceptLang = request.headers.get("accept-language") ?? "";

    // ja / ja-JP / ja-jp を全部拾う
    const prefersJa = acceptLang.toLowerCase().startsWith("ja");

    const locale = prefersJa ? "ja" : "en";

    return NextResponse.redirect(
      new URL(`/${locale}`, request.url)
    );
  }

  // ② それ以外は next-intl に任せる
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};