import type { Metadata } from "next";

const frame = {
  version: "1",
  imageUrl: "https://password-guesser.vercel.app/og.svg",
  button: {
    title: "Play Password Guesser",
    action: {
      type: "launch_frame",
      name: "Password Guesser",
      url: "https://password-guesser.vercel.app/mini",
      splashImageUrl: "https://password-guesser.vercel.app/splash.svg",
      splashBackgroundColor: "#0052f"
    }
  }
};

export const metadata: Metadata = {
  title: "Password Guesser - Mini App",
  description: "Test your password skills with this challenging guessing game",
  openGraph: {
    title: "Password Guesser - Mini App",
    description: "A challenging password guessing game optimized for Farcaster Mini Apps",
    images: ["https://password-guesser.vercel.app/og.svg"],
  },
  other: {
    "fc:miniapp": JSON.stringify(frame)
  }
};

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 