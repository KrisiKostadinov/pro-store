"use client";

import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const showToast = (
  message: string,
  description: string = "",
  actionUrl = "",
  actionLabel = "Преглед",
) => {
  toast.success(message, {
    duration: 3000,
    description: description,
    action: (
      <Button variant="outline" asChild>
        <Link href={actionUrl}>{actionLabel}</Link>
      </Button>
    ),
  });
};

export const showErrorToast = (
  message: string,
  description: string = "",
  actionUrl = "",
  actionLabel = "Опитай отново"
) => {
  toast.error(message, {
    duration: 3000,
    description: description,
    action: actionUrl ? (
      <Button variant="outline" asChild>
        <Link href={actionUrl}>{actionLabel}</Link>
      </Button>
    ) : null,
    style: {
      backgroundColor: "#ffdddd",
      border: "1px solid #ff4d4f",
      color: "#d32f2f",
    },
  });
};
