"use client";

import React from "react";
import { FieldValues, FormProviderProps } from "react-hook-form";

import { Form as FormLib } from "@/ui/shadcn/form";

type Props<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues | undefined = undefined,
> = {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
} & FormProviderProps<TFieldValues, TContext, TTransformedValues>;

export const Form = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  children,
  onSubmit,
  className,
  ...form
}: Props<TFieldValues, TContext, TTransformedValues>) => {
  return (
    <FormLib {...form}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </FormLib>
  );
};
