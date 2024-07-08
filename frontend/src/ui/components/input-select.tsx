"use client";

import { CircleX } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import {
  FieldPathByValue,
  FieldValues,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

import { Option } from "@/domain/entities/option";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

type Props<TFieldValues extends FieldValues, TName> = {
  name: TName;
  label: string;
  form: UseFormReturn<TFieldValues>;
  placeholder?: string;
  options: Option[] | (() => Promise<Option[]>);
  showClearOption?: boolean;
  onChange?: (value: Option | undefined) => void;
};

export const InputSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathByValue<TFieldValues, Option> = FieldPathByValue<
    TFieldValues,
    Option
  >,
>({
  form,
  label,
  name,
  placeholder = "Selecione uma opção",
  options: optionsOrGetOptions,
  showClearOption = true,
  onChange: handleChange,
}: Props<TFieldValues, TName>) => {
  const [options, setOptions] = useState(
    Array.isArray(optionsOrGetOptions) ? optionsOrGetOptions : [],
  );

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (typeof optionsOrGetOptions !== "function") {
      return setOptions(optionsOrGetOptions);
    }

    startTransition(async () => {
      const result = await optionsOrGetOptions();
      setOptions(result);
    });
  }, [optionsOrGetOptions]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const value = field.value?.value ?? null;
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={(selected) => {
                const selectedOption = options.find(
                  (o) => o.value === selected,
                );
                field.onChange(selectedOption);
                handleChange?.(selectedOption);
              }}
              defaultValue={value}
              value={value}
              disabled={isPending}
            >
              <FormControl>
                <SelectTrigger>
                  <div className="flex w-full items-center justify-between">
                    <SelectValue placeholder={placeholder} className="flex-1" />

                    {showClearOption && value && (
                      <span
                        className="mr-2"
                        onPointerDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const emptyOption = { value: "", label: "" };
                          form.setValue(
                            name,
                            emptyOption as PathValue<TFieldValues, TName>,
                          );
                          handleChange?.(emptyOption);
                        }}
                      >
                        <CircleX className="text-slate-500 hover:text-slate-700" />
                      </span>
                    )}
                  </div>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
