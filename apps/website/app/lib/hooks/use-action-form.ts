import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState, useTransition } from "react";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import type { BaseIssue, BaseSchema } from "valibot";

const FAILURE = {
  success: false,
  message: "Something went wrong. Please try again in a moment.",
} as const;

interface UseActionFormOptions<Values extends FieldValues, Parsed> {
  schema: BaseSchema<Values, Parsed, BaseIssue<unknown>>;
  defaultValues: DefaultValues<Values>;
  action: (values: Values) => Promise<{ success: boolean; message: string }>;
}

export default function useActionForm<Values extends FieldValues, Parsed>({
  schema,
  defaultValues,
  action,
}: UseActionFormOptions<Values, Parsed>) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Values, unknown, Parsed>({
    resolver: valibotResolver(schema),
    defaultValues,
  });

  const onSubmit = handleSubmit(() => {
    setResult(null);
    const values = getValues();
    startTransition(async () => {
      try {
        const response = await action(values);
        setResult(response);
        if (response.success) reset();
      } catch {
        setResult(FAILURE);
      }
    });
  });

  return {
    register,
    control,
    errors,
    onSubmit,
    isPending,
    successMessage: result?.success ? result.message : undefined,
    errorMessage: result && !result.success ? result.message : undefined,
  } as const;
}
