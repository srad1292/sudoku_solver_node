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


describe("Function: validateAgainstRowToRight", () => {
    test("True when cell value is 0 aka empty", () => {
        let emptyGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(0, emptyGrid)).toBe(true);
    });

    test("True when cell is only number in grid", () => {
        let emptyGrid = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(0, emptyGrid)).toBe(true);
    });

    test("True when duplicate is not in same row", () => {
        let emptyGrid = [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(0, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(0, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start in middle", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(4, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(8, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(27, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at middle of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(31, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(35, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRowToRight(72, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at middle of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRowToRight(76, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRowToRight(80, emptyGrid)).toBe(true);
    });

    test("False when duplicate exists in middle and start at beginning", () => {
        let emptyGrid = [1,2,5,9,7,1,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(0, emptyGrid)).toBe(false);
    });

    test("False when duplicate in first row starting near beginning", () => {
        let state = [0,9,6,4,9,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateAgainstRowToRight(1, state)).toBe(false);
    });

    test("False when duplicate exists start at middle", () => {
        let emptyGrid = [1,2,5,9,6,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(4, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists at end - start at middle", () => {
        let emptyGrid = [1,2,5,9,6,7,3,8,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(4, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at beginning of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,1,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(27, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and and start at middle of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,7,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(31, emptyGrid)).toBe(false);
    });

    test("False when duplicate near the end of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToRight(34, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at beginning of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,1,6,3,8,4];
        expect(SudokuSolver.validateAgainstRowToRight(72, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at middle of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,7,3,8,4];
        expect(SudokuSolver.validateAgainstRowToRight(76, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists start near end of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,8];
        expect(SudokuSolver.validateAgainstRowToRight(79, emptyGrid)).toBe(false);
    });
});

describe("Function: validateAgainstRowToLeft", () => {
    test("True when cell value is 0 aka empty", () => {
        let emptyGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(8, emptyGrid)).toBe(true);
    });

    test("True when cell is only number in grid start at end", () => {
        let emptyGrid = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(0, emptyGrid)).toBe(true);
    });

    test("True when cell is only number in grid start at begnning", () => {
        let emptyGrid = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(0, emptyGrid)).toBe(true);
    });

    test("True when duplicate is not in same row", () => {
        let emptyGrid = [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(9, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(0, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start in middle", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(4, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(8, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(27, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at middle of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(31, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(35, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at beginning of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRowToLeft(72, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at middle of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRowToLeft(76, emptyGrid)).toBe(true);
    });

    test("True when every number in row is unique and start at end of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRowToLeft(80, emptyGrid)).toBe(true);
    });

    test("False when duplicate exists in middle and start at end", () => {
        let emptyGrid = [1,2,5,9,4,1,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(8, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists start at middle", () => {
        let emptyGrid = [1,2,5,9,6,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(5, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists at start - start at middle", () => {
        let emptyGrid = [6,2,5,9,6,7,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(4, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at end of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2,5,9,1,6,3,8,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(35, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and and start at near end of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,7,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(33, emptyGrid)).toBe(false);
    });

    test("False when duplicate near the end of a later row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstRowToLeft(28, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at near beginning of a last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,5,9,7,6,3,8,4];
        expect(SudokuSolver.validateAgainstRowToLeft(73, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists and start at middle of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,7,3,8,4];
        expect(SudokuSolver.validateAgainstRowToLeft(77, emptyGrid)).toBe(false);
    });

    test("False when duplicate exists start at end of last row", () => {
        let emptyGrid = [1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,5,9,7,6,3,8,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,8,5,9,7,6,3,4,8];
        expect(SudokuSolver.validateAgainstRowToLeft(80, emptyGrid)).toBe(false);
    });

    

});

describe("Function: validateAgainstColumnAbove", () => {

    test("True when first cell value is 0 aka empty", () => {
        let emptyGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(0, emptyGrid)).toBe(true);
    });

    test("True when first cell in last row value is 0 aka empty", () => {
        let emptyGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(72, emptyGrid)).toBe(true);
    });

    test("True when first column is unique starting at top", () => {
        let grid = [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(0, grid)).toBe(true);
    });

    test("True when first column is unique starting at middle", () => {
        let grid = [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(36, grid)).toBe(true);
    });

    test("True when first column is unique starting at bottom", () => {
        let grid = [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(72, grid)).toBe(true);
    });

    test("True when middle column is unique starting at top", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,3,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,9,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,7,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(4, grid)).toBe(true);
    });

    test("True when middle column is unique starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,3,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,9,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,7,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(40, grid)).toBe(true);
    });

    test("True when middle column is unique starting at bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,3,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,9,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,7,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(76, grid)).toBe(true);
    });

    test("True when last column is unique starting at top", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnAbove(8, grid)).toBe(true);
    });

    test("True when last column is unique starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnAbove(44, grid)).toBe(true);
    });

    test("True when last column is unique starting at bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnAbove(80, grid)).toBe(true);
    });

    test("False when first column has conflict above starting near top", () => {
        let grid = [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(9, grid)).toBe(false);
    });

    test("False when first column has conflict above starting at middle", () => {
        let grid = [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(36, grid)).toBe(false);
    });

    test("False when first column has conflict starting at bottom", () => {
        let grid = [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(72, grid)).toBe(false);
    });


    test("False when middle column has conflict starting near top", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,4,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,9,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,7,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(13, grid)).toBe(false);
    });

    test("False when middle column has conflict starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,3,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,4,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,7,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(40, grid)).toBe(false);
    });

    test("False when middle column has conflict starting at bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,3,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,9,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,4,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnAbove(76, grid)).toBe(false);
    });

    test("False when last column has conflict starting near top", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,6,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnAbove(17, grid)).toBe(false);
    });

    test("False when last column has conflict starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,6,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,6,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnAbove(44, grid)).toBe(false);
    });

    test("False when last column has conflict starting at bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,5];
        expect(SudokuSolver.validateAgainstColumnAbove(80, grid)).toBe(false);
    });

});

