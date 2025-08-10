import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Slides() {
  return (
    <main style={{ background: "#fff", color: "#111", lineHeight: 1.5 }}>
      <ToastContainer />

      {/* HERO: text left, image right */}
      <div
        style={{
          minHeight: "80vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 1280,
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        {/* LEFT: Text panel */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            padding: "clamp(20px, 5vw, 64px)",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 640,
              backgroundColor: "#ffffff",
              padding: "24px 28px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                color: "#ff7e5f",
                fontSize: "2rem",
                marginBottom: "1rem",
                lineHeight: 1.15,
              }}
            >
              Understand Your Users Like Never Before
            </h3>
            <p
              style={{
                fontSize: "1.2rem",
                margin: "0 0 1rem 0",
                color: "#222",
              }}
            >
              Turn your website into a conversation you can see.
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                margin: "0 0 1rem 0",
                color: "#222",
              }}
            >
              Watch where visitors click, scroll, and pause with easy-to-read heatmaps.
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                margin: "0 0 1rem 0",
                color: "#222",
              }}
            >
              Spot the hot zones, find the cold spots, and make simple changes that turn
              more visitors into happy customers.
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                margin: 0,
                color: "#222",
              }}
            >
              No tech talk — just clear pictures that tell you exactly what’s working.
            </p>
          </div>
        </section>

        {/* RIGHT: Image */}
        <section
          style={{
            position: "relative",
            minHeight: 420,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            overflow: "hidden",
            background: "#f9f9f9",
          }}
        >
          <img
            src="./assests/Home1.png"
            alt="Behavior analytics dashboard with heatmap"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </section>
      </div>

      {/* SECTION: Heatmaps 101 */}
      <section style={{ padding: "64px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <header style={{ marginBottom: 20 }}>
            <span
              style={{
                display: "inline-block",
                textTransform: "uppercase",
                letterSpacing: ".08em",
                color: "#7a7a7a",
                fontSize: ".9rem",
                marginBottom: 6,
              }}
            >
              Heatmaps 101
            </span>
            <h2 style={{ fontSize: "2rem", margin: 0 }}>
              What heatmaps show—and how they work
            </h2>
            <p style={{ marginTop: 8, color: "#444", maxWidth: 800 }}>
              Heatmaps aggregate user interactions (clicks, mouse movement, scrolling)
              into a color scale—cool colors indicate low interaction, warm colors
              indicate high interaction. Use them to spot where attention flows (or
              stalls).
            </p>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            <InfoCard
              title="Click Heatmap"
              text="Shows where users click or tap. Red hotspots reveal popular CTAs; cold spots show ignored areas."
              img="./assets/heatmap-click.png"
            />
            <InfoCard
              title="Move Heatmap"
              text="Tracks mouse movement, a proxy for attention on desktop. Use it to guide visual hierarchy."
              img="./assets/heatmap-move.png"
            />
            <InfoCard
              title="Scroll Heatmap"
              text="Visualizes how far users scroll. Drop-offs indicate content that’s too low or not compelling."
              img="./assets/heatmap-scroll.png"
            />
          </div>

          <ul style={{ marginTop: 18, color: "#444" }}>
            <li>Warm colors (orange/red) = high interaction; cool colors (blue) = low.</li>
            <li>Sample size matters—collect enough sessions for reliable patterns.</li>
            <li>Always pair heatmaps with goals (e.g., sign-ups) to judge effectiveness.</li>
          </ul>
        </div>
      </section>

      {/* SECTION: WCAG in practice */}
      <section style={{ padding: "0 20px 72px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <header style={{ marginBottom: 28 }}>
            <span
              style={{
                display: "inline-block",
                textTransform: "uppercase",
                letterSpacing: ".08em",
                color: "#7a7a7a",
                fontSize: ".9rem",
                marginBottom: 6,
              }}
            >
              Accessibility
            </span>
            <h2 style={{ fontSize: "2rem", margin: 0 }}>WCAG in practice</h2>
            <p style={{ marginTop: 8, color: "#444", maxWidth: 800 }}>
              WCAG (Web Content Accessibility Guidelines) ensure your UI is usable for
              everyone. Focus on contrast, readable text, operable controls, and clear
              structure.
            </p>
          </header>

          <ZigZag
            img="./assets/wcag-contrast.png"
            imgAlt="Contrast checker example"
            title="Contrast ratio"
            body="Aim for 4.5:1 for normal text (AA) and 3:1 for large text. High contrast improves readability in all lighting conditions."
          />
          <ZigZag
            reverse
            img="./assets/wcag-hierarchy.png"
            imgAlt="Heading hierarchy example"
            title="Text hierarchy"
            body="Use clear H1 → H2 → H3 progression and visual steps in size/weight/spacing so users quickly grasp what matters."
          />
          <ZigZag
            img="./assets/wcag-operable.png"
            imgAlt="Large button with clear focus ring"
            title="Operable controls"
            body="Buttons and interactive icons should be at least ~44×44px with visible focus states and accessible names."
          />
          <ZigZag
            reverse
            img="./assets/wcag-structure.png"
            imgAlt="Landmarks and semantic structure"
            title="Landmarks & semantics"
            body="Use semantic HTML (header, nav, main, footer) and proper labels/ARIA to support screen readers and keyboard navigation."
          />
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          main > div:first-child { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}

/* ---------- small components ---------- */
function InfoCard({ title, text, img }) {
  return (
    <article
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        padding: 16,
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
        display: "grid",
        gap: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          background: "#f3f4f6",
          borderRadius: 10,
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        {img ? (
          <img
            src={img}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#9ca3af" }}>image</span>
        )}
      </div>
      <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{title}</h3>
      <p style={{ margin: 0, color: "#444" }}>{text}</p>
    </article>
  );
}

function ZigZag({ img, imgAlt, title, body, reverse = false }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: reverse ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
        gap: 20,
        alignItems: "center",
        margin: "34px 0",
      }}
    >
      {!reverse && <ZigImage src={img} alt={imgAlt} />}
      <div>
        <h3 style={{ margin: 0, fontSize: "1.4rem" }}>{title}</h3>
        <p style={{ marginTop: 8, color: "#444" }}>{body}</p>
      </div>
      {reverse && <ZigImage src={img} alt={imgAlt} />}
    </div>
  );
}

function ZigImage({ src, alt }) {
  return (
    <div
      style={{
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        background: "#f3f4f6",
        minHeight: 240,
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

export default Slides;
