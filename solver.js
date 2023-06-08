// @ts-nocheck
// Easy Sudoku
let easyStateOne = [0,0,1,8,0,0,0,0,0,6,7,0,2,0,3,0,1,0,2,0,5,7,0,0,6,0,3,3,5,0,6,2,0,8,0,0,7,6,2,0,5,8,3,0,0,0,0,0,0,0,4,0,5,0,0,9,0,5,8,6,0,0,0,5,0,0,9,0,0,7,0,0,0,2,6,4,3,0,5,9,0];
// let solvedState = [9,3,1,8,6,5,4,2,7,6,7,8,2,4,3,9,1,5,2,4,5,7,9,1,6,8,3,3,5,4,6,2,9,8,7,1,7,6,2,1,5,8,3,4,9,8,1,9,3,7,4,2,5,6,4,9,7,5,8,6,1,3,2,5,8,3,9,1,2,7,6,4,1,2,6,4,3,7,5,9,8];

let easyStateTwo = [4,8,9,0,0,5,0,0,0,7,0,2,0,4,6,8,3,0,0,0,6,0,0,0,0,4,9,8,7,3,0,6,0,0,0,5,0,2,0,0,8,1,0,6,3,1,0,5,4,7,0,9,0,8,0,0,0,0,0,0,0,8,0,0,3,0,6,0,0,1,5,7,0,0,0,8,1,0,0,0,6];
// let solvedState = [4,8,9,1,3,5,6,7,2,7,5,2,9,4,6,8,3,1,3,1,6,7,2,8,5,4,9,8,7,3,2,6,9,4,1,5,9,2,4,5,8,1,7,6,3,1,6,5,4,7,3,9,2,8,6,9,1,3,5,7,2,8,4,2,3,8,6,9,4,1,5,7,5,4,7,8,1,2,3,9,6];

let easyStateThree = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];

// Medium Sudoku
let mediumState = [0,0,0,0,4,0,0,6,0,4,0,0,7,0,0,9,8,0,0,8,5,0,1,0,4,0,2,0,0,7,4,0,1,0,0,0,0,0,4,0,0,0,0,0,0,9,3,8,0,0,0,1,4,7,8,0,3,0,0,0,6,5,0,7,5,0,0,8,0,0,0,0,0,0,0,9,5,0,0,3,8];
// Hard Sudoku
let hardState = [1,0,0,5,0,0,7,0,9,0,0,8,0,0,0,0,0,2,0,6,0,9,0,0,0,0,0,0,1,0,2,4,0,0,6,0,0,0,7,0,6,0,0,0,0,6,0,0,0,9,1,0,0,0,0,0,0,6,0,9,4,3,0,0,0,0,0,7,4,0,8,1,0,0,0,0,0,0,0,0,0];
// Expert Sudoku
let expertState = [5,3,0,0,0,0,0,0,8,0,0,9,0,0,1,0,0,0,0,0,0,0,4,9,0,0,0,4,9,6,0,0,0,8,2,3,0,0,0,0,0,0,0,0,4,0,0,3,0,0,0,0,6,0,1,0,0,7,0,0,4,0,0,0,0,0,0,2,0,5,0,0,0,6,2,0,0,0,0,0,0];
// Evil Sudoku
let evilState = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];

let startingState = [...hardState];

