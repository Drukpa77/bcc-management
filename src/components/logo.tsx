import Image from "next/image";

export const BRAND_NAME = "Bhutanese Basketball Cup";
export const LOGO_SRC = "/Logo.png";

export function Logo({
  className = "h-10 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt={BRAND_NAME}
      width={447}
      height={559}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}
