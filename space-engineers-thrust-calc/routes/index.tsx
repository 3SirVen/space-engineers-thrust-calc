import { useSignal } from "@preact/signals";
import { NumberInput } from "../components/number-input.tsx";
import Counter from "../islands/Counter.tsx";
import { define } from "../utils.ts";

export default define.page(function Home() {
  const count = useSignal(3);

  return (
    <div id="main" class="w-full h-full">
      <div class="flex flex-col items-center justify-center h-full">
        <h1 class="text-4xl text-center">
          Space Engineers Thruster Requirement Calculator
        </h1>
        <Counter count={count} />
        <NumberInput min={0} value={15000} step={0.1} />
      </div>
    </div>
  );
});