const SudokuSolver = {
    startingState: startingState,
    // pushedToStateCount: 0,
    SolutionStatus: {
        failed: "Failed",
        succeeded: "Succeeded",
    },
    SolutionFailedReason: {
        invalidStart: "Invalid starting state.",
        noSolutionFound: "Could not find a solution.",
        solutionNotValid: "An invalid solution was found.  This must be a bug."
    },
    solveAndPrint: (state) => {
        let solution = SudokuSolver.solve(state);
        if(solution.status === SudokuSolver.SolutionStatus.failed && solution.message === SudokuSolver.SolutionFailedReason.invalidStart) {
            console.log("Sorry, starting state was invalid");
        } else if(solution.status === SudokuSolver.SolutionStatus.failed && solution.message === SudokuSolver.SolutionFailedReason.noSolutionFound) {
            console.log("Sorry, I could not find a solution");
        } else if(solution.status === SudokuSolver.SolutionStatus.failed && solution.message === SudokuSolver.SolutionFailedReason.solutionNotValid) {
            console.log(this.SolutionFailedReason.solutionNotValid);
            console.log("I was given the following starting state: ");
            console.log(JSON.stringify(state));
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
        let solution = SudokuSolver.takeStep(0, [...state], possibleValues, []);

        let solved = SudokuSolver.checkSolved(state, solution);
        if(solved) {
            result.status = SudokuSolver.SolutionStatus.succeeded,
            result.message = "",
            result.state = solution;
        } else {
            result.message = SudokuSolver.SolutionFailedReason.solutionNotValid,
            result.state = solution;
        }

        return result;
    },
    takeStep: (index, state, possible, solution) => {
        if(index >= state.length) {
            return solution;
        }

        // NOTE: Originally just had if block with state[index] !== 0 condition and no else if
        // Last bug I fixed was here
        // Tests failing with returned solutions missing tons of values
        // What happened was it would come back from a later failure, come here and then end
        // But I needed to still continue
        if(state[index] !== 0 && (solution.length <= index || solution[index] === 0)) { 
            solution.push(state[index]);
            return SudokuSolver.takeStep(index+1,state,possible,solution);
        } else if(state[index] !== 0) {
            solution[index] = state[index];
            return SudokuSolver.takeStep(index+1, state, possible, solution);
        }

        let possibleForIndex = [...possible[index]];

        for(let pvIdx = 0; pvIdx < possibleForIndex.length; pvIdx++) {
            // Go through possible values
            // If possible values is empty, this is not the solution
            // Set solution index to current possible value
            // NOTE: I originally missed the solution.length <= index condition
            // This lead to solution being pushed too every time we also revisited a square
            // after a later failure occured where this square then also wouldn't work
            if(pvIdx === 0 && solution.length <= index) {
                SudokuSolver.pushedToStateCount+=1;
                solution.push(possibleForIndex[pvIdx]);
            } else {
                solution[index] = possibleForIndex[pvIdx];
            }
            // Remove value from all other possible in row/column/square -> cache these
            // By caching what cells had this value removed from possible, I can add back in 
            // If this value doesn't lead to a solution 
            // This saves me from needing to duplicate the possible array of arrays at each step
            let cellsWherePossibleRemoved = SudokuSolver.findAndRemoveFromPossible(index,possibleForIndex[pvIdx], possible);
            SudokuSolver.takeStep(index+1,state,possible,solution);
            if(solution.length === state.length) {
                return solution;
            }
            else {
                // add number back to row/column/square cells where you removed it
                cellsWherePossibleRemoved.forEach((cellIndex) => {
                    possible[cellIndex].push(possibleForIndex[pvIdx]);
                });
            }
        }

        possible[index] = [...possibleForIndex];
        return solution;
    },
    findAndRemoveFromPossible(index, value, possible) {
        let cellsWhereSeen = [];
        let rowIter = 9 * Math.floor(index/9);
        let endOfRow = rowIter+9;
        let startingSquare = SudokuSolver.calculateTopLeftIndex(index);
        let colIter = index%9;
        
        let foundIdx = -1;
        // NOTE: originally accidentally wrote rowIter<9 so any row other than the top one 
        // wouldn't even get checked because row iter started at at least 9
        for(rowIter; rowIter < endOfRow; rowIter++) {
            foundIdx = possible[rowIter].findIndex((pv) => pv === value);
            if(foundIdx >= 0) {
                cellsWhereSeen.push(rowIter);
                possible[rowIter].splice(foundIdx, 1);
            }
        }

        // NOTE: Originally only did colIter++ and ended up checking every cell after starting column cell instead of just each in the column
        for(colIter; colIter < 81; colIter+=9) {
            foundIdx = possible[colIter].findIndex((pv) => pv === value);
            if(foundIdx >= 0) {
                cellsWhereSeen.push(colIter);
                possible[colIter].splice(foundIdx, 1);
            }
        }


        let srIdx = 0;
        let scIdx;
        let cellIndex = 0;
        while(srIdx<3) {
            scIdx = 0;
            while(scIdx < 3) {
                cellIndex = startingSquare+scIdx+(9*srIdx);
                foundIdx = possible[cellIndex].findIndex((pv) => pv === value);
                if(foundIdx >= 0) {
                    cellsWhereSeen.push(cellIndex);
                    possible[cellIndex].splice(foundIdx, 1);
                }
                scIdx++;
            }
            srIdx++;
        }

        return cellsWhereSeen;

    },
    checkSolved: (state, solution) => {
        // NOTE: 
        // - Original state not changed -> This is one of those things that should never even happen, but it's easy enough to check and verify
        // - Solution length === state length
        // - No cell is empty(0)
        // - No collisions found in any rows/columns/squares
        let matchesOriginalState = state.length === solution.length;
        if(matchesOriginalState === false) { return false; }
        let hasEmptyCell = false;

        for(let idx = 0; idx < state.length; idx++) {
            if(state[idx] !== 0 && state[idx] !== solution[idx]) {
                matchesOriginalState = false;
            }
            if(solution[idx] === 0) {
                hasEmptyCell = true;
            }
        }
        
        if(matchesOriginalState === false || hasEmptyCell) { return false; }

        return SudokuSolver.validateStartingState(solution);

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

        // Started writing function and then decided to change to use following steps
        // Build list of seen in row
        // Build list of seen in column
        // Build list of seen in squares
        // Go through grid, possible equal where row,col,square seen is false for all three
        let emptySeen = [false,false,false, false,false,false, false,false,false];
        /**  visited = { 
          1: {
        *       visitedRow: bool
        *       visitedColumn: bool
        *       visitedSquare: bool
        *       rowSeen: []
        *       columnSeen: []
        *       squareSeen: []
        *    }
        *
        * }
        */ 
        let visited = {};

        let row; 
        let column;
        let square;
        let topLeft;
        let resultForCell = [];
        for(let idx = 0; idx < state.length; idx++) {
            if(state[idx] !== 0) { result.push([]); continue; }
            resultForCell = [];
            row = Math.floor(idx/9);
            column = idx%9;
            topLeft = SudokuSolver.calculateTopLeftIndex(idx);
            square = Math.floor(topLeft/9) + Math.floor(topLeft/3%3);
            // Build visited cache for current row
            if(!visited[row]) {visited[row] = {};} 
            if(!visited[row].visitedRow) {
                visited[row].visitedRow = true;
                visited[row].rowSeen = SudokuSolver.getSeenInRow(idx, state, [...emptySeen]);
            }
            // Build visited cache for current column
            if(!visited[column]) {visited[column] = {};} 
            if(!visited[column].visitedColumn) {
                visited[column].visitedColumn = true;
                visited[column].columnSeen = SudokuSolver.getSeenInColumn(idx, state, [...emptySeen]);
            }
            // Build visited cache for current square
            if(!visited[square]) {visited[square] = {};} 
            if(!visited[square].visitedSquare) {
                visited[square].visitedSquare = true;
                visited[square].squareSeen = SudokuSolver.getSeenInSquare(idx, state, [...emptySeen]);
            }
            // Any number not seen in row/column/square is a possible value for this cell
            for(let num=0; num<9; num++) {
                if(visited[row].rowSeen[num] === false && 
                    visited[column].columnSeen[num] === false && 
                    visited[square].squareSeen[num] === false
                ) {
                    resultForCell.push(num+1);
                }
            }

            result.push(resultForCell);
        }
        return result;
    },
    getSeenInRow: (idx, state, seen) => {
        let iter = 9*Math.floor(idx/9);
        let end = iter+8;
        for(iter; iter<=end; iter++) {
            if(state[iter] !== 0) {
                seen[state[iter]-1] = true;
            }
        }
        return seen;
    },
    getSeenInColumn: (idx, state, seen) => {
        let iter = idx%9;
        for(iter; iter<=80; iter+=9) {
            if(state[iter] !== 0) {
                seen[state[iter]-1] = true;
            }
        }
        return seen;
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
        return seen;
    },
};


module.exports = SudokuSolver;