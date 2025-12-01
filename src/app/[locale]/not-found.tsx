import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  const t = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-bold text-mpc-green-500">404</h1>
      <p className="mb-8 text-xl text-muted-foreground">{t("error")}</p>
      <Button asChild>
        <Link href="/">{t("backToHome")}</Link>
      </Button>
    </div>
  );
}
