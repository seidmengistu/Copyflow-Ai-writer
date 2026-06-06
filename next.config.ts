import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Prisma + bcrypt out of the server bundle (they use Node built-ins).
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;
