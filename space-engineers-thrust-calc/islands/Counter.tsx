import type { Signal } from "@preact/signals";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  return (
    <div class="flex gap-8 py-6">
      <p class="text-3xl tabular-nums">{props.count}</p>
    </div>
  );
}
