// Easy Sudoku
let startingState = [0,0,1,8,0,0,0,0,0,6,7,0,2,0,3,0,1,0,2,0,5,7,0,0,6,0,3,3,5,0,6,2,0,8,0,0,7,6,2,0,5,8,3,0,0,0,0,0,0,0,4,0,5,0,0,9,0,5,8,6,0,0,0,5,0,0,9,0,0,7,0,0,0,2,6,4,3,0,5,9,0];
// let startingState = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];
// Medium Sudoku
// let startingState = [0,0,0,0,4,0,0,6,0,4,0,0,7,0,0,9,8,0,0,8,5,0,1,0,4,0,2,0,0,7,4,0,1,0,0,0,0,0,4,0,0,0,0,0,0,9,3,8,0,0,0,1,4,7,8,0,3,0,0,0,6,5,0,7,5,0,0,8,0,0,0,0,0,0,0,9,5,0,0,3,8];
// Hard Sudoku
//let startingState = [1,0,0,5,0,0,7,0,9,0,0,8,0,0,0,0,0,2,0,6,0,9,0,0,0,0,0,0,1,0,2,4,0,0,6,0,0,0,7,0,6,0,0,0,0,6,0,0,0,9,1,0,0,0,0,0,0,6,0,9,4,3,0,0,0,0,0,7,4,0,8,1,0,0,0,0,0,0,0,0,0];
// Expert Sudoku
// let startingState = [5,3,0,0,0,0,0,0,8,0,0,9,0,0,1,0,0,0,0,0,0,0,4,9,0,0,0,4,9,6,0,0,0,8,2,3,0,0,0,0,0,0,0,0,4,0,0,3,0,0,0,0,6,0,1,0,0,7,0,0,4,0,0,0,0,0,0,2,0,5,0,0,0,6,2,0,0,0,0,0,0];
// Evil Sudoku
// let startingState = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];


