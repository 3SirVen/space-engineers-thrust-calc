import type { ComponentChildren } from "preact";

export interface NumberInputProps {
  onClick?: () => void;
  children?: ComponentChildren;
  min?: number;
  value?: number;
  step?: number;
  suggestions?: number[];
}

export function NumberInput(props: NumberInputProps) {
  props.min ||= 0;
  props.value ||= 15000;
  props.step ||= 0.1;

  const classes = [
    "p-2",
    "m-2",
    "outline-none",
    "transition",
    "duration-700",
    "rounded",
    "border-4",
    "border-secondary/25",
    "focus:border-secondary",
    "bg-[--background-color]",
    "text-[--text-color]",
  ].join(" ");

  if (props.suggestions) {
    const suggestions = props.suggestions.map((suggestion) => {
      return <option value={suggestion}></option>;
    });

    const html = (
      <div>
        <input type="number" {...props} class={classes} list="suggestions" />
        <datalist id="suggestions">{suggestions}</datalist>
      </div>
    );

    return html;
  } else {
    const html = <input type="number" {...props} class={classes} />;

    return html;
  }
}
