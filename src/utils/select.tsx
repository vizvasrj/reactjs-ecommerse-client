export const formatSelectOptions = (data: any[], empty: boolean = false, from?: string) => {
    let newSelectOptions: { value: number, label: string }[] = [];

    if (data && data.length > 0) {
        data.map(option => {
            let newOption: { value: number, label: string } = {
                value: option._id,
                label: option.name
            };
            newSelectOptions.push(newOption);
        });
    }

    if (empty) {
        const emptyOption = {
            value: 0,
            label: 'No option selected'
        };
        newSelectOptions.unshift(emptyOption);
    }

    return newSelectOptions;
};

export const unformatSelectOptions = (data: any[]) => {
    if (!data) return null;

    let newSelectOptions: number[] = [];

    if (data && data.length > 0) {
        data.map(option => {
            let newOption: number = option.value;
            newSelectOptions.push(newOption);
        });
    }

    return newSelectOptions;
};