import type { ComponentChildren, JSX } from "preact";

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

  let html: JSX.Element;

  if (props.suggestions) {
    const suggestions = props.suggestions.map((suggestion) => {
      return <option key={suggestion} value={suggestion}></option>;
    });

    html = (
      <>
        <input type="number" {...props} class={classes} list="suggestions" />
        <datalist id="suggestions">{suggestions}</datalist>
      </>
    );
  } else {
    html = <input type="number" {...props} class={classes} />;
  }

  return html;
}
