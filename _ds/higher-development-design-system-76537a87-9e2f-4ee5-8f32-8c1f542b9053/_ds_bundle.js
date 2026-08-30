/* @ds-bundle: {"format":4,"namespace":"HigherDevelopmentDesignSystem_76537a","components":[{"name":"HeroPanel","sourcePath":"components/admin/HeroPanel.jsx"},{"name":"FilterButton","sourcePath":"components/app/FilterButton.jsx"},{"name":"SidebarLink","sourcePath":"components/app/SidebarLink.jsx"},{"name":"StageFilterChip","sourcePath":"components/app/StageFilterChip.jsx"},{"name":"StatCard","sourcePath":"components/app/StatCard.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"BulkActionBar","sourcePath":"components/data/BulkActionBar.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"ChatPopup","sourcePath":"components/feedback/ChatPopup.jsx"},{"name":"InfoBanner","sourcePath":"components/feedback/InfoBanner.jsx"},{"name":"NotificationsBell","sourcePath":"components/feedback/NotificationsBell.jsx"},{"name":"RemindersCarousel","sourcePath":"components/feedback/RemindersCarousel.jsx"}],"sourceHashes":{"components/admin/HeroPanel.jsx":"2b801bcc02ce","components/app/FilterButton.jsx":"8681ea5d8f2b","components/app/SidebarLink.jsx":"5f740f602418","components/app/StageFilterChip.jsx":"261d4bde55b0","components/app/StatCard.jsx":"d4d223891c5e","components/core/Avatar.jsx":"10283fc86ba3","components/core/Badge.jsx":"a9877eeb0763","components/core/Button.jsx":"9738b7b777ee","components/core/Card.jsx":"98bf5119223f","components/core/Field.jsx":"832ab0409923","components/core/SectionHeading.jsx":"3533dd59fc78","components/data/BulkActionBar.jsx":"1707a7ac648b","components/data/DataTable.jsx":"320bbd60e669","components/feedback/ChatPopup.jsx":"4bc668da3e2c","components/feedback/InfoBanner.jsx":"719a22d29b7c","components/feedback/NotificationsBell.jsx":"8a7a937c16f1","components/feedback/RemindersCarousel.jsx":"0aca8def40e8","ui_kits/dashboard/dashboard.jsx":"5347f7c02c3b","ui_kits/dashboard/tweaks-panel.jsx":"6591467622ed","ui_kits/dashboard/tweaks-print.jsx":"c471aa26e0fd","ui_kits/dashboard/tweaks.jsx":"64db5e2c7bea","ui_kits/marketing/sections.jsx":"47ffdf6f0dd1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HigherDevelopmentDesignSystem_76537a = window.HigherDevelopmentDesignSystem_76537a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/admin/HeroPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — HeroPanel
 * The platform-admin dark hero: slate-900 gradient panel with tracked eyebrow,
 * big title, description, glass stat tiles, and an optional glass pill link.
 * The only dark surface in the system — marks super-admin territory.
 */
function HeroPanel({
  eyebrow,
  title,
  description,
  stats = [],
  linkLabel,
  linkHref = "#",
  onLinkClick,
  children,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--slate-200)",
      background: "linear-gradient(135deg, var(--slate-900), var(--slate-800), var(--slate-900))",
      padding: "2rem",
      color: "#fff",
      boxShadow: "var(--shadow-md)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-semibold)",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "var(--slate-300)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0.5rem 0 0",
      fontSize: "var(--text-3xl)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.75rem 0 0",
      maxWidth: "42rem",
      fontSize: "var(--text-sm)",
      lineHeight: 1.6,
      color: "var(--slate-300)"
    }
  }, description), linkLabel && /*#__PURE__*/React.createElement("a", {
    href: linkHref,
    onClick: onLinkClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      marginTop: "1.25rem",
      borderRadius: "var(--radius-full)",
      border: "1px solid rgba(255,255,255,0.3)",
      background: hover ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
      padding: "0.5rem 1rem",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-medium)",
      color: "#fff",
      textDecoration: "none",
      backdropFilter: "blur(8px)",
      transition: "var(--transition-fast)"
    }
  }, linkLabel), stats.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1.5rem",
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem"
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      borderRadius: "var(--radius-lg)",
      background: "rgba(255,255,255,0.1)",
      padding: "0.75rem 1rem",
      backdropFilter: "blur(8px)",
      minWidth: "7rem"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      color: "var(--slate-300)"
    }
  }, s.label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.15rem 0 0",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--fw-semibold)"
    }
  }, s.value)))), children);
}
Object.assign(__ds_scope, { HeroPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/HeroPanel.jsx", error: String((e && e.message) || e) }); }

// components/app/FilterButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — FilterButton
 * Saved-filter card button (Work Queue / Cases triage). Label + detail line.
 * Active state renders the primary gradient (the portal theme's treatment).
 */
function FilterButton({
  label,
  detail,
  active = false,
  href = "#",
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      borderRadius: "var(--radius-md)",
      border: active ? "1px solid transparent" : `1px solid ${hover ? "var(--slate-400)" : "var(--slate-300)"}`,
      background: active ? "var(--gradient-primary)" : "#fff",
      padding: "0.5rem 0.75rem",
      textAlign: "left",
      textDecoration: "none",
      fontFamily: "var(--font-sans)",
      transition: "var(--transition-fast)",
      ...style
    },
    "aria-current": active ? "true" : undefined
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-medium)",
      color: active ? "#fff" : "var(--slate-900)"
    }
  }, label), detail && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontSize: "var(--text-xs)",
      color: active ? "rgba(255,255,255,0.85)" : "var(--slate-600)"
    }
  }, detail));
}
Object.assign(__ds_scope, { FilterButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/FilterButton.jsx", error: String((e && e.message) || e) }); }

// components/app/SidebarLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — SidebarLink
 * Dashboard nav item. Active state uses the blue→violet gradient + glow.
 * Icon is any node (a Lucide <svg>); optional count badge on the right.
 */
function SidebarLink({
  icon = null,
  label,
  count = null,
  active = false,
  href = "#",
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    position: "relative",
    display: "flex",
    minHeight: "2.65rem",
    alignItems: "center",
    gap: "0.75rem",
    borderRadius: "var(--radius-lg)",
    padding: "0.65rem 0.75rem",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--fw-semibold)",
    textDecoration: "none",
    transition: "background var(--dur-fast) ease, color var(--dur-fast) ease, box-shadow var(--dur-fast) ease"
  };
  const skin = active ? {
    background: "var(--gradient-active)",
    color: "#fff",
    boxShadow: "var(--shadow-active)"
  } : {
    background: hover ? "rgba(241,245,249,0.9)" : "transparent",
    color: hover ? "var(--slate-900)" : "var(--slate-600)"
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-current": active ? "page" : undefined,
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: "1.1rem",
      height: "1.1rem",
      flex: "0 0 auto"
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, label), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      minWidth: "1.45rem",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      background: active ? "rgba(255,255,255,0.22)" : "rgba(15,23,42,0.08)",
      padding: "0.15rem 0.45rem",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-extrabold)",
      color: "inherit"
    }
  }, count));
}
Object.assign(__ds_scope, { SidebarLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/SidebarLink.jsx", error: String((e && e.message) || e) }); }

// components/app/StageFilterChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — StageFilterChip
 * Case-stage filter pill. Inactive chips carry the stage's tone tint;
 * active flips to solid slate-900.
 */
const TONES = {
  neutral: {
    bg: "var(--slate-100)",
    fg: "var(--slate-700)",
    bd: "var(--slate-200)"
  },
  info: {
    bg: "var(--blue-50)",
    fg: "var(--blue-700)",
    bd: "var(--blue-200)"
  },
  progress: {
    bg: "var(--amber-50)",
    fg: "var(--amber-700)",
    bd: "var(--amber-200)"
  },
  payment: {
    bg: "var(--violet-50)",
    fg: "var(--violet-700)",
    bd: "var(--violet-200)"
  },
  success: {
    bg: "var(--emerald-50)",
    fg: "var(--emerald-700)",
    bd: "var(--emerald-200)"
  },
  danger: {
    bg: "var(--rose-50)",
    fg: "var(--rose-700)",
    bd: "var(--rose-200)"
  },
  none: {
    bg: "#fff",
    fg: "var(--slate-700)",
    bd: "var(--slate-300)"
  }
};
function StageFilterChip({
  label,
  tone = "none",
  active = false,
  href = "#",
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const t = TONES[tone] || TONES.none;
  const skin = active ? {
    background: "var(--slate-900)",
    color: "#fff",
    borderColor: "var(--slate-900)"
  } : {
    background: t.bg,
    color: t.fg,
    borderColor: hover ? "var(--slate-400)" : t.bd
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-current": active ? "true" : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "var(--radius-full)",
      border: "1px solid",
      padding: "0.375rem 0.75rem",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-medium)",
      textDecoration: "none",
      transition: "var(--transition-fast)",
      ...skin,
      ...style
    }
  }, rest), label);
}
Object.assign(__ds_scope, { StageFilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/StageFilterChip.jsx", error: String((e && e.message) || e) }); }

// components/app/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — StatCard
 * Compact metric tile used across dashboard overviews. Title + big value,
 * optional delta and hint. Bordered white surface.
 */
function StatCard({
  title,
  value,
  delta = null,
  deltaTone = "neutral",
  hint = null,
  style = {},
  ...rest
}) {
  const deltaColor = {
    up: "var(--emerald-700)",
    down: "var(--rose-700)",
    neutral: "var(--slate-500)"
  }[deltaTone] || "var(--slate-500)";
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-4)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-semibold)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--slate-500)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "0.5rem",
      marginTop: "0.35rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-3xl)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--slate-900)",
      lineHeight: 1
    }
  }, value), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-semibold)",
      color: deltaColor
    }
  }, delta)), hint && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.4rem 0 0",
      fontSize: "var(--text-xs)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — Avatar
 * Initials circle. Rose skin matches the dashboard sidebar avatar.
 */
