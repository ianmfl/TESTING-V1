export interface User {id: String, firstName: String, lastName: String, age: number, email?: String}
const FIRST_NAMES = ['Alice', 'Bob', 'Carol', 'David', 'Eva', 'Frank', 'Grace', 'Hector'];
const LAST_NAMES  = ['Johnson', 'Smith', 'Lee', 'Martínez', 'Garcia', 'Davis', 'Rodríguez', 'Brown'];
const AGES = [21, 43, 54, 19, 42,65, 76, 38, 25];

function generateRandomElements<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 10)
    + Math.random().toString(36).substring(2, 10);
}


export function generateRandomUser(): User {
    const firstName = generateRandomElements(FIRST_NAMES)
    const lastName = generateRandomElements(LAST_NAMES)
    const age = generateRandomElements(AGES)
    const id = generateId();
    let email= ''
    if (age < 45) {
        email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;  
    }
   return {id, firstName, lastName, age, email}
}

export function generateRandomUSers(count: number): User[] {
    return Array.from({length: count}, ()=> generateRandomUser())
}