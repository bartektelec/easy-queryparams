import { parse } from '../src';

describe('parse', () => {
    it('should be able to convert URI to object', () => {
        const input = 'location=New%20York&age=30';

        expect(parse(input).location).toEqual('New York');
    });

    it('should set empty params as truthy bool', () => {
        const input = 'location=New%20York&isActive&age=30';

        expect(parse(input).isActive).toBeTruthy();
    });

    it('should convert to a number if possible', () => {
        const input = 'location=New%20York&age=30';

        expect(parse(input).age).toEqual(30);
    });

    it('should convert to an array if possible', () => {
        const input = 'name=Adam&children=John%2CSarah%2CDavid';

        expect(parse(input).children).toEqual(['John', 'Sarah', 'David']);
    });

    it('should convert numbers inside of an array if possible', () => {
        const input = 'childAges=20%2Cabc%2C40%2C50';

        expect(parse(input).childAges).toEqual([20, 'abc', 40, 50]);
    });

    it('should be able to convert empty string to empty object', () => {
        const input = '';

        expect(parse(input)).toEqual({});
    });
});