describe("Function: validateAgainstColumnBelow", () => {

    test("True when first cell value is 0 aka empty", () => {
        let emptyGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(0, emptyGrid)).toBe(true);
    });

    test("True when first cell in last row value is 0 aka empty", () => {
        let emptyGrid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(72, emptyGrid)).toBe(true);
    });

    test("True when first column is unique starting at top", () => {
        let grid = [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(0, grid)).toBe(true);
    });

    test("True when first column is unique starting at middle", () => {
        let grid = [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(36, grid)).toBe(true);
    });

    test("True when first column is unique starting at bottom", () => {
        let grid = [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(72, grid)).toBe(true);
    });

    test("True when middle column is unique starting at top", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,3,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,9,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,7,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(4, grid)).toBe(true);
    });

    test("True when middle column is unique starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,3,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,9,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,7,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(40, grid)).toBe(true);
    });

    test("True when middle column is unique starting at bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,0,4,0,0,0,3,0,0,0,0,3,0,0,0,8,0,0,0,0,6,0,0,0,6,0,0,0,0,5,0,0,0,9,0,0,0,0,9,0,0,0,5,0,0,0,0,8,0,0,0,1,0,0,0,0,2,0,0,0,2,0,0,0,0,7,0,0,0,7,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(76, grid)).toBe(true);
    });

    test("True when last column is unique starting at top", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(8, grid)).toBe(true);
    });

    test("True when last column is unique starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(44, grid)).toBe(true);
    });

    test("True when last column is unique starting at bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,2,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(80, grid)).toBe(true);
    });

    test("False when first column has conflict Below starting at top", () => {
        let grid = [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstColumnBelow(0, grid)).toBe(false);
    });
    
    test("False when first column has conflict Below starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,2,0,0,0,2,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,7,0,0,0,7,0,0,0,8,2,0,0,0,9,0,0,0,4];
        expect(SudokuSolver.validateAgainstColumnBelow(36, grid)).toBe(false);
    });
    
    test("False when first column has conflict starting near bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,7,0,0,0,2,0,0,0,4,7,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(63, grid)).toBe(false);
    });
    
    test("False when middle column has conflict starting at top", () => {
        let grid = [1,0,0,0,1,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,9,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,7,0,0,0,2,0,0,0,4,2,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(4, grid)).toBe(false);
    });
    
    test("False when middle column has conflict starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,7,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,7,0,0,0,2,0,0,0,4,2,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(40, grid)).toBe(false);
    });
    
    test("False when middle column has conflict starting near bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,2,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,7,0,0,0,7,0,0,0,4,2,0,0,0,7,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(67, grid)).toBe(false);
    });
    

    test("False when last column has conflict starting at top", () => {
        let grid = [1,0,0,0,4,0,0,0,8,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,2,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,7,0,0,0,7,0,0,0,4,2,0,0,0,9,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(8, grid)).toBe(false);
    });
    
    test("False when last column has conflict starting at middle", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,2,0,0,0,8,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,7,0,0,0,7,0,0,0,4,2,0,0,0,9,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(44, grid)).toBe(false);
    });
    
    test("False when last column has conflict starting at bottom", () => {
        let grid = [1,0,0,0,4,0,0,0,6,4,0,0,0,3,0,0,0,5,3,0,0,0,8,0,0,0,3,6,0,0,0,6,0,0,0,9,5,0,0,0,2,0,0,0,1,9,0,0,0,5,0,0,0,7,8,0,0,0,1,0,0,0,2,7,0,0,0,7,0,0,0,8,2,0,0,0,9,0,0,0,8];
        expect(SudokuSolver.validateAgainstColumnBelow(71, grid)).toBe(false);
    });
});

