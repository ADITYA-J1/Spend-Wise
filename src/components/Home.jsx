import { motion } from "framer-motion";
import { ChevronDown, Activity, ArrowRight, Scale, Globe } from "lucide-react";
import useStore from "../store/useStore";

export default function Home() {
  const setActiveTab = useStore((s) => s.setActiveTab);
  const darkMode = useStore((s) => s.darkMode);

  const revealAnim = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  };

  // Colors based on dark/light mode
  const colors = darkMode
    ? {
        bg: "#000",
        bgAlt: "#030f1f",
        text: "#fff",
        textMuted: "rgba(255,255,255,0.5)",
        textFaint: "rgba(255,255,255,0.4)",
        border: "rgba(255,255,255,0.07)",
        surface: "rgba(255,255,255,0.03)",
        accent: "#00e5ff",
        heroGradient:
          "radial-gradient(ellipse at 50% 30%, #071e3d 0%, #020c1b 55%, #000 100%)",
        sectionGradient1:
          "linear-gradient(180deg, #000000 0%, #020d1a 50%, #030f1f 100%)",
        sectionGradient2:
          "linear-gradient(180deg, #030f1f 0%, #020c1b 50%, #000000 100%)",
      }
    : {
        bg: "#f8f7ff",
        bgAlt: "#eeedf5",
        text: "#0f0a1e",
        textMuted: "rgba(15,10,30,0.6)",
        textFaint: "rgba(15,10,30,0.4)",
        border: "rgba(0,0,0,0.08)",
        surface: "rgba(0,0,0,0.03)",
        accent: "#0077a8",
        heroGradient:
          "radial-gradient(ellipse at 50% 30%, #e8f4f8 0%, #f0f0ff 55%, #f8f7ff 100%)",
        sectionGradient1:
          "linear-gradient(180deg, #f8f7ff 0%, #f0f0ff 50%, #eeedf5 100%)",
        sectionGradient2:
          "linear-gradient(180deg, #eeedf5 0%, #f0f0ff 50%, #f8f7ff 100%)",
      };

  // Consistent padding to match Overview page (24px sides)
  const sectionPadding = "80px 24px";
  const contentMaxWidth = 896;

  return (
    <div style={{ background: colors.bg, color: colors.text, width: "100%" }}>
      {/* SECTION 1 — HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px 60px",
          background: colors.heroGradient,
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background: darkMode
                ? "rgba(0,229,255,0.08)"
                : "rgba(0,119,168,0.1)",
              border: `1px solid ${darkMode ? "rgba(0,229,255,0.25)" : "rgba(0,119,168,0.3)"}`,
              borderRadius: 99,
              padding: "6px 16px",
              fontSize: 11,
              letterSpacing: "0.2em",
              color: colors.textMuted,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: colors.accent,
              }}
            />
            SYSTEM ONLINE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              delay: 0.25,
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              fontSize: "clamp(4rem, 10vw, 9rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              margin: 0,
              lineHeight: 1,
            }}
          >
            <span style={{ color: colors.text }}>Spend</span>
            <span
              style={{
                color: colors.accent,
                textShadow: darkMode ? "0 0 40px rgba(0,229,255,0.5)" : "none",
              }}
            >
              Wise
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              delay: 0.45,
              duration: 0.7,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.35em",
              color: colors.textFaint,
              fontWeight: 400,
              marginTop: 16,
              marginBottom: 32,
            }}
          >
            THE ETHEREAL ANALYST
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{
              maxWidth: 520,
              fontSize: "1rem",
              color: colors.textMuted,
              lineHeight: 1.7,
              margin: "0 auto 48px auto",
            }}
          >
            Next-generation financial intelligence. Monitor your assets, track
            spending, and achieve your financial goals with unprecedented
            clarity.
          </motion.p>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 48,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 0.75,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${darkMode ? "rgba(0,229,255,0.2)" : "rgba(0,119,168,0.2)"}`,
                borderRadius: 10,
                padding: "12px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: colors.textFaint,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                }}
              >
                LIVE MARKET FLUX
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: colors.accent,
                }}
              >
                +12.4%
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 0.85,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${darkMode ? "rgba(0,229,255,0.2)" : "rgba(0,119,168,0.2)"}`,
                borderRadius: 10,
                padding: "12px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: colors.textFaint,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                }}
              >
                PORTFOLIO VELOCITY
              </div>
              <div
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: colors.text,
                }}
              >
                2.48x
              </div>
            </motion.div>
          </div>

          <motion.button
            onClick={() => setActiveTab("overview")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{
              scale: 1.04,
              boxShadow: darkMode
                ? "0 8px 40px rgba(0,229,255,0.5)"
                : "0 8px 40px rgba(0,119,168,0.3)",
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: colors.accent,
              color: darkMode ? "#000000" : "#ffffff",
              fontWeight: 700,
              padding: "14px 36px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              boxShadow: darkMode
                ? "0 4px 24px rgba(0,229,255,0.35)"
                : "0 4px 24px rgba(0,119,168,0.25)",
              fontSize: "1rem",
            }}
          >
            Enter Dashboard →
          </motion.button>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: 32,
            color: colors.textFaint,
          }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* SECTION 2 — MOTTO */}
      <section
        className="home-section"
        style={{
          minHeight: "50vh",
          background: colors.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: sectionPadding,
        }}
      >
        <motion.div
          {...revealAnim}
          style={{
            textAlign: "center",
            maxWidth: contentMaxWidth,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: colors.text,
              margin: "0 0 16px 0",
            }}
          >
            Precision meets fluidity.
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: colors.textMuted,
              maxWidth: 480,
              textAlign: "center",
              lineHeight: 1.8,
              margin: "0 auto",
            }}
          >
            Elevate your financial perspective with AI-driven intelligence that
            breathes life into your transaction history.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3 — FEATURE CARDS */}
      <section
        className="home-section"
        style={{
          background: colors.sectionGradient1,
          padding: sectionPadding,
        }}
      >
        <div
          style={{ maxWidth: contentMaxWidth, margin: "0 auto", width: "100%" }}
        >
          <motion.div
            {...revealAnim}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div
              style={{
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: colors.textFaint,
                fontWeight: 600,
              }}
            >
              WHAT WE OFFER
            </div>
          </motion.div>

          <div
            className="home-grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              width: "100%",
            }}
          >
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 0 * 0.12,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{
                y: -6,
                borderColor: darkMode
                  ? "rgba(0,229,255,0.25)"
                  : "rgba(0,119,168,0.3)",
                background: darkMode
                  ? "rgba(0,229,255,0.04)"
                  : "rgba(0,119,168,0.08)",
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 20,
                padding: 32,
                transition: "background 0.25s, border-color 0.25s",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  background: darkMode
                    ? "rgba(0,229,255,0.1)"
                    : "rgba(0,119,168,0.12)",
                  color: colors.accent,
                  padding: 12,
                  borderRadius: 12,
                  width: "fit-content",
                }}
              >
                <Activity size={28} />
              </div>
              <h3
                style={{
                  color: colors.text,
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginTop: 20,
                  marginBottom: 12,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Insight Tracker
              </h3>
              <p
                style={{
                  color: colors.textMuted,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: 32,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Real-time mapping of your liquid assets against global
                volatility markers. See where every cent breathes.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: "100%",
                    height: 3,
                    background: darkMode
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.08)",
                    borderRadius: 99,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      width: "65%",
                      height: "100%",
                      background: `linear-gradient(90deg, #7c3aed, ${colors.accent})`,
                      borderRadius: 99,
                    }}
                  />
                </div>
                <ArrowRight size={16} color={colors.textFaint} />
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 1 * 0.12,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{
                y: -6,
                borderColor: darkMode
                  ? "rgba(0,229,255,0.25)"
                  : "rgba(0,119,168,0.3)",
                background: darkMode
                  ? "rgba(0,229,255,0.04)"
                  : "rgba(0,119,168,0.08)",
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 20,
                padding: 32,
                transition: "background 0.25s, border-color 0.25s",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  background: "rgba(168,85,247,0.1)",
                  color: "#a855f7",
                  padding: 12,
                  borderRadius: 12,
                  width: "fit-content",
                }}
              >
                <Scale size={28} />
              </div>
              <h3
                style={{
                  color: colors.text,
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginTop: 20,
                  marginBottom: 12,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Credit vs Debit Analyzer
              </h3>
              <p
                style={{
                  color: colors.textMuted,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: 32,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Deep-dive into interest optimization and leverage strategies.
              </p>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: colors.textMuted }}>
                    Optimization Score
                  </span>
                  <span style={{ color: colors.accent, fontWeight: 600 }}>
                    92%
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 3,
                    background: darkMode
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.08)",
                    borderRadius: 99,
                  }}
                >
                  <div
                    style={{
                      width: "92%",
                      height: "100%",
                      background: colors.accent,
                      borderRadius: 99,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 2 * 0.12,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              whileHover={{
                y: -6,
                borderColor: darkMode
                  ? "rgba(0,229,255,0.25)"
                  : "rgba(0,119,168,0.3)",
                background: darkMode
                  ? "rgba(0,229,255,0.04)"
                  : "rgba(0,119,168,0.08)",
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 20,
                padding: 32,
                transition: "background 0.25s, border-color 0.25s",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  background: darkMode
                    ? "rgba(0,229,255,0.1)"
                    : "rgba(0,119,168,0.12)",
                  color: colors.accent,
                  padding: 12,
                  borderRadius: 12,
                  width: "fit-content",
                }}
              >
                <Globe size={28} />
              </div>
              <h3
                style={{
                  color: colors.text,
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginTop: 20,
                  marginBottom: 12,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Global Financial Outlook
              </h3>
              <p
                style={{
                  color: colors.textMuted,
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: 32,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Synthesize macroeconomic trends with your personal net worth.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <div
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    color: "#10b981",
                    border: "1px solid rgba(16,185,129,0.3)",
                    padding: "4px 10px",
                    borderRadius: 99,
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  ASIA MARKETS +1.2%
                </div>
                <div
                  style={{
                    background: "rgba(244,63,94,0.15)",
                    color: "#f43f5e",
                    border: "1px solid rgba(244,63,94,0.3)",
                    padding: "4px 10px",
                    borderRadius: 99,
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  EUR STOXX -0.4%
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SOCIAL PROOF */}
      <section
        className="home-section"
        style={{
          background: colors.bgAlt,
          padding: sectionPadding,
        }}
      >
        <div
          style={{ maxWidth: contentMaxWidth, margin: "0 auto", width: "100%" }}
        >
          <motion.div
            {...revealAnim}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div
              style={{
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: colors.textFaint,
                fontWeight: 600,
              }}
            >
              TRUSTED BY SMART SPENDERS
            </div>
          </motion.div>

          <div
            className="home-grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              width: "100%",
            }}
          >
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 0 * 0.12,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 28,
                minWidth: 0,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: colors.text,
                  lineHeight: 1.6,
                  marginBottom: 24,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                "SpendWise showed me I was spending ₹8,000/month on food I
                barely noticed."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: darkMode
                      ? "rgba(0,229,255,0.15)"
                      : "rgba(0,119,168,0.12)",
                    color: colors.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  AK
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: colors.text,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Arjun K.
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: 12 }}>
                    Software Engineer, Bengaluru
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    color: "#f59e0b",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ★★★★★
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 1 * 0.12,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 28,
                minWidth: 0,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: colors.text,
                  lineHeight: 1.6,
                  marginBottom: 24,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                "The insights section literally paid for itself. Found ₹12,000
                in unused subscriptions."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(168,85,247,0.15)",
                    color: "#a855f7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  PM
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: colors.text,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Priya M.
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: 12 }}>
                    Product Manager, Mumbai
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    color: "#f59e0b",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ★★★★★
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 2 * 0.12,
                duration: 0.7,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: 28,
                minWidth: 0,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  color: colors.text,
                  lineHeight: 1.6,
                  marginBottom: 24,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                "Finally a finance dashboard that doesn't feel like a
                spreadsheet."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.15)",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  RS
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      color: colors.text,
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Rahul S.
                  </div>
                  <div style={{ color: colors.textMuted, fontSize: 12 }}>
                    Freelance Designer, Pune
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    color: "#f59e0b",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ★★★★★
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FLUID INTELLIGENCE */}
      <section
        className="home-section"
        style={{
          background: colors.sectionGradient2,
          padding: sectionPadding,
        }}
      >
        <div
          style={{ maxWidth: contentMaxWidth, margin: "0 auto", width: "100%" }}
        >
          <motion.div
            {...revealAnim}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 48,
            }}
          >
            <div>
              <h2
                style={{
                  color: colors.text,
                  fontSize: "clamp(2rem,5vw,3.5rem)",
                  fontWeight: 800,
                  margin: "0 0 16px 0",
                }}
              >
                Fluid Intelligence
              </h2>
              <p
                style={{
                  color: colors.textMuted,
                  maxWidth: 500,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Data shouldn't be static. Our interface adapts to your financial
                rhythm, highlighting what matters when it matters.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  background: "transparent",
                  color: colors.textFaint,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                DAILY
              </button>
              <button
                style={{
                  background: colors.accent,
                  color: darkMode ? "#000" : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                MONTHLY
              </button>
            </div>
          </motion.div>

          <div
            className="home-grid-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              borderTop: `1px solid ${colors.border}`,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <motion.div
              {...revealAnim}
              className="home-stats-box"
              style={{
                padding: "32px 24px",
                borderRight: `1px solid ${colors.border}`,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: colors.textFaint,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                SAVINGS RATE
              </div>
              <div
                style={{
                  fontSize: "clamp(1.8rem,4vw,2.5rem)",
                  fontWeight: 800,
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                24.5%
              </div>
              <div style={{ fontSize: 13, color: "#10b981" }}>
                ↑ 2.1% from last month
              </div>
            </motion.div>

            <motion.div
              {...revealAnim}
              className="home-stats-box"
              style={{
                padding: "32px 24px",
                borderRight: `1px solid ${colors.border}`,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: colors.textFaint,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                LIQUID RESERVE
              </div>
              <div
                style={{
                  fontSize: "clamp(1.8rem,4vw,2.5rem)",
                  fontWeight: 800,
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                ₹8,40,000
              </div>
              <div style={{ fontSize: 13, color: colors.textFaint }}>
                Target: ₹10,00,000
              </div>
            </motion.div>

            <motion.div
              {...revealAnim}
              className="home-stats-box"
              style={{
                padding: "32px 24px",
                borderRight: `1px solid ${colors.border}`,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: colors.textFaint,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                DEBT RATIO
              </div>
              <div
                style={{
                  fontSize: "clamp(1.8rem,4vw,2.5rem)",
                  fontWeight: 800,
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                0.12
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10b981",
                  }}
                />{" "}
                Optimal Range
              </div>
            </motion.div>

            <motion.div
              {...revealAnim}
              className="home-stats-box"
              style={{ padding: "32px 24px", minWidth: 0 }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: colors.textFaint,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                ASSET VELOCITY
              </div>
              <div
                style={{
                  fontSize: "clamp(1.8rem,4vw,2.5rem)",
                  fontWeight: 800,
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                8.4x
              </div>
              <div style={{ fontSize: 13, color: colors.textFaint }}>
                Active capital usage
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FOOTER */}
      <footer
        className="home-section"
        style={{
          background: colors.bg,
          borderTop: `1px solid ${colors.border}`,
          padding: "48px 24px 40px",
        }}
      >
        <div
          style={{ maxWidth: contentMaxWidth, margin: "0 auto", width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: colors.text,
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}
              >
                SpendWise
              </div>
              <div style={{ fontSize: 12, color: colors.textFaint }}>
                Smart Money Dashboard
              </div>
            </div>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                "Privacy Policy",
                "Terms of Service",
                "Security",
                "Global Markets",
              ].map((link) => (
                <motion.button
                  key={link}
                  onClick={() => {}}
                  whileHover={{ color: colors.text }}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.textFaint,
                    fontSize: 13,
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                >
                  {link}
                </motion.button>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: 32,
              paddingTop: 20,
              borderTop: `1px solid ${colors.border}`,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div style={{ color: colors.textFaint, fontSize: 12 }}>
              © 2024 SpendWise Financial Intelligence. All rights reserved.
            </div>
            <div
              style={{
                color: colors.textFaint,
                fontSize: 12,
                fontStyle: "italic",
              }}
            >
              Made with precision.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
