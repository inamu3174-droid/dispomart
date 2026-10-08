import { BRAND_FAVICON_32_BASE64 } from "@/lib/brand";

export function GET() {
  const buf = Buffer.from(BRAND_FAVICON_32_BASE64, "base64");
  return new Response(buf, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
