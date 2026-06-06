import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";
import { getTool, tools } from "@/lib/tools";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Free AI writing tool";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export default async function ToolOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  const title = tool?.name ?? siteConfig.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#4f46e5",
              color: "#ffffff",
              borderRadius: 12,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#0f1222" }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#4f46e5" }}>Free AI Tool</div>
          <div style={{ fontSize: 70, fontWeight: 800, color: "#0f1222", lineHeight: 1.05, marginTop: 12, maxWidth: 1000 }}>
            {title}
          </div>
        </div>

        <div style={{ fontSize: 28, color: "#565d75" }}>Try it free · no sign-up needed</div>
      </div>
    ),
    { ...size },
  );
}
