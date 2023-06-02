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


describe("Function: validateAgainstRow", () => {
    test("True when cell value is 0 aka empty", () => {
        let emptyGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(0, emptyGrid)).toBe(true);
    });

    test("True when cell is only number in grid", () => {
        let emptyGrid = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(0, emptyGrid)).toBe(true);
    });

    test("True when duplicate is not in same row", () => {
        let emptyGrid = [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(0, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(0, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start in middle", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(4, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(8, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(27, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at middle of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(31, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(35, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRow(72, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at middle of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRow(76, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRow(80, emptyGrid)).toBe(true);
    });

    test("False when duplicate exists in middle and start at beginning", () => {
        let emptyGrid = [1,2,5,9,7,1,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(0, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists start at middle", () => {
        let emptyGrid = [1,2,5,9,6,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(4, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists at end - start at middle", () => {
        let emptyGrid = [1,2,5,9,6,7,3,8,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(4, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at beginning of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,1,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(27, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and and start at middle of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,7,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(31, emptyGrid)).toBe(false);
    });

    test("False when duplicate near the end of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRow(34, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at beginning of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,1,6,3,8,4];
        expect(SudokuSolver.validateAgainstRow(72, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at middle of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,7,3,8,4];
        expect(SudokuSolver.validateAgainstRow(76, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists start near end of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,8];
        expect(SudokuSolver.validateAgainstRow(79, emptyGrid)).toBe(false);
    });

    

});

describe("Function: validateStartingState", () => {
    test("False for non-array: null", () => {
        expect(SudokuSolver.validateStartingState(null)).toBe(false);
    });

    test("False for empty array", () => {
        expect(SudokuSolver.validateStartingState([])).toBe(false);
    });

    test("False for array with less than 81 elements", () => {
        expect(SudokuSolver.validateStartingState([1,2,3])).toBe(false);
    });

    test("False for array with greater than 81 elements", () => {
        let state = Array.from(Array(82).keys());
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("True for state with one non-zero", () => {
        let state = [];
        for(let idx = 0; idx < 81; idx++) {
            state[idx] = 0;
        }
        state[4] = 7;
        expect(SudokuSolver.validateStartingState(state)).toBe(true);
    });
});