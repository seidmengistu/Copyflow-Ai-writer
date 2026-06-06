import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Sign up free", path: "/signup", index: false });

export default async function SignupPage() {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <div className="container-app py-16">
      <div className="mx-auto max-w-md">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
