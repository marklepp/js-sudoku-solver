const stats = {
  backtracks: 0
};


const remove = (element, array) => {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index,1);
  }
};


const isCorrect = (sudoku) => {
  if (checkRows(sudoku) && checkColumns(sudoku) && checkBlocks(sudoku)) {
    return true;
  } else {
    return false;
  }
};


const checkRows = (sudoku) => {
  sudoku.forEach(row => {
    if (!checkNine(row)) return false;
  });
  return true;
};


const checkColumns = (sudoku) => {
  for (let i = 0; i < 9; i++) {
    let col = sudoku.map(row => row[i]);
    if (!checkNine(col)) return false;
  }
  return true;
};


const checkBlocks = (sudoku) => {
  for (let brow = 0; brow < (3*3); brow += 3) { // foreach block
    for (let bcol = 0; bcol < (3*3); bcol += 3) {
      let block = [];
      for (let row = brow; row < (brow + 3); row += 1) { // foreach cell in block
        for (let col = bcol; col < (bcol + 3); col += 1) {
          block.push(sudoku[row][col]);
        }
      }
      if (!checkNine(block)) return false;
    }
  }
  return true;
};


const checkNine = (() => {
  let emptyNine = {"": 0}; // empty cell: ""
  for (let i = 1; i < 10; i++) {
    emptyNine[i] = 0;
  }
  return (nine) => {
    let howManyEach = Object.assign({}, emptyNine);
    
    nine.forEach(value => {
      howManyEach[value] += 1;
    });
    
    for (let i = 1; i < 10; i++) {
      if (howManyEach[i] > 1) return false;
    }
    return true;
  };
})();