const SIZES = {
  sm: 32,
  md: 44,
  lg: 56
};
function initials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
function Avatar({
  name = "",
  src = null,
  size = "md",
  style = {},
  ...rest
}) {
  const px = SIZES[size] || SIZES.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: px,
    height: px,
    flex: "0 0 auto",
    borderRadius: "var(--radius-full)",
    border: "1px solid var(--border-accent)",
    background: "var(--rose-50)",
    color: "var(--rose-900)",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--fw-extrabold)",
    fontSize: px * 0.36,
    overflow: "hidden"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...style
    },
    "aria-label": name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — Badge
 * Tone-based pill used for case stages, task statuses, and role labels.
 * Tones map to the product's stage/status color logic.
 */
const TONES = {
  neutral: {
    bg: "var(--tone-neutral-bg)",
    fg: "var(--tone-neutral-fg)",
    bd: "var(--slate-200)"
  },
  info: {
    bg: "var(--tone-info-bg)",
    fg: "var(--tone-info-fg)",
    bd: "var(--blue-200)"
  },
  progress: {
    bg: "var(--tone-progress-bg)",
    fg: "var(--tone-progress-fg)",
    bd: "var(--amber-200)"
  },
  payment: {
    bg: "var(--tone-payment-bg)",
    fg: "var(--tone-payment-fg)",
    bd: "var(--violet-200)"
  },
  success: {
    bg: "var(--tone-success-bg)",
    fg: "var(--tone-success-fg)",
    bd: "var(--emerald-200)"
  },
  danger: {
    bg: "var(--tone-danger-bg)",
    fg: "var(--tone-danger-fg)",
    bd: "var(--rose-200)"
  }
};
function Badge({
  children,
  tone = "neutral",
  solid = false,
  dot = false,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.2rem 0.6rem",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--fw-semibold)",
    lineHeight: 1.4,
    borderRadius: "var(--radius-full)",
    border: "1px solid"
  };
  const skin = solid ? {
    background: t.fg,
    color: "#fff",
    borderColor: t.fg
  } : {
    background: t.bg,
    color: t.fg,
    borderColor: t.bd
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "0.4rem",
      height: "0.4rem",
      borderRadius: "50%",
      background: "currentColor",
      flex: "0 0 auto"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — Button
 * The product's signature CTA is a rose→blue gradient pill/rounded button;
 * secondary is a blue-900 outline. App surfaces also use a neutral outline.
 */
const SIZES = {
  sm: {
    padding: "0.5rem 0.85rem",
    fontSize: "var(--text-xs)",
    radius: "var(--radius-md)",
    gap: "0.4rem"
  },
  md: {
    padding: "0.65rem 1.1rem",
    fontSize: "var(--text-sm)",
    radius: "var(--radius-md)",
    gap: "0.5rem"
  },
  lg: {
    padding: "0.875rem 1.75rem",
    fontSize: "var(--text-sm)",
    radius: "var(--radius-sm)",
    gap: "0.5rem"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  pill = false,
  icon = null,
  iconRight = null,
  disabled = false,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--fw-semibold)",
    lineHeight: 1,
    borderRadius: pill ? "var(--radius-full)" : s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "var(--transition-fast)",
    textDecoration: "none",
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: "var(--gradient-primary)",
      color: "#fff",
      boxShadow: "var(--shadow-cta)"
    },
    secondary: {
      background: "transparent",
      color: "var(--blue-900)",
      borderColor: "var(--blue-900)"
    },
    neutral: {
      background: "#fff",
      color: "var(--slate-700)",
      borderColor: "var(--slate-300)",
      boxShadow: "var(--shadow-sm)"
    },
    ghost: {
      background: "transparent",
      color: "var(--slate-600)"
    },
    danger: {
      background: "var(--rose-500)",
      color: "#fff"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      ...base,
      ...(variants[variant] || variants.primary),
      ...style
    },
    onMouseEnter: e => {
      if (disabled) return;
      if (variant === "primary") e.currentTarget.style.filter = "brightness(1.08)";else if (variant === "secondary") {
        e.currentTarget.style.background = "var(--blue-900)";
        e.currentTarget.style.color = "#fff";
      } else if (variant === "neutral") e.currentTarget.style.background = "var(--slate-50)";else if (variant === "ghost") e.currentTarget.style.background = "var(--slate-100)";else if (variant === "danger") e.currentTarget.style.background = "var(--rose-600)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = "none";
      const v = variants[variant] || variants.primary;
      e.currentTarget.style.background = v.background;
      e.currentTarget.style.color = v.color;
    }
  }, rest), icon, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — Card (SurfaceCard)
 * White, slate-bordered, soft shadow. Optional hover-lift used on
 * marketing service/feature cards.
 */
function Card({
  children,
  hover = false,
  padded = true,
  style = {},
  ...rest
}) {
  const [lift, setLift] = React.useState(false);
  const base = {
    background: "var(--surface-card)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-lg)",
    padding: padded ? "var(--space-5)" : 0,
    boxShadow: hover && lift ? "var(--shadow-md)" : "var(--shadow-sm)",
    transform: hover && lift ? "translateY(-4px)" : "none",
    transition: "transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)"
  };
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      ...base,
      ...style
    },
    onMouseEnter: () => hover && setLift(true),
    onMouseLeave: () => hover && setLift(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — Field
 * Labeled text input. Slate border, rose focus ring (matches login form).
 */
function Field({
  label,
  type = "text",
  as = "input",
  placeholder,
  value,
  defaultValue,
  onChange,
  required = false,
  hint,
  options = [],
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const controlStyle = {
    marginTop: "0.3rem",
    width: "100%",
    boxSizing: "border-box",
    padding: "0.6rem 0.75rem",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--slate-900)",
    background: "#fff",
    border: `1px solid ${focus ? "var(--rose-400)" : "var(--slate-300)"}`,
    borderRadius: "var(--radius-md)",
    outline: "none",
    boxShadow: focus ? "0 0 0 1px var(--rose-400)" : "none",
    transition: "var(--transition-fast)"
  };
  const common = {
    placeholder,
    value,
    defaultValue,
    onChange,
    required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: controlStyle,
    ...rest
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-medium)",
      color: "var(--slate-700)",
      ...style
    }
  }, label, as === "textarea" ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: 4
  }, common)) : as === "select" ? /*#__PURE__*/React.createElement("select", common, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, common)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "0.3rem",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-regular)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Field.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — SectionHeading
 * rose eyebrow (uppercase, wide tracking) + blue-900 title + slate subtitle.
 * Centered by default, matching the marketing sections.
 */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      maxWidth: "48rem",
      marginInline: align === "center" ? "auto" : 0,
      textAlign: align,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--text-eyebrow)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0.5rem 0 0",
      fontSize: "var(--text-section)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--text-heading)",
      lineHeight: "var(--leading-tight)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0.75rem 0 0",
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-relaxed)",
      color: "var(--text-body)"
    }
  }, subtitle));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/data/BulkActionBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — BulkActionBar
 * The bulk-operations strip from document verification: gray panel with an
 * action select, an optional shared-notes input, and an apply button.
 * Pair with checkbox rows; call onApply(action, notes).
 */
