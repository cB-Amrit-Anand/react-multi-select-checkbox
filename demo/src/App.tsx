import { useMemo, useState } from 'react'
import { ReactMultiSelectCheckbox } from '@amrit981/react-multi-select-checkbox'
import type { MultiSelectOption } from '@amrit981/react-multi-select-checkbox'
import './App.css'

const FRUIT_OPTIONS: MultiSelectOption<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragon Fruit', value: 'dragon-fruit' },
  { label: 'Guava', value: 'guava' },
  { label: 'Lemon', value: 'lemon' },
  { label: 'Peach', value: 'peach' },
  { label: 'Watermelon', value: 'watermelon' },
]

function App() {
  const [selected, setSelected] = useState<MultiSelectOption<string>[]>([])
  const selectedValues = useMemo(
    () => selected.map((option) => option.label).join(', ') || 'None yet',
    [selected]
  )

  return (
    <main className="demo-wrapper">
      <h1>React Multi Select Checkbox</h1>
      <p className="tagline">
        Use this sandbox to verify new features while developing the package.
      </p>

      <section className="widget">
        <ReactMultiSelectCheckbox
          options={FRUIT_OPTIONS}
          value={selected}
          placeholder="Pick some fruit"
          onChange={setSelected}
        />
      </section>

      <section className="selection-preview">
        <h2>Current value</h2>
        <p>{selectedValues}</p>
        <pre>{JSON.stringify(selected, null, 2)}</pre>
      </section>
    </main>
  )
}

export default App
