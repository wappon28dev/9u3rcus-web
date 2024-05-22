import { getLocalStorageKey } from "@client/lib/consts";
import type { ContactFormData } from "@client/lib/services/contact";
import { persistentMap } from "@nanostores/persistent";
import { atom } from "nanostores";

export const $hamburgerMenuOpened = atom<boolean>(false);
export const $contactFormData = persistentMap<ContactFormData>(
  getLocalStorageKey("contactFormData", true),
  {
    name: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  },
);