function BulkActionBar({
  options = [],
  applyLabel = "Apply to Selected",
  notesPlaceholder = "Shared notes (optional)",
  showNotes = true,
  onApply,
  style = {},
  ...rest
}) {
  const [action, setAction] = React.useState(options[0]?.value ?? "");
  const [notes, setNotes] = React.useState("");
  const controlStyle = {
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--slate-300)",
    background: "#fff",
    padding: "0.25rem 0.5rem",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "var(--slate-800)",
    outline: "none"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "0.5rem",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--slate-200)",
      background: "var(--slate-50)",
      padding: "0.5rem",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("select", {
    value: action,
    onChange: e => setAction(e.target.value),
    style: controlStyle
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))), showNotes && /*#__PURE__*/React.createElement("input", {
    value: notes,
    onChange: e => setNotes(e.target.value),
    placeholder: notesPlaceholder,
    style: {
      ...controlStyle,
      flex: 1,
      minWidth: "14rem"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => onApply && onApply(action, notes),
    style: {
      ...controlStyle,
      fontWeight: "var(--fw-medium)",
      cursor: "pointer",
      transition: "var(--transition-fast)"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--slate-100)",
    onMouseLeave: e => e.currentTarget.style.background = "#fff"
  }, applyLabel));
}
Object.assign(__ds_scope, { BulkActionBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BulkActionBar.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — DataTable
 * The app's table pattern: 13px cells, uppercase 11px slate-500 headers,
 * hairline slate-100 row dividers, tinted thead (portal theme).
 */
function DataTable({
  columns = [],
  rows = [],
  tintedHeader = true,
  minWidth = 0,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", _extends({
    style: {
      width: "100%",
      minWidth: minWidth || undefined,
      borderCollapse: "collapse",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(col => /*#__PURE__*/React.createElement("th", {
    key: col.key,
    style: {
      padding: "8px 10px",
      textAlign: col.align || "left",
      fontSize: 11,
      fontWeight: "var(--fw-semibold)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--slate-500)",
      background: tintedHeader ? "rgba(241,245,249,0.75)" : "transparent"
    }
  }, col.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row.id ?? i,
    style: {
      borderTop: "1px solid var(--slate-100)"
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("td", {
    key: col.key,
    style: {
      padding: "10px",
      textAlign: col.align || "left",
      color: "var(--slate-600)",
      verticalAlign: "middle"
    }
  }, row[col.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ChatPopup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — ChatPopup
 * Internal staff chat: floating gradient FAB (bottom-right) with unread badge,
 * opening a docked chat window (gradient header, slate message area,
 * pill input + gradient send). Uses the lighter chat gradient (rose-400→blue-400).
 */
const CHAT_GRADIENT = "var(--gradient-chat)";
function Bubble({
  mine,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: mine ? "flex-end" : "flex-start",
      maxWidth: "80%",
      borderRadius: 12,
      padding: "6px 10px",
      fontSize: 12,
      lineHeight: 1.45,
      background: mine ? CHAT_GRADIENT : "#fff",
      color: mine ? "#fff" : "var(--slate-700)",
      border: mine ? "none" : "1px solid var(--slate-200)",
      boxShadow: "var(--shadow-sm)"
    }
  }, children);
}
function ChatPopup({
  contactName = "Team chat",
  unreadCount = 0,
  initialMessages = [],
  defaultOpen = false,
  fixed = true,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [messages, setMessages] = React.useState(initialMessages);
  const [draft, setDraft] = React.useState("");
  const listRef = React.useRef(null);
  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);
  const send = e => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages(m => [...m, {
      id: Date.now(),
      mine: true,
      text
    }]);
    setDraft("");
  };
  const initials = contactName.split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...(fixed ? {
        position: "fixed",
        bottom: 0,
        right: 16,
        zIndex: 50
      } : {
        position: "relative",
        display: "inline-flex"
      }),
      display: "flex",
      alignItems: "flex-end",
      gap: 8,
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), open && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 288,
      overflow: "hidden",
      borderRadius: "12px 12px 0 0",
      border: "1px solid var(--slate-200)",
      borderBottom: "none",
      background: "#fff",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      background: CHAT_GRADIENT,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      flex: "0 0 auto",
      borderRadius: "var(--radius-full)",
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      fontSize: 11,
      fontWeight: "var(--fw-bold)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, initials), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: "var(--fw-semibold)",
      color: "#fff",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, contactName)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(false),
    "aria-label": "Close chat",
    style: {
      border: 0,
      background: "transparent",
      color: "#fff",
      borderRadius: 4,
      padding: 2,
      cursor: "pointer",
      fontSize: 14,
      lineHeight: 1
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    style: {
      height: 256,
      overflowY: "auto",
      padding: 12,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      background: "var(--slate-50)"
    }
  }, messages.map(m => /*#__PURE__*/React.createElement(Bubble, {
    key: m.id,
    mine: m.mine
  }, m.text))), /*#__PURE__*/React.createElement("form", {
    onSubmit: send,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      borderTop: "1px solid var(--slate-100)",
      background: "#fff",
      padding: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    placeholder: "Type a message\u2026",
    style: {
      flex: 1,
      borderRadius: "var(--radius-full)",
      background: "var(--slate-100)",
      border: 0,
      outline: "none",
      padding: "6px 12px",
      fontSize: 12,
      color: "var(--slate-700)",
      fontFamily: "var(--font-sans)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: !draft.trim(),
    "aria-label": "Send",
    style: {
      width: 28,
      height: 28,
      flex: "0 0 auto",
      borderRadius: "var(--radius-full)",
      border: 0,
      background: CHAT_GRADIENT,
      color: "#fff",
      cursor: "pointer",
      opacity: draft.trim() ? 1 : 0.4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13
    }
  }, "\u27A4"))), !open && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(true),
    "aria-label": "Open chat",
    style: {
      position: "relative",
      width: 48,
      height: 48,
      marginBottom: 8,
      borderRadius: "var(--radius-full)",
      border: 0,
      background: CHAT_GRADIENT,
      color: "#fff",
      boxShadow: "var(--shadow-lift)",
      cursor: "pointer",
      fontSize: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform var(--dur-fast) ease"
    },
    onMouseEnter: e => e.currentTarget.style.transform = "scale(1.05)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
  })), unreadCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -4,
      right: -4,
      width: 20,
      height: 20,
      borderRadius: "var(--radius-full)",
      background: "var(--rose-600)",
      color: "#fff",
      fontSize: 10,
      fontWeight: "var(--fw-bold)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 0 2px #fff"
    }
  }, unreadCount)));
}
Object.assign(__ds_scope, { ChatPopup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ChatPopup.jsx", error: String((e && e.message) || e) }); }

// components/feedback/InfoBanner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — InfoBanner
 * Inline tinted alert used for success/error/warning/info messages
 * (org created, invalid form, claim errors, tab intros).
 */
const TONES = {
  success: {
    bg: "var(--emerald-50)",
    bd: "var(--emerald-200)",
    fg: "#065f46"
  },
  error: {
    bg: "#fef2f2",
    bd: "#fecaca",
    fg: "#991b1b"
  },
  warning: {
    bg: "var(--amber-50)",
    bd: "#fcd34d",
    fg: "var(--amber-800)"
  },
  info: {
    bg: "var(--blue-50)",
    bd: "var(--blue-100)",
    fg: "var(--blue-900)"
  }
};
function InfoBanner({
  tone = "info",
  title,
  children,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: tone === "error" ? "alert" : "status",
    style: {
      borderRadius: "var(--radius-md)",
      border: `1px solid ${t.bd}`,
      background: t.bg,
      color: t.fg,
      padding: "0.75rem 1rem",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      lineHeight: 1.5,
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: "var(--fw-semibold)"
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: title ? "0.25rem" : 0
    }
  }, children));
}
Object.assign(__ds_scope, { InfoBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/InfoBanner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/NotificationsBell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — NotificationsBell
 * Workflow notifications: 🔔 icon button (the product deliberately uses the
 * emoji) + red action-required count badge + dropdown grouped by client.
 * Item tint by type: new application = emerald, action required = amber, info = blue.
 */
function itemSkin(item) {
  if (item.type === "NEW_STUDENT_APPLICATION") return {
    bd: "#6ee7b7",
    bg: "var(--emerald-50)",
    fg: "#064e3b"
  };
  if (item.actionRequired) return {
    bd: "#fcd34d",
    bg: "var(--amber-50)",
    fg: "#78350f"
  };
  return {
    bd: "var(--blue-200)",
    bg: "var(--blue-50)",
    fg: "var(--blue-900)"
  };
}
function NotificationsBell({
  groups = [],
  actionRequiredCount = 0,
  onItemClick,
  defaultOpen = false,
  align = "right",
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [read, setRead] = React.useState({});
  const hasItems = groups.some(g => g.items.length > 0);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      display: "inline-block",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(v => !v),
    "aria-label": "Open workflow notifications",
    style: {
      position: "relative",
      width: 36,
      height: 36,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--slate-300)",
      background: "#fff",
      color: "var(--slate-700)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      cursor: "pointer",
      transition: "var(--transition-fast)"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--slate-50)",
    onMouseLeave: e => e.currentTarget.style.background = "#fff"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true
  }, "\uD83D\uDD14"), actionRequiredCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -4,
      right: -4,
      minWidth: 20,
      height: 20,
      borderRadius: "var(--radius-full)",
      background: "#dc2626",
      color: "#fff",
      fontSize: 10,
      fontWeight: "var(--fw-bold)",
      padding: "0 5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, actionRequiredCount > 99 ? "99+" : actionRequiredCount)), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      ...(align === "left" ? {
        left: 0
      } : {
        right: 0
      }),
      top: "calc(100% + 8px)",
      zIndex: 80,
      width: "28rem",
      maxWidth: "90vw",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--slate-200)",
      background: "#fff",
      padding: 12,
      boxShadow: "var(--shadow-modal)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--slate-900)"
    }
  }, "Notifications"), !hasItems ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 0",
      fontSize: "var(--text-sm)",
      color: "var(--slate-600)"
    }
  }, "No notifications right now.") : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      maxHeight: "28rem",
      overflowY: "auto",
      display: "grid",
      gap: 12
    }
  }, groups.map(group => /*#__PURE__*/React.createElement("section", {
    key: group.studentId || group.studentName,
    style: {
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--slate-200)",
      background: "rgba(248,250,252,0.5)",
      padding: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-semibold)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--slate-700)"
    }
  }, group.studentName), group.unreadCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      borderRadius: "var(--radius-full)",
      background: "var(--slate-200)",
      padding: "2px 8px",
      fontSize: 10,
      fontWeight: "var(--fw-semibold)",
      color: "var(--slate-700)"
    }
  }, group.unreadCount, " unread")), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: "8px 0 0",
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: 8
    }
  }, group.items.map(item => {
    const s = itemSkin(item);
    const isRead = read[item.id] || item.isRead;
    return /*#__PURE__*/React.createElement("li", {
      key: item.id
    }, /*#__PURE__*/React.createElement("a", {
      href: item.link || "#",
      onClick: e => {
        e.preventDefault();
        setRead(r => ({
          ...r,
          [item.id]: true
        }));
        onItemClick && onItemClick(item);
      },
      style: {
        display: "block",
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${s.bd}`,
        background: s.bg,
        color: s.fg,
        padding: 8,
        fontSize: "var(--text-xs)",
        textDecoration: "none",
        opacity: isRead ? 0.7 : 1,
        transition: "var(--transition-fast)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontWeight: "var(--fw-semibold)"
      }
    }, item.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "2px 0 0"
      }
    }, item.message), item.note && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "4px 0 0",
        fontSize: 11,
        fontStyle: "italic"
      }
    }, "Note: ", item.note)));
  })))))));
}
Object.assign(__ds_scope, { NotificationsBell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/NotificationsBell.jsx", error: String((e && e.message) || e) }); }

// components/feedback/RemindersCarousel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Higher Development — RemindersCarousel
 * Dashboard reminders strip: white card with round prev/next controls and
 * left-border severity-accented reminder cards (the one sanctioned
 * left-border pattern in this system).
 */
const SEVERITY = {
  info: {
    border: "var(--blue-500)",
    bg: "rgba(239,246,255,0.5)"
  },
  warning: {
    border: "var(--amber-500)",
    bg: "rgba(255,251,235,0.5)"
  },
  urgent: {
    border: "#ef4444",
    bg: "rgba(254,242,242,0.5)"
  }
};
function RoundNav({
  dir,
  onClick,
  disabled
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    disabled: disabled,
    "aria-label": dir === "prev" ? "Show previous reminder" : "Show next reminder",
    style: {
      width: 30,
      height: 30,
      borderRadius: "var(--radius-full)",
      border: "1px solid var(--slate-300)",
      background: "#fff",
      color: "var(--slate-600)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      fontSize: 14,
      lineHeight: 1,
      transition: "var(--transition-fast)"
    }
  }, dir === "prev" ? "‹" : "›");
}
function RemindersCarousel({
  reminders = [],
  title = "Reminders",
  perView = 3,
  onOpen,
  style = {},
  ...rest
}) {
  const [start, setStart] = React.useState(0);
  const maxStart = Math.max(0, reminders.length - perView);
  const visible = reminders.slice(start, start + perView);
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--slate-200)",
      background: "#fff",
      padding: "1rem",
      boxShadow: "var(--shadow-sm)",
      fontFamily: "var(--font-sans)",
      ...style
    },
    "aria-label": title
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--slate-900)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontSize: "var(--text-xs)",
      color: "var(--slate-500)"
    }
  }, reminders.length, " reminder", reminders.length !== 1 ? "s" : "", " requiring attention")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement(RoundNav, {
    dir: "prev",
    onClick: () => setStart(s => Math.max(0, s - 1)),
    disabled: start === 0
  }), /*#__PURE__*/React.createElement(RoundNav, {
    dir: "next",
    onClick: () => setStart(s => Math.min(maxStart, s + 1)),
    disabled: start >= maxStart
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "grid",
      gridTemplateColumns: `repeat(${Math.min(perView, Math.max(visible.length, 1))}, 1fr)`,
      gap: 12
    },
    role: "list"
  }, visible.map(r => {
    const s = SEVERITY[r.severity] || SEVERITY.info;
    return /*#__PURE__*/React.createElement("a", {
      key: r.id,
      role: "listitem",
      href: r.link || "#",
      onClick: e => {
        if (onOpen) {
          e.preventDefault();
          onOpen(r);
        }
      },
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 8,
        minHeight: "7rem",
        borderRadius: "var(--radius-md)",
        borderLeft: `4px solid ${s.border}`,
        background: s.bg,
        padding: "0.75rem",
        textDecoration: "none",
        transition: "var(--transition-fast)"
      },
      onMouseEnter: e => e.currentTarget.style.opacity = "0.9",
      onMouseLeave: e => e.currentTarget.style.opacity = "1"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        borderRadius: "var(--radius-full)",
        background: "var(--slate-200)",
        padding: "2px 8px",
        fontSize: 10,
        fontWeight: "var(--fw-medium)",
        color: "var(--slate-700)"
      }
    }, r.typeLabel || r.type), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "4px 0 0",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--fw-medium)",
        color: "var(--slate-900)"
      }
    }, r.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "2px 0 0",
        fontSize: "var(--text-xs)",
        color: "var(--slate-600)",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
      }
    }, r.description)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-xs)",
        color: "var(--slate-500)"
      }
    }, r.dateLabel), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: "var(--fw-medium)",
        color: "var(--blue-700)"
      }
    }, "Open")));
  })));
}
Object.assign(__ds_scope, { RemindersCarousel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/RemindersCarousel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/dashboard.jsx
try { (() => {
/* Higher Development — CRM dashboard portal surfaces.
   Recreates the white-label staff dashboard (portal theme, sidebar shell). */
const DS = window.HigherDevelopmentDesignSystem_76537a;
const {
  Button,
  Card,
  Field,
  Badge,
  Avatar,
  StatCard,
  SidebarLink
} = DS;
function svgFromNode(nodes, size, color) {
  const kids = nodes.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ")}/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${kids}</svg>`;
}
function Icon({
  name,
  size = 18,
  color = "currentColor",
  style
}) {
  const n = window.lucide && lucide.icons[name];
  if (!Array.isArray(n)) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: svgFromNode(n, size, color)
    }
  });
}

/* ---------- Login ---------- */
function Login({
  onSignIn
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "var(--portal-wash)",
      display: "flex",
      alignItems: "center",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 1000,
      margin: "0 auto",
      padding: "48px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 32,
      borderRadius: "var(--radius-2xl)",
      border: "1px solid rgba(255,255,255,0.7)",
      background: "rgba(255,255,255,0.85)",
      padding: 32,
      boxShadow: "var(--shadow-modal)",
      backdropFilter: "blur(16px)"
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--radius-xl)",
      background: "linear-gradient(135deg,var(--slate-900),var(--slate-800),var(--blue-900))",
      color: "#fff",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "",
    style: {
      height: 44,
      width: 44,
      borderRadius: 12,
      background: "rgba(255,255,255,0.9)",
      padding: 4
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.2em",
      color: "var(--blue-100)"
    }
  }, "Education & visa platform"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600
    }
  }, "Higher Development"))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: "-0.01em",
      margin: 0
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--blue-100)"
    }
  }, "Sign in to manage clients, pipelines, communication, documents, and reporting in one place."), /*#__PURE__*/React.createElement("ul", {
    style: {
      marginTop: 24,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: 8
    }
  }, ["Role-based dashboards for Admin, Agent & Case Manager", "Structured follow-up from inquiry to visa stage", "Centralized communication and reporting"].map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      borderRadius: "var(--radius-md)",
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.1)",
      padding: "10px 12px",
      fontSize: 13.5,
      color: "var(--blue-50)"
    }
  }, f)))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--slate-200)",
      background: "#fff",
      padding: 32,
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--blue-600)"
    }
  }, "Team Login"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "4px 0 0",
      fontSize: 24,
      fontWeight: 600,
      color: "var(--slate-900)"
    }
  }, "Sign in to Client CRM"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: 14,
      color: "var(--text-body)"
    }
  }, "Use your staff credentials."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSignIn();
    },
    style: {
      marginTop: 20,
      display: "grid",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    type: "email",
    defaultValue: "agent@demo.local",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    type: "password",
    defaultValue: "DemoPass123!",
    required: true
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit",
    style: {
      width: "100%"
    }
  }, "Sign in")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--blue-100)",
      background: "var(--blue-50)",
      padding: "10px 12px",
      fontSize: 12,
      color: "var(--slate-700)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 600,
      color: "var(--blue-700)"
    }
  }, "Demo login"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0"
    }
  }, "agent@demo.local \xB7 DemoPass123!"))))));
}

