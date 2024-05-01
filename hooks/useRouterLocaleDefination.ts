import { en } from "locales/en";
import { ru } from "locales/ru";
import { useRouter } from "next/router";


export function useRouterLocaleDefination() {
  const router = useRouter();
  return router.locale === 'en' ? en: ru;
}