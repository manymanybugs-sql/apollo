import { ImageResponse } from "next/og";

export const alt =
  "Apollo — Conversations with extraordinary people shaping what comes next.";

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
          justifyContent: "space-between",
          background: "#f3efe6",
          color: "#111111",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            letterSpacing: "-0.03em",
          }}
        >
          Apollo
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: 920,
            fontSize: 76,
            lineHeight: 0.98,
            letterSpacing: "-0.045em",
          }}
        >
          Conversations with extraordinary people shaping what comes next.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "rgba(17,17,17,0.5)",
          }}
        >
          apolloinsight.io
        </div>
      </div>
    ),
    size,
  );
}