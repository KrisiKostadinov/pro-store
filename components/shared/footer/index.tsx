import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  const cuurentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 flex justify-center">
        {cuurentYear} {APP_NAME}. Всички права запазени
      </div>
    </footer>
  );
}
