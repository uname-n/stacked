import { useState } from "react";

export function useInput(initialValue, useEvent=false) {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: (event) => {
                if (useEvent) setValue(event);
                else setValue(event.target.value);
            },
            required: true,
        },
    };
};