/* ---------- Shell ---------- */
const TABS = [["overview", "Overview", "LayoutDashboard", null], ["cases", "Cases", "FolderKanban", 128], ["visa", "Visa Outcomes", "ShieldCheck", 12], ["tasks", "Tasks", "ClipboardList", 7], ["team", "Team & Operations", "Users", null]];
function Sidebar({
  tab,
  setTab
}) {
  const railPad = "0.75rem";
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      width: "16rem",
      background: "var(--surface-glass)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(226,232,240,0.55)",
      borderLeft: "none",
      display: "flex",
      flexDirection: "column",
      zIndex: 45,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: railPad,
      borderBottom: "1px solid rgba(226,232,240,0.55)",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Agent Demo",
    size: "md",
    style: {
      background: "linear-gradient(180deg, #00B1E7, #28211a)",
      color: "#FFFFFF"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: "var(--slate-900)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, "Agent Demo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--slate-500)"
    }
  }, "agent@demo.local"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      marginTop: 5,
      border: "1px solid rgba(37,99,235,0.18)",
      borderRadius: 999,
      background: "rgba(239,246,255,0.9)",
      padding: "2px 8px",
      color: "var(--blue-700)",
      fontSize: 10,
      fontWeight: 800
    }
  }, "Agent"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: railPad,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, TABS.map(([id, label, icon, count]) => /*#__PURE__*/React.createElement(SidebarLink, {
    key: id,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 18
    }),
    label: label,
    count: count,
    active: tab === id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setTab(id);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: railPad,
      borderTop: "1px solid rgba(226,232,240,0.55)",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement(SidebarLink, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "Home",
      size: 18
    }),
    label: "My Dashboard",
    href: "#",
    onClick: e => e.preventDefault()
  })));
}
function Topbar({
  onSignOut
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 40,
      borderBottom: "1px solid rgba(226,232,240,0.8)",
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(16px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "14px 24px 14px 17rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "",
    style: {
      height: 40,
      width: 40,
      borderRadius: 12,
      border: "1px solid var(--slate-200)",
      background: "#fff",
      padding: 4
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--slate-900)"
    }
  }, "Higher Development"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--slate-600)"
    }
  }, "Signed in as agent@demo.local")), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 4,
      borderRadius: 999,
      border: "1px solid var(--blue-200)",
      background: "var(--blue-50)",
      padding: "4px 10px",
      fontSize: 11,
      fontWeight: 600,
      color: "var(--blue-700)"
    }
  }, "Agent")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 6,
      border: "1px solid var(--slate-300)",
      borderRadius: "var(--radius-md)",
      background: "#fff",
      padding: "8px 12px",
      color: "var(--slate-500)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Search",
    size: 15
  }), " Search clients\u2026"), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    size: "sm"
  }, "Home"), /*#__PURE__*/React.createElement("button", {
    style: {
      position: "relative",
      border: "1px solid var(--slate-300)",
      borderRadius: "var(--radius-md)",
      background: "#fff",
      padding: 8,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Bell",
    size: 16,
    color: "var(--slate-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -4,
      right: -4,
      width: 16,
      height: 16,
      borderRadius: 999,
      background: "var(--rose-500)",
      color: "#fff",
      fontSize: 9,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "3")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onSignOut
  }, "Sign out"))));
}

