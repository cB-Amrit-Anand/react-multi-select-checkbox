## @amrit981/react-multi-select-checkbox

A lightweight, dependency-free React component that renders a searchable multi-select dropdown built with native checkboxes. It ships with a minimal CSS file so you can get started quickly and override styles as needed.

### Features
- Search input filters options client-side as you type.
- “Select All” checkbox toggles the entire list in one click.
- Displays a badge-style summary (`All Selected`, `3 Selected`, or placeholder).
- Fully controlled via props for options, value and change events.
- Ships TypeScript definitions out of the box.

### Installation
```bash
npm install @amrit981/react-multi-select-checkbox
# or
yarn add @amrit981/react-multi-select-checkbox
```

### Quick Start
```tsx
import React, { useState } from 'react';
import { ReactMultiSelectCheckbox } from '@amrit981/react-multi-select-checkbox';
import '@amrit981/react-multi-select-checkbox/dist/index.css'; // optional: default styles

const cityOptions = [
  { label: 'New York', value: 'nyc' },
  { label: 'San Francisco', value: 'sf' },
  { label: 'Seattle', value: 'sea' },
];

export default function CitiesFilter() {
  const [selectedCities, setSelectedCities] = useState([]);

  return (
    <ReactMultiSelectCheckbox
      options={cityOptions}
      value={selectedCities}
      placeholder="Pick cities"
      onChange={setSelectedCities}
    />
  );
}
```

> **Styling:** The component imports `../css/styles.css` internally. If you need to customize, copy the CSS selectors into your app and tweak them, or disable the default styles with a bundler config that ignores CSS side effects.

### Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `Array<{ label: string; value: string \| number; }>` | `[]` | Items rendered in the dropdown. |
| `placeholder` | `string` | `'Select...'` | Text shown when nothing is selected. |
| `value` | `Array<MultiSelectOption>` | `[]` | Controlled value for selected options. |
| `onChange` | `(selected: MultiSelectOption[]) => void` | `undefined` | Called whenever the selection changes; receives the full selected array. |

### Development
```bash
# install deps
npm install

# build the package (outputs to dist/)
npm run build
```

### Local Playground
A Vite-powered demo app lives in `demo/` so you can interact with the component while you develop:

```bash
cd demo
npm install   # first time only
npm run dev   # serves http://localhost:5173
```

The demo imports the component straight from `../src`, so any edits hot-reload immediately. If you need to mimic the published package instead, run `npm run build` in the repo root and install the generated tarball inside `demo` with `npm install ../react-multi-select-checkbox-<version>.tgz`.
