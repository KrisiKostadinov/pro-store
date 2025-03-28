export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "MISSISROSE.COM";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_NAME || "Ръчно изработени подаръци и материали за подаръци на достъпни цени. Открий оригинални предложения, бърза доставка и персонализирани изненади за любимите хора.";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 10;

export const signInDefaultValues = {
    email: "",
    password: "",
}

export const signUpDefaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}