/* ---------- Overview tab ---------- */
const STAGES = [["Consultation & Documentation", 24, "neutral"], ["Enrolment Process", 18, "info"], ["Conditional Offer Letter", 12, "info"], ["Tuition Fee & OSHC Paid", 9, "payment"], ["GTE Process", 7, "progress"], ["Visa Lodgment", 11, "progress"], ["Visa Grant", 32, "success"], ["Visa Refused", 4, "danger"]];
function Overview() {
  const total = STAGES.reduce((s, [, c]) => s + c, 0);
  const max = Math.max(...STAGES.map(([, c]) => c));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "3px solid var(--slate-200)",
      background: "#fff",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--slate-900)"
    }
  }, "New Inquiries"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontSize: 12,
      color: "var(--slate-600)"
    }
  }, "4 new in the last 24 hours \u2014 claim to start a case.")), /*#__PURE__*/React.createElement(Badge, {
    tone: "danger",
    dot: true
  }, "4 new")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      gap: 12,
      overflowX: "auto"
    }
  }, [["Pema Choden", "Thimphu, BT"], ["Ugyen Tshering", "Paro, BT"], ["Dechen Wangmo", "Perth, AU"], ["Jigme Dorji", "Thimphu, BT"]].map(([n, loc]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      minWidth: 200,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--slate-200)",
      background: "var(--slate-50)",
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--slate-900)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--slate-500)"
    }
  }, loc))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    style: {
      marginTop: 10,
      width: "100%"
    }
  }, "Claim inquiry"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "3px solid var(--slate-200)",
      background: "#fff",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--slate-900)"
    }
  }, "Risk Board"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 12px",
      fontSize: 12,
      color: "var(--slate-600)"
    }
  }, "High-priority cases needing intervention."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 12
    }
  }, [["Visa Expiring < 30d", ["Sonam P.", "Tashi D."], "danger"], ["Missing Follow-up", ["Karma W."], "progress"], ["Pending Approvals", ["Pema C.", "Ugyen T."], "info"]].map(([t, items, tone]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--slate-200)",
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: "var(--slate-700)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "grid",
      gap: 4
    }
  }, items.map(n => /*#__PURE__*/React.createElement(Badge, {
    key: n,
    tone: tone
  }, n))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateRows: "1fr 1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    title: "Pending Approvals",
    value: "6",
    hint: "2 contracts \xB7 3 docs \xB7 1 invoice",
    style: {
      border: "3px solid var(--slate-200)"
    }
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Unassigned Cases",
    value: "14",
    hint: "of 128 active",
    style: {
      border: "3px solid var(--slate-200)"
    }
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Overdue Follow-ups",
    value: "9",
    delta: "urgent",
    deltaTone: "down",
    style: {
      border: "3px solid var(--slate-200)"
    }
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "3px solid var(--slate-200)",
      background: "#fff",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--slate-900)"
    }
  }, "Case Stage Funnel"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 14px",
      fontSize: 12,
      color: "var(--slate-600)"
    }
  }, total, " active cases across the workflow."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 8
    }
  }, STAGES.map(([label, count, tone]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: "grid",
      gridTemplateColumns: "220px 1fr 56px",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--slate-700)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 22,
      borderRadius: 6,
      background: "var(--slate-100)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${count / max * 100}%`,
      height: "100%",
      borderRadius: 6,
      background: "linear-gradient(90deg, #4fb3d1 0%, #008DB9 55%, #005f7d 100%)",
      backgroundSize: `${max / count * 100}% 100%`
    }
  })), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    style: {
      justifySelf: "end"
    }
  }, count))))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "3px solid var(--slate-200)",
      background: "#fff",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--slate-900)"
    }
  }, "Manager Analytics"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontSize: 12,
      color: "var(--slate-600)"
    }
  }, "Weekly operational snapshot.")), /*#__PURE__*/React.createElement(Button, {
    variant: "neutral",
    size: "sm"
  }, "Download report")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    title: "Conversion (Enrolled)",
    value: "42%",
    delta: "+6%",
    deltaTone: "up"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Pending Ratio",
    value: "18%",
    delta: "-3%",
    deltaTone: "down"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Avg Review Time",
    value: "26h"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Active Cases",
    value: "128"
  }))));
}

