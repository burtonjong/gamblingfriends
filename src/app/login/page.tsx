import AuthClient from "@/components/login/AuthClient";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthClient />
    </div>
  );
}
