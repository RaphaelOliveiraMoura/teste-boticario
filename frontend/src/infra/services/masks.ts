import { Masker } from "@/domain/services/masker";

import { mask } from "./masker-lib-vanilla";

export const justNumbers: Masker = (value) =>
  value?.replace?.(/\D/gi, "") ?? "";

export const landlinePhoneMask: Masker = mask("(99) 9999-9999");
export const cellphoneMask: Masker = mask("(99) 9 9999-9999");
export const phoneMask: Masker = (value: string) =>
  justNumbers(value).length >= 11
    ? cellphoneMask(value)
    : landlinePhoneMask(value);

export const dateMask: Masker = mask("99/99/9999");
export const cepMask: Masker = mask("99.999-999");
export const cpfMask: Masker = mask("999.999.999-99");
export const cnpjMask: Masker = mask("99.999.999/9999-99");

export const onlyText: Masker = (value) =>
  value?.replace?.(/[^a-zA-Z0-9À-ÖØ-öø-ÿ\s]/g, "")?.replace(/[^\D]/gi, "");

export const onlyTextWithLimit = (limit: number) => (value: string) =>
  onlyText(value)?.substring(0, limit) ?? "";

export const limitText = (limit: number) => (value: string) =>
  value?.substring(0, limit) ?? "";
