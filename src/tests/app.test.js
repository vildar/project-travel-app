import {treatAsUTC, daysBetween, handleSubmit} from '../client/js/app'

//Test for 'treatAsUTC' function defined in app.js
describe('"treatAsUTC" should be a function' , () => {
    test('It should return true', async () => {
        expect(typeof treatAsUTC).toBe("function");
    });
});

describe('"treatAsUTC" should exist' , () => {
    test('It should return true', async () => {
        expect(treatAsUTC).toBeDefined();
    });
});

//Test for 'daysBetween' function defined in app.js
describe('"daysBetween" should be a function' , () => {
    test('It should return true', async () => {
        expect(typeof daysBetween).toBe("function");
    });
});

describe('"daysBetween" should exist' , () => {
    test('It should return true', async () => {
        expect(daysBetween).toBeDefined();
    });
});

//Test for 'treatAsUTC' function defined in app.js
describe('"handleSubmit" should be a function' , () => {
    test('It should return true', async () => {
        expect(typeof handleSubmit).toBe("function");
    });
});

describe('"handleSubmit" should exist' , () => {
    test('It should return true', async () => {
        expect(handleSubmit).toBeDefined();
    });
});