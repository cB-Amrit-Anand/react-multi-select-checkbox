import React from 'react';
import CustomMultiSelectCheckbox, {
    MultiSelectOption,
} from './index';

interface AppProps<T extends string | number = string> {
    options: MultiSelectOption<T>[];
    value?: MultiSelectOption<T>[];
    onChange: (selected: MultiSelectOption<T>[]) => void;
}

function App<T extends string | number = string>(props: AppProps<T>) {
    const handleChange = (selectedValues: MultiSelectOption<T>[]) => {
        console.log(selectedValues);
        props.onChange(selectedValues);
    };

    return (
        <div>
            <CustomMultiSelectCheckbox
                options={props.options}
                onChange={handleChange}
                value={props.value || []}
                placeholder="--All--"
            />
        </div>
    );
}

export default App;
