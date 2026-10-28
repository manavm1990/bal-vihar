"use client";

import { FADE } from "@lib/animations";
import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useState } from "react";
import PageSection from "./page-section";
import { Button } from "./ui/button";

interface Option {
  key: string;
  name: string;
}

interface OptionGroup<T extends Option> {
  legend: string;
  options: T[];
}

interface OptionPickerProps<T extends Option> {
  id: string;
  title: string;
  groups: OptionGroup<T>[];
  children: (option: T) => ReactNode;
}

export default function OptionPicker<T extends Option>({
  id,
  title,
  groups,
  children,
}: OptionPickerProps<T>) {
  const { selected, select, fadeIn } = useSelectedOption(groups.flatMap((group) => group.options));

  return (
    <PageSection id={id} title={title}>
      <div className="flex flex-wrap gap-x-12 gap-y-4">
        {groups.map((group) => (
          <OptionButtons
            key={group.legend}
            legend={group.legend}
            options={group.options}
            selectedKey={selected?.key}
            onSelect={select}
          />
        ))}
      </div>
      {selected && (
        <motion.div key={selected.key} className="space-y-4" {...fadeIn}>
          {children(selected)}
        </motion.div>
      )}
    </PageSection>
  );
}

interface OptionButtonsProps {
  legend: string;
  options: Option[];
  selectedKey: string | undefined;
  onSelect: (key: string) => void;
}

function OptionButtons({ legend, options, selectedKey, onSelect }: OptionButtonsProps) {
  return options.length === 0 ? null : (
    <fieldset className="min-w-0 space-y-2">
      <legend className="mb-2 font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option.key}
            type="button"
            variant={option.key === selectedKey ? "default" : "outline"}
            aria-pressed={option.key === selectedKey}
            className="h-12 min-w-12"
            onClick={() => onSelect(option.key)}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}

function useSelectedOption<T extends Option>(options: T[]) {
  const [selectedKey, setSelectedKey] = useState<string | undefined>(options[0]?.key);
  const selected = options.find((option) => option.key === selectedKey) ?? options[0];
  const [hasPicked, setHasPicked] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const fadeIn =
    shouldReduceMotion || !hasPicked
      ? {}
      : { initial: FADE.initial, animate: FADE.animate, transition: FADE.transition };

  const select = (key: string) => {
    setSelectedKey(key);
    setHasPicked(true);
  };

  return { selected, select, fadeIn };
}
