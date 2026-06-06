import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
              color: "#4f46e5",
              borderRadius: 16,
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 42, fontWeight: 800 }}>{siteConfig.name}</div>
        </div>
        <div style={{ fontSize: 66, fontWeight: 800, marginTop: 44, maxWidth: 960, lineHeight: 1.08 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ fontSize: 28, marginTop: 26, opacity: 0.9 }}>
          Free AI writing tools · no sign-up to try
        </div>
      </div>
    ),
    { ...size },
  );
}
