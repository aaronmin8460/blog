// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { siteConfig } from "../lib/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "white",
          color: "black",
        }}
        >
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>{siteConfig.name}</div>
        <div style={{ marginTop: 18, fontSize: 28, opacity: 0.75 }}>{siteConfig.description}</div>
        <div style={{ marginTop: 40, fontSize: 22, opacity: 0.6 }}>{siteConfig.url}</div>
      </div>
    ),
    size
  );
}