describe("Function: calculateTopLeftIndex", () => {
    // Top Left
    test("0 when given 0", () => {
        expect(SudokuSolver.calculateTopLeftIndex(0)).toBe(0);
    });

    test("0 when given 1", () => {
        expect(SudokuSolver.calculateTopLeftIndex(1)).toBe(0);
    });

    test("0 when given 10", () => {
        expect(SudokuSolver.calculateTopLeftIndex(10)).toBe(0);
    });

    test("0 when given 11", () => {
        expect(SudokuSolver.calculateTopLeftIndex(11)).toBe(0);
    });

    test("0 when given 18", () => {
        expect(SudokuSolver.calculateTopLeftIndex(10)).toBe(0);
    });

    test("0 when given 20", () => {
        expect(SudokuSolver.calculateTopLeftIndex(11)).toBe(0);
    });

    // Top Middle
    test("3 when given 3", () => {
        expect(SudokuSolver.calculateTopLeftIndex(3)).toBe(3);
    });
    
    test("3 when given 5", () => {
        expect(SudokuSolver.calculateTopLeftIndex(5)).toBe(3);
    });
    
    test("3 when given 13", () => {
        expect(SudokuSolver.calculateTopLeftIndex(13)).toBe(3);
    });
    
    test("3 when given 21", () => {
        expect(SudokuSolver.calculateTopLeftIndex(21)).toBe(3);
    });
    
    test("3 when given 23", () => {
        expect(SudokuSolver.calculateTopLeftIndex(23)).toBe(3);
    });

    // Top Right
    test("6 when given 6", () => {
        expect(SudokuSolver.calculateTopLeftIndex(6)).toBe(6);
    });

    test("6 when given 8", () => {
        expect(SudokuSolver.calculateTopLeftIndex(8)).toBe(6);
    });

    test("6 when given 16", () => {
        expect(SudokuSolver.calculateTopLeftIndex(16)).toBe(6);
    });

    test("6 when given 24", () => {
        expect(SudokuSolver.calculateTopLeftIndex(24)).toBe(6);
    });

    test("6 when given 26", () => {
        expect(SudokuSolver.calculateTopLeftIndex(26)).toBe(6);
    });


    // Middle Left
    test("27 when given 27", () => {
        expect(SudokuSolver.calculateTopLeftIndex(27)).toBe(27);
    });

    test("27 when given 28", () => {
        expect(SudokuSolver.calculateTopLeftIndex(28)).toBe(27);
    });

    test("27 when given 37", () => {
        expect(SudokuSolver.calculateTopLeftIndex(37)).toBe(27);
    });

    test("27 when given 38", () => {
        expect(SudokuSolver.calculateTopLeftIndex(38)).toBe(27);
    });

    test("27 when given 47", () => {
        expect(SudokuSolver.calculateTopLeftIndex(47)).toBe(27);
    });

    // Middle Middle
    test("30 when given 30", () => {
        expect(SudokuSolver.calculateTopLeftIndex(30)).toBe(30);
    });

    test("30 when given 31", () => {
        expect(SudokuSolver.calculateTopLeftIndex(31)).toBe(30);
    });

    test("30 when given 41", () => {
        expect(SudokuSolver.calculateTopLeftIndex(41)).toBe(30);
    });

    test("30 when given 48", () => {
        expect(SudokuSolver.calculateTopLeftIndex(48)).toBe(30);
    });

    test("30 when given 50", () => {
        expect(SudokuSolver.calculateTopLeftIndex(50)).toBe(30);
    });

    // Bottom Middle
    test("57 when given 57", () => {
        expect(SudokuSolver.calculateTopLeftIndex(57)).toBe(57);
    });

    test("57 when given 58", () => {
        expect(SudokuSolver.calculateTopLeftIndex(58)).toBe(57);
    });

    test("57 when given 67", () => {
        expect(SudokuSolver.calculateTopLeftIndex(67)).toBe(57);
    });

    test("57 when given 76", () => {
        expect(SudokuSolver.calculateTopLeftIndex(76)).toBe(57);
    });

    test("57 when given 77", () => {
        expect(SudokuSolver.calculateTopLeftIndex(77)).toBe(57);
    });

    // Bottom Right
    test("60 when given 60", () => {
        expect(SudokuSolver.calculateTopLeftIndex(60)).toBe(60);
    });

    test("60 when given 61", () => {
        expect(SudokuSolver.calculateTopLeftIndex(61)).toBe(60);
    });

    test("60 when given 69", () => {
        expect(SudokuSolver.calculateTopLeftIndex(69)).toBe(60);
    });

    test("60 when given 79", () => {
        expect(SudokuSolver.calculateTopLeftIndex(79)).toBe(60);
    });

    test("60 when given 80", () => {
        expect(SudokuSolver.calculateTopLeftIndex(80)).toBe(60);
    });

});

