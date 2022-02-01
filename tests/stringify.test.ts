import { stringify } from '../src';

describe('stringify', () => {
    it('should take an object and convert it to a string', () => {
        const input = {
            name: 'Adam',
            age: 25,
            location: 'New york',
        };

        const result = 'name=Adam&age=25&location=New%20york';

        expect(stringify(input)).toEqual(result);
    });

    it('should convert an array value', () => {
        const input = {
            name: 'Adam',
            children: ['John', 'Sarah', 'David'],
        };

        const result = 'name=Adam&children=John%2CSarah%2CDavid';

        expect(stringify(input)).toEqual(result);
    });

    it('should get rid of nullish values', () => {
        const input = {
            name: 'Adam',
            location: null,
            age: 69,
            job: undefined,
            hair: 0,
        };

        const result = 'name=Adam&age=69&hair=0';

        expect(stringify(input)).toEqual(result);
    });

    it('should be able to convert an empty object', () => {
        const input = {};

        const result = '';

        expect(stringify(input)).toEqual(result);
    });
});