/* ---------- Cases tab ---------- */
const CLIENTS = [["Tenzin Dorji", "Australia · Masters IT", "Visa Lodgment", "progress", "Assigned to you"], ["Karma Wangmo", "Canada · Nursing", "Unconditional Offer Letter", "info", "Assigned to you"], ["Sonam Penjor", "Australia · MBA", "Visa Grant", "success", "Delegated: R. Sharma"], ["Pema Choden", "India · B.Tech", "Consultation & Documentation", "neutral", "Unassigned"], ["Ugyen Tshering", "Australia · Diploma", "Tuition Fee & OSHC Paid", "payment", "Assigned to you"], ["Dechen Wangmo", "Canada · PG Cert", "Visa Refused", "danger", "Delegated: A. Lama"]];
function Cases() {
  const [q, setQ] = React.useState("all");
  const filters = [["all", "All Clients"], ["mine", "My Cases"], ["unassigned", "Unassigned"], ["overdue", "Overdue"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--blue-100)",
      background: "var(--blue-50)",
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: "var(--blue-950)"
    }
  }, "Cases"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 13.5,
      color: "var(--blue-900)"
    }
  }, "Every active client \u2014 unclaimed, claimed by you, or delegated to case managers.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    title: "All Clients",
    value: "128"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "My Cases",
    value: "34"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Delegated",
    value: "12"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Pending Reviews",
    value: "21"
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Visa \u2264 90d",
    value: "8"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--slate-200)",
      background: "#fff",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 14
    }
  }, filters.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setQ(id),
    style: {
      borderRadius: 999,
      padding: "6px 14px",
      fontSize: 12.5,
      fontWeight: 600,
      cursor: "pointer",
      border: q === id ? "1px solid transparent" : "1px solid var(--slate-300)",
      background: q === id ? "var(--gradient-active)" : "#fff",
      color: q === id ? "#fff" : "var(--slate-600)"
    }
  }, label))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: "left",
      color: "var(--slate-500)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.04em"
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "8px 10px"
    }
  }, "Client"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "8px 10px"
    }
  }, "Course"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "8px 10px"
    }
  }, "Stage"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: "8px 10px"
    }
  }, "Assignment"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, CLIENTS.map(([n, course, stage, tone, asg]) => /*#__PURE__*/React.createElement("tr", {
    key: n,
    style: {
      borderTop: "1px solid var(--slate-100)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--slate-900)"
    }
  }, n))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px",
      color: "var(--slate-600)"
    }
  }, course), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: tone
  }, stage)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px",
      color: "var(--slate-600)"
    }
  }, asg), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "10px",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Open"))))))));
}