describe("Function: validateAgainstSquare", () => {
    test("True when cell is 0", () => {
        let grid = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(10, grid)).toBe(true);
    });
    // True - First Square
    test("True when first square is all unique starting at topleft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(0, grid)).toBe(true);
    });

    test("True when first square is all unique starting at topRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(2, grid)).toBe(true);
    });

    test("True when first square is all unique starting at middleRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(11, grid)).toBe(true);
    });

    test("True when first square is all unique starting at middleMiddle", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(10, grid)).toBe(true);
    });

    test("True when first square is all unique starting at bottomLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(18, grid)).toBe(true);
    });

    test("True when first square is all unique starting at bottomRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(20, grid)).toBe(true);
    });
    // True - Center Square
    test("True when center square is all unique starting at topleft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(30, grid)).toBe(true);
    });

    test("True when center square is all unique starting at topRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(32, grid)).toBe(true);
    });

    test("True when center square is all unique starting at middleLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(39, grid)).toBe(true);
    });

    test("True when center square is all unique starting at middleMiddle", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(40, grid)).toBe(true);
    });

    test("True when center square is all unique starting at bottomLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(48, grid)).toBe(true);
    });

    test("True when center square is all unique starting at bottomRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(50, grid)).toBe(true);
    });
    // True - Bottom Right Square
    test("True when bottom right square is all unique starting at topleft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(60, grid)).toBe(true);
    });

    test("True when bottom right square is all unique starting at topRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(62, grid)).toBe(true);
    });

    test("True when bottom right square is all unique starting at middleLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(69, grid)).toBe(true);
    });

    test("True when bottom right square is all unique starting at middleMiddle", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(70, grid)).toBe(true);
    });

    test("True when bottom right square is all unique starting at bottomLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(78, grid)).toBe(true);
    });

    test("True when bottom right square is all unique starting at bottomRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(80, grid)).toBe(true);
    });

    // False - First Square
    test("False when first square has collision starting at topleft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,1,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(0, grid)).toBe(false);
    });
    
    test("False when first square has collision starting at topRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,3,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(2, grid)).toBe(false);
    });
    
    test("False when first square has collision starting at middleRight", () => {
        let grid = [1,4,7,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(11, grid)).toBe(false);
    });
    
    test("False when first square has collision starting at middleMiddle", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,5,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(10, grid)).toBe(false);
    });
    
    test("False when first square has collision starting at bottomLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,6,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(18, grid)).toBe(false);
    });
    
    test("False when first square has collision starting at bottomRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,8,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(20, grid)).toBe(false);
    });
    // False Center Square
    test("False when center square has collision starting at topleft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,6,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(30, grid)).toBe(false);
    });
    
    test("False when center square has collision starting at topRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,2,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(32, grid)).toBe(false);
    });
    
    test("False when center square has collision starting at middleLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(39, grid)).toBe(false);
    });
    
    test("False when center square has collision starting at middleMiddle", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,3,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(40, grid)).toBe(false);
    });
    
    test("False when center square has collision starting at bottomLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(48, grid)).toBe(false);
    });
    
    test("False when center square has collision starting at bottomRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,5,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateAgainstSquare(50, grid)).toBe(false);
    });

    // False - Bottom Right Square
    test("False when bottom right square has a collision starting at topleft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,5,3,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(60, grid)).toBe(false);
    });

    test("False when bottom right square has a collision starting at topRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,7,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(62, grid)).toBe(false);
    });

    test("False when bottom right square has a collision starting at middleLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,8,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(69, grid)).toBe(false);
    });

    test("False when bottom right square has a collision starting at middleMiddle", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,5];
        expect(SudokuSolver.validateAgainstSquare(70, grid)).toBe(false);
    });

    test("False when bottom right square has a collision starting at bottomLeft", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,3,9,7,0,0,0,0,0,0,6,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(78, grid)).toBe(false);
    });

    test("False when bottom right square has a collision starting at bottomRight", () => {
        let grid = [1,4,3,0,0,0,0,0,0,2,5,7,0,0,0,0,0,0,6,9,8,0,0,0,0,0,0,0,0,0,6,8,2,0,0,0,0,0,0,4,3,1,0,0,0,0,0,0,9,7,5,0,0,0,0,0,0,0,0,0,2,9,7,0,0,0,0,0,0,8,5,4,0,0,0,0,0,0,6,1,2];
        expect(SudokuSolver.validateAgainstSquare(80, grid)).toBe(false);
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

    test("False for state with all empty cells", () => {
        let state = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False for state with only 16 populated cells", () => {
        let state = [1,2,3,4,5,6,7,8,9,4,5,6,7,8,9,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];        
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in first row", () => {
        let state = [0,9,6,4,9,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in third row", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,6,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in last row", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,2];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in first column", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,3,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in middle column", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,4,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in last column", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,7,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in top left square", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,1,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in top right square", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,7,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in middle left square", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,9,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in middle middle square", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,8,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in bottom middle square", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,2,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("False when collision in bottom right square", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,5,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(false);
    });

    test("True for example easy sudoku starting state", () => {
        let state = [0,0,1,8,0,0,0,0,0,6,7,0,2,0,3,0,1,0,2,0,5,7,0,0,6,0,3,3,5,0,6,2,0,8,0,0,7,6,2,0,5,8,3,0,0,0,0,0,0,0,4,0,5,0,0,9,0,5,8,6,0,0,0,5,0,0,9,0,0,7,0,0,0,2,6,4,3,0,5,9,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(true);
    });

    test("True for second example easy sudoku starting state", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(true);
    });

    test("True for example medium sudoku starting state", () => {
        let state = [0,0,0,0,4,0,0,6,0,4,0,0,7,0,0,9,8,0,0,8,5,0,1,0,4,0,2,0,0,7,4,0,1,0,0,0,0,0,4,0,0,0,0,0,0,9,3,8,0,0,0,1,4,7,8,0,3,0,0,0,6,5,0,7,5,0,0,8,0,0,0,0,0,0,0,9,5,0,0,3,8];
        expect(SudokuSolver.validateStartingState(state)).toBe(true);
    });

    test("True for example hard sudoku starting state", () => {
        let state = [1,0,0,5,0,0,7,0,9,0,0,8,0,0,0,0,0,2,0,6,0,9,0,0,0,0,0,0,1,0,2,4,0,0,6,0,0,0,7,0,6,0,0,0,0,6,0,0,0,9,1,0,0,0,0,0,0,6,0,9,4,3,0,0,0,0,0,7,4,0,8,1,0,0,0,0,0,0,0,0,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(true);
    });

    test("True for example expert sudoku starting state", () => {
        let state = [5,3,0,0,0,0,0,0,8,0,0,9,0,0,1,0,0,0,0,0,0,0,4,9,0,0,0,4,9,6,0,0,0,8,2,3,0,0,0,0,0,0,0,0,4,0,0,3,0,0,0,0,6,0,1,0,0,7,0,0,4,0,0,0,0,0,0,2,0,5,0,0,0,6,2,0,0,0,0,0,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(true);
    });

    test("True for example evil sudoku starting state", () => {
        let state = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
        expect(SudokuSolver.validateStartingState(state)).toBe(true);
    });
});