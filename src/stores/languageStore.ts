import { decorate, observable, action } from "mobx";

export const languages = ["en", "fr", "de"] as const;

export type Language = typeof languages[number];

export class LanguageStore {
  language: Language = "de";

  setLanguage: (language: Language) => void = (language: Language) => {
    this.language = language;
  };
}

decorate(LanguageStore, {
  language: observable,
  setLanguage: action,
});

export const languageStore = new LanguageStore();
