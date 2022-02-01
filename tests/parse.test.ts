import { parse } from '../src/main';

describe('parse', () => {
    it('should be able to convert URI to object', () => {
        const input = 'location=New%20York&age=30';

        expect(parse(input).location).toEqual('New York');
        expect(parse(input).age).toEqual('30');
    });

    it('should be able to convert empty string to empty object', () => {
        const input = '';

        expect(parse(input)).toEqual({});
    });
});
