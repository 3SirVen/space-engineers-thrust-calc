import { NumberInput } from '../components/number-input.tsx'
import { define } from '../utils.ts'

export default define.page(function Home() {
  return (
    <div id='main' class='w-full h-full'>
      <div class='flex flex-col items-center justify-center h-full'>
        <h1 class='text-4xl text-center'>
          Space Engineers Thruster Requirement Calculator
        </h1>
        Ship Weight
        <NumberInput min={0} value={15000} step={0.1} />
      </div>
    </div>
  )
})
