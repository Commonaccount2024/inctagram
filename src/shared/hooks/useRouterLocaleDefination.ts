import { en } from "@/shared/locales/en";
import { ru } from "@/shared/locales/ru";
import { useRouter } from "next/router";


export function useRouterLocaleDefination() {
  const router = useRouter();
  return router.locale === 'en' ? en: ru;
}