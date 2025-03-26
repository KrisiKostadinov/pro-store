import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      {children}
    </div>
  );
}
