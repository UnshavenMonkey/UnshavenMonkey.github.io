import { forEach } from "src/forTests/utils";
import { getUsers } from "./fetch/fetchMocks";

const sum = (x: number) => 42 + x
const mockCallback = jest.fn(sum);

describe('flow', () => {
    let user = {}
    beforeAll(() => console.log('before all setup'))
    afterAll(() => console.log('after all setup'))
    beforeEach(() => console.log('before each setup'))
    
    test('forEach mock function', () => {
        console.log('test1')
        forEach([0, 1], mockCallback);

        // The mock function was called twice
        expect(mockCallback.mock.calls).toHaveLength(2);

        // The first argument of the first call to the function was 0
        expect(mockCallback.mock.calls[0][0]).toBe(0);

        // The first argument of the second call to the function was 1
        expect(mockCallback.mock.calls[1][0]).toBe(1);

        // The return value of the first call to the function was 42
        expect(mockCallback.mock.results[0].value).toBe(42);
    });    
})


