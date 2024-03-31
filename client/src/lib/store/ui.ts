import { persistentMap } from "@nanostores/persistent";
import { atom } from "nanostores";
import { getLocalStorageKey } from "../consts";
import type { ContactFormData } from "../services/contact";

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