const SudokuSolver = {
    startingState: startingState,
    SolutionStatus: {
        failed: 0,
        succeeded: 1,
    },
    SolutionFailedReason: {
        invalidStart: "Invalid starting state.",
        noSolutionFound: "Could not find a solution."
    },
    solveAndPrint: (state) => {
      let solution = SudokuSolver.solve(state);
      if(solution.status === SudokuSolver.SolutionStatus.failed && solution.message === SudokuSolver.SolutionFailedReason.invalidStart) {
          console.log("Sorry, starting state was invalid");
      } else if(solution.status === SudokuSolver.SolutionStatus.failed && solution.message === SudokuSolver.SolutionFailedReason.noSolutionFound) {
          console.log("Sorry, I could not find a solution");
      } else if(solution.status === SudokuSolver.SolutionStatus.succeeded && !!solution.state){
          console.log(JSON.stringify(solution));
      } else {
          console.log("I received an unexpected output from solution.");
          console.log("I was given the following starting state: ");
          console.log(JSON.stringify(state));
      }
    },
    solve: (state) => {
        /**
         * Attempts to solve a given sudoku puzzle. 
         * Output is an object with
         *     status: SudokuSolver.SolutionStatus
         *     message: Empty string on success, SudokuSolver.SolutionFailedReason on failure
         *     state: [] on failure, Complete grid array on success
         */
        let result = {
            status: SudokuSolver.SolutionStatus.failed,
            message: SudokuSolver.SolutionFailedReason.invalidStart,
            state: []
        };

        let isValidStartingState = SudokuSolver.validateStartingState(state);
        if(!isValidStartingState) { return result; }

        result.message = SudokuSolver.SolutionFailedReason.noSolutionFound;

        let possibleValues = SudokuSolver.buildPossibleValues(state);
    },
    validateStartingState: (state) => {
        if((!!state && typeof state === 'object' && state.length === 81) === false) { return false; }
        let idx = 0;
        let valid = true;
        // Quick google search suggests, minimum number of cells with values to be solveable to be 17
        let cellsWithValuesCount = 0;

        while(idx < state.length && valid === true) {
            // Going from top left to bottom right, so only need to check to right and below.  
            // Could probably also avoid a in-square checks, but fine for now.
            if(state[idx] !== 0) { cellsWithValuesCount++; }
            valid = SudokuSolver.validateIsNumber(state[idx]) && SudokuSolver.validateAgainstRowToRight(idx, state) && 
                SudokuSolver.validateAgainstColumnBelow(idx, state) && SudokuSolver.validateAgainstSquare(idx, state);            
            idx++;
        } 
        return valid && cellsWithValuesCount>=17;
    },
    validateIsNumber: (value) => (typeof value === 'number' && value >= 0 && value <= 9),
    validateRow: (index, state) => {
        return SudokuSolver.validateAgainstRowToLeft(index, state) && SudokuSolver.validateAgainstRowToRight(index, state);
    },
    validateAgainstRowToRight: (index, state) => {
        if(state[index] === 0) { return true; }

        let countToCheck = 8-(index%9);
        let valid = true;
        for(let numToRight = 1; numToRight<=countToCheck; numToRight++) {
            if(state[index+numToRight] === state[index]) {
                valid = false;
            }
        }
        return valid;
    },
    validateAgainstRowToLeft: (index, state) => {
        if(state[index] === 0) { return true; }

        let countToCheck = index%9;
        let valid = true;
        for(let numToLeft = 1; numToLeft<=countToCheck; numToLeft++) {
            if(state[index-numToLeft] === state[index]) {
                valid = false;
            }
        }
        return valid;
    },
    validateColumn: (index, state) => {
        return SudokuSolver.validateAgainstColumnAbove(index, state) && SudokuSolver.validateAgainstColumnBelow(index, state);
    },
    validateAgainstColumnBelow: (index, state) => {
        if(state[index] === 0) { return true; }

        let valid = true;
        for(let below=index+9; below<81; below+=9) {
            if(state[below] === state[index]) {
                valid = false;
            }
        }
        return valid;
    },
    validateAgainstColumnAbove: (index, state) => {
        if(state[index] === 0) { return true; }

        let valid = true;
        for(let above=index-9; above>=0; above-=9) {
            if(state[above] === state[index]) {
                valid = false;
            }
        }
        return valid;
    },
    validateAgainstSquare: (index, state) => {
        if(state[index] === 0) { return true; }

        let topLeftIndex = SudokuSolver.calculateTopLeftIndex(index);
        let valid = true;
        let rowIdx = 0;
        let colIdx;
        let cellIndex = 0;
        while(valid && rowIdx<3) {
            colIdx = 0;
            while(valid && colIdx < 3) {
                cellIndex = topLeftIndex+colIdx+(9*rowIdx);
                if(index !== cellIndex && state[index] === state[cellIndex]) {
                    valid = false;
                }
                colIdx++;
            }
            rowIdx++;
        }
        return valid;
    },
    calculateTopLeftIndex: (index) => {
        // Squares are 3x3 chunks of overall grid
        // What square the row is can be calculated using index/9 to get row and then /3 to top/middle/bottom chunk.  Simplify to index/27
        // Square column can be calculated by num/3%3 to get left/middle/right chunk.
        // Now that we have a x/y of 0<=x<=2 and 0<=y<=2, we can convert that into the index of the top left of that square by doing
        // 27*SquareRow + 3*SquareColumn
        return (27*Math.floor(index/27)) + (3*Math.floor(index/3%3));
    },
    buildPossibleValues: (state) => {
        let result = [];
        let seen = [false,false,false, false,false,false, false,false,false];

        // Started writing function and then decided to change to use following steps
        // Build list of seen in row
        // Build list of seen in column
        // Build list of seen in squares
        // Go through grid, possible equal where row,col,square seen is false for all three
        
        // This needs to be changed
        // for(let idx = 0; idx < state.length; idx++) {
        //     if(state[idx] !== 0) {
        //         result.push([]);
        //     } else {
        //         seen = [false,false,false, false,false,false, false,false,false];
        //         // Explicitly use side effects here
        //         SudokuSolver.getSeenInRow(idx, state, seen);
        //         SudokuSolver.getSeenInColumn(idx, state, seen);
        //         SudokuSolver.getSeenInSquare(idx, state, seen);

        //         let possible = [];
        //         seen.forEach((val, index) => {if(val) { possible.push(index+1)}});


        //     }
        // }
    },
    getSeenInRow: (idx, state, seen) => {
        let iter = 9*Math.floor(idx/9);
        let end = iter+8;
        for(iter; iter<=end; iter++) {
            if(state[iter] !== 0) {
                seen[state[iter]-1] = true;
            }
        }
    },
    getSeenInColumn: (idx, state, seen) => {
        let iter = idx%9;
        for(iter; iter<=80; iter+=9) {
            if(state[iter] !== 0) {
                seen[state[iter]-1] = true;
            }
        }
    },
    getSeenInSquare: (idx, state, seen) => {
        let topLeftIdx = SudokuSolver.calculateTopLeftIndex(idx);
        let rowIdx = 0;
        let colIdx;
        let cellIndex = 0;
        while(rowIdx<3) {
            colIdx = 0;
            while(colIdx < 3) {
                cellIndex = topLeftIdx+colIdx+(9*rowIdx);
                if(state[cellIndex] !== 0) {
                    seen[state[cellIndex]-1] = true;
                }
                colIdx++;
            }
            rowIdx++;
        }
    },
};


module.exports = SudokuSolver;