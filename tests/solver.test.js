// @ts-nocheck
const SudokuSolver = require("../solver");

describe("Test Initialization", () => {
    test("Gets starting state from outside of class", () => {
        let state = SudokuSolver.startingState;
        expect(state).toHaveLength(81);
    });
});

describe("Function: validateIsNumber", () => {
    test("False for negative", () => {
        expect(SudokuSolver.validateIsNumber(-1)).toBe(false);
    });

    test("False for greater than 9", () => {
        expect(SudokuSolver.validateIsNumber(10)).toBe(false);
    });

    test("False for something not a number: empty array", () => {
        expect(SudokuSolver.validateIsNumber([])).toBe(false);
    });

    test("False for something not a number: empty object", () => {
        expect(SudokuSolver.validateIsNumber({})).toBe(false);
    });

    test("False for something not a number: null", () => {
        expect(SudokuSolver.validateIsNumber(null)).toBe(false);
    });

    test("False for something not a number: boolean", () => {
        expect(SudokuSolver.validateIsNumber(true)).toBe(false);
    });

    test("True for bounds: zero", () => {
        expect(SudokuSolver.validateIsNumber(0)).toBe(true);
    });

    test("True for bounds: nine", () => {
        expect(SudokuSolver.validateIsNumber(9)).toBe(true);
    });

    test("True for something in the middle: 4", () => {
        expect(SudokuSolver.validateIsNumber(4)).toBe(true);
    });


});

describe("Function: validateState", () => {
    test("False for non-array: null", () => {
        expect(SudokuSolver.validateState(null)).toBe(false);
    });

    test("False for empty array", () => {
        expect(SudokuSolver.validateState([])).toBe(false);
    });

    test("False for array with less than 81 elements", () => {
        expect(SudokuSolver.validateState([1,2,3])).toBe(false);
    });

    test("False for array with greater than 81 elements", () => {
        let state = Array.from(Array(82).keys());
        expect(SudokuSolver.validateState(state)).toBe(false);
    });

    test("True for state with one non-zero", () => {
        let state = [];
        for(let idx = 0; idx < 81; idx++) {
            state[idx] = 0;
        }
        state[4] = 7;
        expect(SudokuSolver.validateState(state)).toBe(true);
    });
});