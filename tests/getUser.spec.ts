import {
    generateRandomUSers,
    generateRandomUser,
    User
} from '../src/getUsers'


describe('generateRandomUSer()', () => {
    let user: User;

    beforeAll(() => {
        user = generateRandomUser()
    })

    it('returns an object with exactly the User properties', () => {
        expect(Object.keys(user).sort()).toEqual(
            ['age', 'firstName', 'lastName', 'id', 'email'].sort()
        )
    })

    it('generates and id string of lowercase letters & digits', () => {
        expect(typeof user.id).toBe('string')
        expect(user.id).toMatch(/^[a-z0-9]+$/)
        expect(user.id.length).toBeGreaterThanOrEqual(8)
    })

    it('generate email in case age < 45', () => {
        const {firstName, lastName, age, email} = user
        if (age < 45) {
            expect(email).toBe(
                `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
            )
        }
    })
})


describe('generateRandomUsers()', () => {
    it('returns an empty array if count = 0', () => {
        let count = 0;
        expect(generateRandomUSers(0)).toEqual([])
    })

    it('returns an array of the requested length', () => {
        const n = 3;
        const arr = generateRandomUSers(n)
        expect(Array.isArray(arr)).toBe(true)
        expect(arr).toHaveLength(n)
    })

    it('each entry is a different USer object', () => {
        const [u1, u2] = generateRandomUSers(2)
        expect(u1).not.toBe(u2);
        expect(u1.id).not.toBe(u2.id)
    })

    it('if n is negative must return an empty array', () => {
        expect(generateRandomUSers(-3)).toEqual([])
    })
})