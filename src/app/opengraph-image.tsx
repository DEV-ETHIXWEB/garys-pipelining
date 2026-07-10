import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name}, Seattle's trenchless sewer & drain experts`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "linear-gradient(135deg, #001b82 0%, #00219e 55%, #183cc7 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={220} height={147} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: "#FFFF4B" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
