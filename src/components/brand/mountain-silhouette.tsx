type MountainSilhouetteProps = {
  variant?: "hero" | "compact";
};

export function MountainSilhouette({ variant = "hero" }: MountainSilhouetteProps) {
  if (variant === "compact") {
    return (
      <svg
        className="mtns"
        height="40"
        width="100%"
        viewBox="0 0 860 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 L120,10 L220,30 L340,4 L460,32 L590,8 L700,28 L860,14 L860,40 Z"
          fill="#000"
        />
      </svg>
    );
  }

  return (
    <svg
      className="mtns"
      height="54"
      width="100%"
      viewBox="0 0 860 54"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,54 L90,16 L150,38 L240,6 L330,40 L430,12 L520,36 L610,8 L700,34 L790,18 L860,30 L860,54 Z"
        fill="#0E1119"
      />
    </svg>
  );
}
