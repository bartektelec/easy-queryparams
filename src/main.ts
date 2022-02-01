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
    ].reduce(reduceFn, input);

    return querystring as unknown as string;
};

const parse = (input: string): Record<string, string | string[]> => {
    const splitPairs = (input: string): [string, string][] =>
        input.split('&').map((keyval) => keyval.split('=')) as [
            string,
            string
        ][];

    const parseToASCII = (input: [string, string][]): [string, string][] =>
        input.map(([key, value]) => [
            key,
            value ? decodeURIComponent(value) : value,
        ]);

    const parseNums = (
        input: [string, string][]
    ): [string, string | number][] =>
        input.map(([key, value]) => [key, Number(value) || value]);

    const parseArrays = (
        input: [string, string | number][]
    ): [string, string | number | (string | number)[]][] =>
        input.map(([key, value]) => {
            const tempArr = String(value).split(',');
            if (tempArr.length > 1)
                return [key, tempArr.map((item) => Number(item) || item)];
            return [key, value];
        });

    const object = [
        splitPairs,
        parseToASCII,
        parseNums,
        parseArrays,
        Object.fromEntries,
    ].reduce(reduceFn, input);

    return object as unknown as Record<string, string | string[]>;
};

export { stringify, parse };
