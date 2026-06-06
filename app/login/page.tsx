import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Log in", path: "/login", index: false });

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <div className="container-app py-16">
      <div className="mx-auto max-w-md">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
