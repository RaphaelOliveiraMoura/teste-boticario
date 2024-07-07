"use client";

import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldPathByValue, FieldValues, UseFormReturn } from "react-hook-form";

import { Masker } from "@/domain/services/masker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/shadcn/form";
import { Input } from "@/ui/shadcn/input";

type Props<TFieldValues extends FieldValues, TName> = {
  name: TName;
  label: string | (() => ReactNode);
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  form: UseFormReturn<TFieldValues>;
  disabled?: boolean;
  mask?: Masker;
  onChange?: (value: string) => void;
};

export const InputText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathByValue<
    TFieldValues,
    string | number | undefined
  > = FieldPathByValue<TFieldValues, string | number | undefined>,
>({
  name,
  label,
  placeholder,
  type,
  form,
  mask = (value) => value,
  disabled = false,
  onChange,
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {typeof label === "function" ? (
            label()
          ) : (
            <FormLabel>{label}</FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              onChange={(e) => {
                e.target.value = mask(e.target.value);
                field.onChange(e);
                onChange?.(e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
