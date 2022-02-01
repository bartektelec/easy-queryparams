const reduceFn = (v: any, fn: (val: any) => any) => fn(v);

const stringify = (input: Record<string, unknown>): string => {
    const toEntries = (input: Record<string, unknown>) => Object.entries(input);

    const rejectNullish = (input: [string, unknown | null][]) =>
        input.filter(([_, value]) => {
            if (value === null || value === undefined) return false;
            return true;
        });

    const buildKeyValString = (input: [string, unknown][]) =>
        input.map(
            ([key, value]) => `${key}=${encodeURIComponent(String(value))}`
        );

    const concatStrings = (input: string[]): string => input.join('&');

    const querystring = [
        toEntries,
        rejectNullish,
        buildKeyValString,
        concatStrings,
    ].reduce(reduceFn, input) as unknown as string;

    return querystring;
};

const main = { stringify };

export { main as default, stringify };
