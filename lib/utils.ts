import { clsx, type ClassValue } from "clsx"
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "BGN") {
  const formatter = new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

export function createSlug(text: string) {
  const cyrillicToLatinMap: { [key: string]: string } = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht', ъ: 'a', ь: '', ю: 'yu', я: 'ya', А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ж: 'Zh', З: 'Z', И: 'I', Й: 'Y', К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F', Х: 'H', Ц: 'Ts', Ч: 'Ch', Ш: 'Sh', Щ: 'Sht', Ъ: 'A', Ь: '', Ю: 'Yu', Я: 'Ya' };

  return text
    .split('')
    .map(char => cyrillicToLatinMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function handleError(error: unknown, _values: Record<string, unknown> = {}, message: string = "Неочаквана грешка.") {
  if (isRedirectError(error)) {
    throw error;
  }

  if (error instanceof ZodError) {
    return {
      success: false,
      messages: error.errors.map((x) => x.message),
      values: _values,
    };
  }

  return {
    success: false,
    message: error instanceof Error ? error.message : message,
    values: _values,
  };
}

export function formatNumberWithDecimal(value: number): string {
  return value.toFixed(2);
}

export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Стойността не е 'number' или 'string'.");
  }
}
