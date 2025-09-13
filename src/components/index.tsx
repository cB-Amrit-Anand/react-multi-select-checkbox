import * as React from 'react';
import '../css/styles.css';

export type MultiSelectOption<T extends string | number = string> = {
    label: string;
    value: T;
};

export interface CustomMultiSelectCheckboxProps<
    T extends string | number = string
> {
    options?: MultiSelectOption<T>[];
    placeholder?: string;
    value?: MultiSelectOption<T>[];
    onChange?: (selected: MultiSelectOption<T>[]) => void;
}

function CustomMultiSelectCheckbox<T extends string | number = string>({
    options = [],
    placeholder = 'Select...',
    value = [],
    onChange,
}: CustomMultiSelectCheckboxProps<T>) {
    const [isOpen, setIsOpen] = React.useState < boolean > (false);
    const [selected, setSelected] = React.useState < MultiSelectOption < T > [] > (value);
    const [search, setSearch] = React.useState < string > ('');
    const wrapperRef = React.useRef < HTMLDivElement | null > (null);

    // Keep internal state in sync if parent updates `value`
    React.useEffect(() => {
        setSelected(value);
    }, [value]);

    // Close on outside click
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && e.target instanceof Node && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter options based on search
    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggleOption = (val: T | '*') => {
        if (val === '*') {
            const allSelected = selected.length === options.length;
            const newSelected = allSelected ? [] : [...options];
            setSelected(newSelected);
            onChange?.(newSelected);
            return;
        }

        const exists = selected.some((sel) => sel.value === val);
        const option = options.find((opt) => opt.value === val);
        if (!option) return; // value not found in options, no-op

        const newSelected = exists
            ? selected.filter((sel) => sel.value !== val)
            : [...selected, option];

        setSelected(newSelected);
        onChange?.(newSelected);
    };

    return (
        <div className="multi-wrapper" ref={wrapperRef}>
            <div className="multi-select-box" onClick={() => setIsOpen((o) => !o)}>
                <span className="multi-selected-text">
                    {selected.length > 0
                        ? selected.length === options.length
                            ? 'All Selected'
                            : `${selected.length} Selected`
                        : placeholder}
                </span>
                <span className={`multi-arrow ${isOpen ? 'rotate' : ''}`}>&#9662;</span>
            </div>

            {isOpen && (
                <>
                    <input
                        className="multi-search"
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />

                    <div className="multi-dropdown">
                        <label className="multi-option">
                            <input
                                type="checkbox"
                                checked={options.length > 0 && selected.length === options.length}
                                onChange={() => toggleOption('*')}
                            />
                            Select All
                        </label>

                        {filteredOptions.map((opt) => (
                            <label key={String(opt.value)} className="multi-option">
                                <input
                                    type="checkbox"
                                    checked={selected.some((sel) => sel.value === opt.value)}
                                    onChange={() => toggleOption(opt.value)}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default CustomMultiSelectCheckbox;
