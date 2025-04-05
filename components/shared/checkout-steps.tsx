"use client";

import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  current: number;
};

export default function CheckoutSteps({ current = 0 }: Props) {
  const steps = [
    "Влизане в профила",
    "Адрес за доставка",
    "Метод на плащане",
    "Завършване на поръчката",
  ];

  return (
    <div className="flex justify-center items-center flex-col md:flex-row space-x-2 space-y-2 my-10">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              "p-2 w-56 rounded-full text-center text-sm",
              index === current && "bg-secondary"
            )}
          >
            {step}
          </div>
          {step !== "Завършване на поръчката" && (
            <hr className="w-16 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