/* ---------- Tasks tab ---------- */
const TASKS = [["Collect updated passport scan", "Tenzin Dorji", "TODO", "neutral"], ["Draft SOP review notes", "Karma Wangmo", "IN_PROGRESS", "progress"], ["Confirm OSHC provider", "Ugyen Tshering", "BLOCKED", "danger"], ["Send offer acceptance reminder", "Sonam Penjor", "DONE", "success"]];
function Tasks() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    title: "Open",
    value: "7",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(StatCard, {
    title: "Completed (wk)",
    value: "15",
    style: {
      flex: 1
    }
  })), TASKS.map(([t, who, status, tone]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "var(--radius-lg)",
      border: `1px solid var(--${tone === "neutral" ? "slate" : tone === "progress" ? "amber" : tone === "danger" ? "rose" : "emerald"}-200)`,
      background: "#fff",
      padding: "12px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--slate-900)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--slate-500)"
    }
  }, "Client: ", who)), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    dot: true
  }, status.replace("_", " ")))));
}
function Placeholder({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-lg)",
      border: "1px dashed var(--slate-300)",
      background: "#fff",
      padding: 48,
      textAlign: "center",
      color: "var(--slate-500)",
      fontSize: 14
    }
  }, label, " \u2014 panel omitted from this kit sample.");
}
function Dashboard({
  onSignOut
}) {
  const [tab, setTab] = React.useState("overview");
  return /*#__PURE__*/React.createElement("div", {
    className: "portal-wash-root",
    style: {
      minHeight: "100vh",
      background: "var(--portal-wash)",
      fontFamily: "var(--font-sans)",
      color: "var(--slate-900)"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    tab: tab,
    setTab: setTab
  }), /*#__PURE__*/React.createElement(Topbar, {
    onSignOut: onSignOut
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      marginLeft: "16rem",
      padding: "24px 32px",
      maxWidth: 1400
    }
  }, tab === "overview" && /*#__PURE__*/React.createElement(Overview, null), tab === "cases" && /*#__PURE__*/React.createElement(Cases, null), tab === "tasks" && /*#__PURE__*/React.createElement(Tasks, null), tab === "visa" && /*#__PURE__*/React.createElement(Placeholder, {
    label: "Visa Outcomes"
  }), tab === "team" && /*#__PURE__*/React.createElement(Placeholder, {
    label: "Team & Operations"
  })));
}
function CRMApp() {
  const [auth, setAuth] = React.useState(false);
  return auth ? /*#__PURE__*/React.createElement(Dashboard, {
    onSignOut: () => setAuth(false)
  }) : /*#__PURE__*/React.createElement(Login, {
    onSignIn: () => setAuth(true)
  });
}
Object.assign(window, {
  CRMApp
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/tweaks-print.jsx
try { (() => {
/* Tweaks for the CRM dashboard PRINT page — expressive, feel-level controls.
   Separate defaults from the live kit: this page defaults to the Pantone Blue
   gradient wash the user requested for the printed capture. */
const PRINT_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "wash": "Pantone Blue",
  "accent": "Signature",
  "density": "comfortable"
} /*EDITMODE-END*/;

/* Workspace background washes. null = the original token value. */
const PRINT_WASHES = {
  "Pantone Blue": "linear-gradient(160deg, #66c2d9 0%, #1f9fc4 38%, #008DB9 68%, #00546e 100%)",
  "Pantone Blue Soft": "radial-gradient(circle at 12% 8%, rgba(0,177,231,0.28), transparent 42%)," + "radial-gradient(circle at 88% 18%, rgba(0,141,185,0.22), transparent 45%)," + "#f0f9fc",
  "Portal Wash": null,
  "White": "#ffffff"
};

/* Brand accent — a white-label re-skin preview. */
const PRINT_ACCENTS = {
  Signature: null,
  "Pantone Blue": {
    primary: "linear-gradient(90deg, #008DB9, #00668a)",
    active: "linear-gradient(135deg, #008DB9, #004f68)",
    glow: "0 4px 14px rgba(0, 141, 185, 0.35)"
  },
  Royal: {
    primary: "linear-gradient(90deg, #2563eb, #7c3aed)",
    active: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
    glow: "0 4px 14px rgba(124, 58, 237, 0.35)"
  },
  Emerald: {
    primary: "linear-gradient(90deg, #059669, #0d9488)",
    active: "linear-gradient(135deg, #047857, #0f766e)",
    glow: "0 4px 14px rgba(5, 150, 105, 0.35)"
  }
};
function DashboardPrintTweaks() {
  const [t, setTweak] = useTweaks(PRINT_TWEAK_DEFAULTS);
  React.useEffect(() => {
    const r = document.documentElement.style;
    const wash = PRINT_WASHES[t.wash];
    if (wash) r.setProperty("--portal-wash", wash);else r.removeProperty("--portal-wash");
    const a = PRINT_ACCENTS[t.accent];
    if (a) {
      r.setProperty("--gradient-primary", a.primary);
      r.setProperty("--gradient-active", a.active);
      r.setProperty("--shadow-cta", a.glow);
    } else {
      r.removeProperty("--gradient-primary");
      r.removeProperty("--gradient-active");
      r.removeProperty("--shadow-cta");
    }
    document.body.dataset.density = t.density;
  }, [t]);
  return /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Workspace"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Background wash",
    value: t.wash,
    options: ["Pantone Blue", "Pantone Blue Soft", "Portal Wash", "White"],
    onChange: v => setTweak("wash", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Brand"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Accent (white-label)",
    value: t.accent,
    options: ["Signature", "Pantone Blue", "Royal", "Emerald"],
    onChange: v => setTweak("accent", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Layout"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Density",
    value: t.density,
    options: ["comfortable", "compact"],
    onChange: v => setTweak("density", v)
  }));
}
Object.assign(window, {
  DashboardPrintTweaks
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/tweaks-print.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/tweaks.jsx
try { (() => {
/* Tweaks for the CRM dashboard kit — expressive, feel-level controls. */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "wash": "White",
  "accent": "Signature",
  "density": "comfortable"
} /*EDITMODE-END*/;

/* Workspace background washes. null = the original token value. */
const WASHES = {
  "White": "#ffffff",
  "Pantone Blue": "radial-gradient(circle at 10% 10%, rgba(244,63,94,0.18), transparent 35%)," + "radial-gradient(circle at 90% 20%, rgba(96,165,250,0.25), transparent 40%)," + "#001489",
  "Portal Wash": null,
  "Slate Dusk": "radial-gradient(circle at 10% 10%, rgba(244,63,94,0.10), transparent 35%)," + "radial-gradient(circle at 90% 20%, rgba(59,130,246,0.16), transparent 40%)," + "#0f172a"
};

/* Brand accent — a white-label re-skin preview. Overrides the CTA gradient,
   the sidebar-active gradient, and the CTA glow. null = signature rose→blue. */
const ACCENTS = {
  Signature: null,
  Royal: {
    primary: "linear-gradient(90deg, #2563eb, #7c3aed)",
    active: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
    glow: "0 4px 14px rgba(124, 58, 237, 0.35)"
  },
  Emerald: {
    primary: "linear-gradient(90deg, #059669, #0d9488)",
    active: "linear-gradient(135deg, #047857, #0f766e)",
    glow: "0 4px 14px rgba(5, 150, 105, 0.35)"
  },
  "Pantone Blue": {
    primary: "linear-gradient(90deg, #008DB9, #00668a)",
    active: "linear-gradient(135deg, #008DB9, #004f68)",
    glow: "0 4px 14px rgba(0, 141, 185, 0.35)"
  }
};
function DashboardTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const r = document.documentElement.style;
    const wash = WASHES[t.wash];
    if (wash) r.setProperty("--portal-wash", wash);else r.removeProperty("--portal-wash");
    const a = ACCENTS[t.accent];
    if (a) {
      r.setProperty("--gradient-primary", a.primary);
      r.setProperty("--gradient-active", a.active);
      r.setProperty("--shadow-cta", a.glow);
    } else {
      r.removeProperty("--gradient-primary");
      r.removeProperty("--gradient-active");
      r.removeProperty("--shadow-cta");
    }
    document.body.dataset.density = t.density;
  }, [t]);
  return /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Workspace"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Background wash",
    value: t.wash,
    options: ["White", "Pantone Blue", "Portal Wash", "Slate Dusk"],
    onChange: v => setTweak("wash", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Brand"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Accent (white-label)",
    value: t.accent,
    options: ["Signature", "Royal", "Emerald", "Pantone Blue"],
    onChange: v => setTweak("accent", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Layout"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Density",
    value: t.density,
    options: ["comfortable", "compact"],
    onChange: v => setTweak("density", v)
  }));
}
Object.assign(window, {
  DashboardTweaks
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/tweaks.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/sections.jsx
try { (() => {
/* Higher Development — Marketing site surfaces.
   Recreates the study-abroad consultancy homepage. Composes DS primitives. */
const DS = window.HigherDevelopmentDesignSystem_76537a;
const {
  Button,
  Card,
  SectionHeading,
  Field,
  Badge,
  Avatar
} = DS;
function svgFromNode(nodes, size, color) {
  const kids = nodes.map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ")}/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${kids}</svg>`;
}
function Icon({
  name,
  size = 18,
  color = "currentColor",
  style
}) {
  const n = window.lucide && lucide.icons[name];
  if (!Array.isArray(n)) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: svgFromNode(n, size, color)
    }
  });
}
const NAV = ["Services", "About", "Destinations", "Enquire", "Testimonials", "Contact"];
function HomeNav({
  scrolled,
  onNav
}) {
  const over = !scrolled;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 40,
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      borderBottom: scrolled ? "1px solid var(--slate-200)" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "var(--transition-base)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100% - 3.5rem, 1180px)",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: onNav,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "",
    style: {
      height: 36,
      width: 36,
      objectFit: "contain",
      borderRadius: 8
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.22em",
      color: over ? "var(--rose-300)" : "var(--rose-500)"
    }
  }, "Overseas Education & Visa"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.05rem",
      fontWeight: 800,
      letterSpacing: "-0.01em",
      color: over ? "#fff" : "var(--blue-900)",
      textShadow: over ? "0 1px 4px rgba(0,0,0,0.35)" : "none"
    }
  }, "Higher Development"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      borderRadius: 999,
      padding: "4px 6px",
      border: over ? "1px solid rgba(255,255,255,0.2)" : "1px solid var(--slate-200)",
      background: over ? "rgba(255,255,255,0.1)" : "rgba(248,250,252,0.8)",
      backdropFilter: "blur(8px)"
    }
  }, NAV.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#" + l.toLowerCase(),
    onClick: onNav,
    style: {
      borderRadius: 999,
      padding: "6px 14px",
      fontSize: "0.8125rem",
      fontWeight: 500,
      textDecoration: "none",
      color: over ? "rgba(255,255,255,0.9)" : "var(--slate-600)",
      transition: "var(--transition-fast)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = over ? "rgba(255,255,255,0.15)" : "#fff";
      e.currentTarget.style.color = over ? "#fff" : "var(--blue-900)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = over ? "rgba(255,255,255,0.9)" : "var(--slate-600)";
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#login",
    onClick: onNav,
    style: {
      borderRadius: 999,
      padding: "8px 16px",
      fontSize: "0.875rem",
      fontWeight: 500,
      textDecoration: "none",
      border: over ? "1px solid rgba(255,255,255,0.4)" : "1px solid var(--slate-300)",
      color: over ? "#fff" : "var(--slate-700)"
    }
  }, "Sign In"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    pill: true,
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 14
    })
  }, "Enquire now"))));
}
const SPIN = ["confidence", "clarity", "speed", "expert support"];
function Hero() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % SPIN.length), 2200);
    return () => clearInterval(t);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--blue-900)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/homepage_bg.png",
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--gradient-hero)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom, transparent, transparent, rgba(30,58,138,0.4))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      width: "min(100% - 3.5rem, 1180px)",
      margin: "0 auto",
      padding: "150px 0 96px",
      display: "grid",
      gridTemplateColumns: "5fr 7fr",
      gap: 40,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.05rem",
      lineHeight: 1.6,
      color: "rgba(219,234,254,0.9)",
      maxWidth: "34ch"
    }
  }, "We help students choose the right course, prepare stronger applications, and move through visa steps with", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--rose-200,#fecdd3)"
    }
  }, SPIN[i]), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: "flex",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 16
    })
  }, "Enquire now"), /*#__PURE__*/React.createElement("a", {
    href: "#process",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      borderRadius: 4,
      border: "1px solid rgba(255,255,255,0.4)",
      background: "rgba(255,255,255,0.1)",
      padding: "0.875rem 1.75rem",
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#fff",
      textDecoration: "none",
      backdropFilter: "blur(4px)"
    }
  }, "See how it works")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      fontSize: "0.75rem",
      fontWeight: 500,
      color: "rgba(219,234,254,0.8)"
    }
  }, "1,000+ students guided \xB7 95%+ visa success \xB7 2 offices \xB7 1\u20132 day response"), /*#__PURE__*/React.createElement("ul", {
    style: {
      marginTop: 20,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      listStyle: "none",
      padding: 0
    }
  }, ["Course-country strategy mapped to your profile", "Document quality checks and SOP support", "Visa guidance with milestone tracking", "End-to-end support to departure"].map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: {
      display: "flex",
      gap: 8,
      fontSize: "0.875rem",
      color: "rgba(239,246,255,0.9)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 16,
    color: "var(--rose-300)",
    style: {
      flex: "0 0 auto",
      marginTop: 2
    }
  }), b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "var(--text-hero)",
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: "-0.01em",
      color: "#fff"
    }
  }, "Making Your Study Abroad", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--rose-400)"
    }
  }, "Journey a Success Story")))));
}
const SERVICES = [["GraduationCap", "Student Admission", "Course matching and applications through to your offer letter."], ["FileCheck2", "Visa Application", "Document checks and lodgement support for student visas."], ["HeartPulse", "Health Insurance", "OSHC arranged to match your course and visa requirements."], ["BookOpen", "PTE / IELTS Prep", "Coaching and practice to hit your target test scores."], ["Home", "Accommodation", "Safe housing options near campus, within your budget."], ["BadgeCheck", "Skills Assessment", "Authority requirements and documents for recognition pathways."]];
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      padding: "clamp(3.5rem,8vw,6.5rem) 0",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100% - 3.5rem, 1180px)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "What We Do",
    title: "Services that carry you end to end",
    subtitle: "From first inquiry to departure, one accountable team handles every step."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 20
    }
  }, SERVICES.map(([ic, t, d]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    hover: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--rose-50)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22,
    color: "var(--rose-500)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 17,
      fontWeight: 700,
      color: "var(--text-heading)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 14,
      lineHeight: 1.55,
      color: "var(--text-body)"
    }
  }, d))))));
}
const STEPS = [["01", "Submit Inquiry", "Tell us your profile and goals through a quick form."], ["02", "Strategy Call", "Get course-country options with realistic timeline and costs."], ["03", "Apply + Prepare", "We guide documents, SOP, and institution submissions."], ["04", "Visa + Departure", "Final visa stage support and pre-departure checklist."]];
function Process() {
  return /*#__PURE__*/React.createElement("section", {
    id: "process",
    style: {
      padding: "clamp(3.5rem,8vw,6.5rem) 0",
      background: "var(--slate-50)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100% - 3.5rem, 1180px)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "How It Works",
    title: "A clear four-step path"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20
    }
  }, STEPS.map(([n, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      position: "relative",
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: 22,
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 30,
      fontWeight: 700,
      background: "var(--gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "8px 0 0",
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-heading)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13.5,
      lineHeight: 1.55,
      color: "var(--text-body)"
    }
  }, d))))));
}
const DEST = [["Australia", "🇦🇺", "Globally recognised qualifications, post-study work rights, and strong graduate outcomes.", ["Top-ranked universities", "Post-study work visa", "Multicultural society"]], ["Canada", "🇨🇦", "High quality education with excellent student support and PR pathways.", ["World-class institutions", "PR pathway options", "Safe and inclusive"]], ["India", "🇮🇳", "On-the-ground counselling and full application support for students from Bhutan.", ["Free profile assessment", "Admission & visa docs", "PTE / IELTS support"]]];
function Destinations() {
  return /*#__PURE__*/React.createElement("section", {
    id: "destinations",
    style: {
      padding: "clamp(3.5rem,8vw,6.5rem) 0",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100% - 3.5rem, 1180px)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Where You Can Go",
    title: "Destinations we specialise in"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 20
    }
  }, DEST.map(([c, f, d, hl]) => /*#__PURE__*/React.createElement(Card, {
    key: c,
    hover: true,
    padded: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34
    }
  }, f), /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, "Study Destination")), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "12px 0 0",
      fontSize: 20,
      fontWeight: 700,
      color: "var(--text-heading)"
    }
  }, c), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 12px",
      fontSize: 14,
      lineHeight: 1.55,
      color: "var(--text-body)"
    }
  }, d), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: 6
    }
  }, hl.map(h => /*#__PURE__*/React.createElement("li", {
    key: h,
    style: {
      display: "flex",
      gap: 8,
      fontSize: 13,
      color: "var(--slate-700)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 15,
    color: "var(--emerald-500)",
    style: {
      flex: "0 0 auto",
      marginTop: 1
    }
  }), h)))))))));
}
const QUOTES = [["Tenzin D.", "Bhutan → Australia", "Higher Development made my study abroad journey completely stress-free. From course selection to visa approval, they handled everything with incredible care."], ["Karma W.", "Bhutan → Canada", "The team was always available to answer my questions. My student visa was approved without issues thanks to their thorough preparation."], ["Sonam P.", "Bhutan → Australia", "Professional, honest, and genuinely supportive. I would not have gotten into my first-choice university without their guidance."]];
function Testimonials() {
  return /*#__PURE__*/React.createElement("section", {
    id: "testimonials",
    style: {
      padding: "clamp(3.5rem,8vw,6.5rem) 0",
      background: "var(--slate-50)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100% - 3.5rem, 1180px)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Testimonials",
    title: "Students who made it"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 20
    }
  }, QUOTES.map(([n, loc, q]) => /*#__PURE__*/React.createElement(Card, {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      marginBottom: 12
    }
  }, Array.from({
    length: 5
  }).map((_, k) => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "Star",
    size: 16,
    color: "var(--amber-500)"
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 16px",
      fontSize: 14.5,
      lineHeight: 1.6,
      color: "var(--slate-700)"
    }
  }, "\u201C", q, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: n,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text-heading)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, loc))))))));
}
function Contact({
  sent,
  onSubmit
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: "clamp(3.5rem,8vw,6.5rem) 0",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100% - 3.5rem, 1180px)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    id: "enquire"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "left",
    eyebrow: "Enquire",
    title: "Start with a free assessment",
    subtitle: "Tell us your goals and a counselor will respond within 1\u20132 days."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "grid",
      gap: 12
    }
  }, [["Bhutan Office", "Thimphu, Kingdom of Bhutan", "Mon–Fri, 9:00 AM – 5:00 PM (BTT)"], ["Australia Office", "Osborne Park, Perth, WA 6017", "Mon–Fri, 9:00 AM – 5:00 PM (AWST)"]].map(([t, a, h]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 12,
      padding: 14,
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-default)",
      background: "var(--slate-50)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "MapPin",
    size: 18,
    color: "var(--rose-500)",
    style: {
      flex: "0 0 auto",
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text-heading)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-body)"
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, h)))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 24
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 999,
      background: "var(--emerald-50)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 28,
    color: "var(--emerald-500)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "14px 0 4px",
      color: "var(--text-heading)"
    }
  }, "Enquiry received"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: "var(--text-body)"
    }
  }, "A counselor will be in touch within 1\u20132 days.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: onSubmit,
    style: {
      display: "grid",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name",
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    type: "email",
    placeholder: "name@example.com",
    required: true
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Destination",
    as: "select",
    options: ["Australia", "Canada", "India"]
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Message",
    as: "textarea",
    placeholder: "Tell us about your goals."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 15
    })
  }, "Submit enquiry")))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "linear-gradient(135deg,var(--slate-900),var(--blue-950))",
      color: "#fff",
      padding: "40px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100% - 3.5rem, 1180px)",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "",
    style: {
      height: 40,
      width: 40,
      borderRadius: 8,
      background: "#fff",
      padding: 4
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.22em",
      color: "var(--rose-300)"
    }
  }, "Overseas Education & Visa"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800
    }
  }, "Higher Development"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, ["QEAC Certified", "PIER Registered", "Licensed Consultants"].map(a => /*#__PURE__*/React.createElement("span", {
    key: a,
    style: {
      fontSize: 12,
      padding: "5px 12px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.2)",
      color: "rgba(255,255,255,0.85)"
    }
  }, a)))));
}
function MarketingSite() {
  const [scrolled, setScrolled] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 24);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const onNav = e => {
    const id = e.currentTarget.getAttribute("href");
    if (id && id.startsWith("#")) {
      e.preventDefault();
      const t = ref.current.querySelector(id);
      if (t) ref.current.scrollTo({
        top: t.offsetTop - 60,
        behavior: "smooth"
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      height: "100vh",
      overflowY: "auto",
      background: "#fff",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(HomeNav, {
    scrolled: scrolled,
    onNav: onNav
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Process, null), /*#__PURE__*/React.createElement(Destinations, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Contact, {
    sent: sent,
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }), /*#__PURE__*/React.createElement(Footer, null));
}
Object.assign(window, {
  MarketingSite
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.HeroPanel = __ds_scope.HeroPanel;

__ds_ns.FilterButton = __ds_scope.FilterButton;

__ds_ns.SidebarLink = __ds_scope.SidebarLink;

__ds_ns.StageFilterChip = __ds_scope.StageFilterChip;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.BulkActionBar = __ds_scope.BulkActionBar;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ChatPopup = __ds_scope.ChatPopup;

__ds_ns.InfoBanner = __ds_scope.InfoBanner;

__ds_ns.NotificationsBell = __ds_scope.NotificationsBell;

__ds_ns.RemindersCarousel = __ds_scope.RemindersCarousel;

})();
