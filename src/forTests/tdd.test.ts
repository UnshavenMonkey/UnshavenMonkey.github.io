import { sum } from "./tdd"

describe('check sum', () => {
    it('should return the sum of the twonumbers', () => {
        expect(sum(1, 2)).toBe(3);
    })

    it('should return the sum of the twonumbers', () => {
        expect(sum(-1, -3)).toBe(-4);
    })

    it('should return the sum of the twonumbers', () => {
        expect(sum(1, 3)).toBe(4);
    })
})