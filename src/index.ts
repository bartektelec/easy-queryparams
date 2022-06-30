const reduceFn = (v: any, fn: (val: any) => any) => fn(v);

interface StringifyOptions {
    splitArrays: boolean;
}

const defaultStringifyOptions: StringifyOptions = {
    splitArrays: false,
};

const stringify = (
    input: Record<string, unknown>,
    options: Partial<StringifyOptions> = {}
): string => {
    const _opts = { ...defaultStringifyOptions, ...options };

    const toEntries = (input: Record<string, unknown>) => Object.entries(input);

    const rejectNullish = (input: [string, unknown | null][]) =>
        input.filter(([_, value]) => {
            if (value === null || value === undefined) return false;
            return true;
        });

    const buildKeyValString = (input: [string, unknown][]) =>
        input.map(([key, value]) =>
            value !== ''
                ? _opts.splitArrays && Array.isArray(value)
                    ? value
                          .map((v) => `${key}=${encodeURIComponent(String(v))}`)
                          .join('&')
                    : `${key}=${encodeURIComponent(String(value))}`
                : null
        );

    const filterEmpty = (input: (string | null)[]) =>
        input.filter((query) => query);

    const concatStrings = (input: string[]): string => input.join('&');

    const querystring = [
        toEntries,
        rejectNullish,
        buildKeyValString,
        filterEmpty,
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

    const filterEmptyKeys = (
        input: [string, string | number | (string | number)[]][]
    ) => input.filter(([key]) => key);

    const parseEmptyValues = (
        input: [string, string | number | (string | number)[]][]
    ): [string, string | number | boolean | (string | number)[]][] =>
        input.map(([key, value]) => [key, value ?? true]);

    const convertDuplicateKeysToArray = (
        input: [string, string][]
    ): [string, string][] => {
        let arr: [string, string][] = [];

        for (const [key, v] of input) {
            const found = arr.find(([k]) => k === key);

            if (found) {
                found[1] += `,${v}`;
            } else {
                arr.push([key, v]);
            }
        }

        return arr;
    };

    const object = [
        splitPairs,
        convertDuplicateKeysToArray,
        parseToASCII,
        parseNums,
        parseArrays,
        filterEmptyKeys,
        parseEmptyValues,
        Object.fromEntries,
    ].reduce(reduceFn, input);

    return object as unknown as Record<string, string | string[]>;
};

export { stringify, parse };
