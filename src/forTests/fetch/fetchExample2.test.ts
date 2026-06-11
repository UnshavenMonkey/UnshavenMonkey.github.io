import { getUsers, MOCK_USER } from "src/forTests/fetch/fetchMocks";

describe('fetch example', () => {
    test('fetch github users', async () => {
        const user = await getUsers()
        expect(user).toEqual(MOCK_USER)
    })
})