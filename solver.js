// Easy Sudoku
let startingState = [0,0,1,8,0,0,0,0,0,6,7,0,2,0,3,0,1,0,2,0,5,7,0,0,6,0,3,3,5,0,6,2,0,8,0,0,7,6,2,0,5,8,3,0,0,0,0,0,0,0,4,0,5,0,0,9,0,5,8,6,0,0,0,5,0,0,9,0,0,7,0,0,0,2,6,4,3,0,5,9,0];
// Medium Sudoku
// let startingState = [0,0,0,0,4,0,0,6,0,4,0,0,7,0,0,9,8,0,0,8,5,0,1,0,4,0,2,0,0,7,4,0,1,0,0,0,0,0,4,0,0,0,0,0,0,9,3,8,0,0,0,1,4,7,8,0,3,0,0,0,6,5,0,7,5,0,0,8,0,0,0,0,0,0,0,9,5,0,0,3,8];
// Hard Sudoku
//let startingState = [1,0,0,5,0,0,7,0,9,0,0,8,0,0,0,0,0,2,0,6,0,9,0,0,0,0,0,0,1,0,2,4,0,0,6,0,0,0,7,0,6,0,0,0,0,6,0,0,0,9,1,0,0,0,0,0,0,6,0,9,4,3,0,0,0,0,0,7,4,0,8,1,0,0,0,0,0,0,0,0,0];
// Export Sudoku
// let startingState = [5,3,0,0,0,0,0,0,8,0,0,9,0,0,1,0,0,0,0,0,0,0,4,9,0,0,0,4,9,6,0,0,0,8,2,3,0,0,0,0,0,0,0,0,4,0,0,3,0,0,0,0,6,0,1,0,0,7,0,0,4,0,0,0,0,0,0,2,0,5,0,0,0,6,2,0,0,0,0,0,0];
// Evil Sudoku
// let startingState = [0,9,6,4,0,2,0,0,7,1,0,0,0,0,0,0,9,0,3,0,0,0,6,0,0,0,0,0,0,0,8,0,0,0,0,3,0,2,9,0,4,0,0,8,0,0,1,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,0,0,0,8,4,0,2,0,0,3,0];


const SudokuSolver = {
    startingState: startingState,
    validateStartingState: (state) => {
        if((!!state && typeof state === 'object' && state.length === 81) === false) { return false; }
        let idx = 0;
        let valid = true;
        
        while(idx < state.length && valid === true) {
            // Pass - All numbers between 0-9
            valid = SudokuSolver.validateIsNumber(state[idx]);
            // No row collisions
            // No column collisions
            // No square collisions
            idx++;
        } 
        return valid;
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
    }
};


module.exports = SudokuSolver;