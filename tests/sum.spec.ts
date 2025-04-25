import { sum } from "../src/sum";


describe('sum()', () => {
    it('ads two positives', () => {
       expect(sum(2,3)).toBe(5)
    })
   
    it('handles negatives', () => {
        expect(sum(-4, 1)).toBe(-3)
    })
})