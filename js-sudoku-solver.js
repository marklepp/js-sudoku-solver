const stats = {
  backtracks: 0
};


const solve = (sudoku) => {
  printSudoku(sudoku);
  console.log();
  let possibleValues = getPossibleValues(sudoku);
  possibleValues = fillNewCertainValues(sudoku, possibleValues);
  printSudoku(sudoku);
};


const printSudoku = (sudoku) => {
  sudoku.forEach(row => console.log(String(row.map(value => {
    if(value === "") return " "; else return value;
  }))));
};


const fillNewCertainValues = (sudoku, possibleValues) => {
  let newValues = true;
  while (newValues) {
    newValues = false;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (possibleValues[row][col] !== "certain") {
          if (possibleValues[row][col].length === 1) {
            sudoku[row][col] = possibleValues[row][col][0];
            possibleValues[row][col] = "certain";
            newValues = true;
          }
        }
      }
    }
    possibleValues = filterPossibleValues(sudoku,possibleValues);
  }
  return possibleValues;
};


const getPossibleValues = (sudoku) => {
  let possibleValues = sudoku.map(row => row.map(value => {
    if (value == "") {
      return [1,2,3,4,5,6,7,8,9];
    } else {
      return "certain";
    }
  }));
  return filterPossibleValues(sudoku, possibleValues);
};


const filterPossibleValues = (sudoku, possibleValues) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (possibleValues[row][col] !== "certain") {
        possibleValues[row][col] = possibleValues[row][col].filter(value => 
          tryCellValue(sudoku, row, col, value));
      }
    }
  }
  return possibleValues;
};


const remove = (element, array) => {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index,1);
  }
};


const isSudokuCorrect = (sudoku) => {
  if (checkRows(sudoku) && checkColumns(sudoku) && checkBlocks(sudoku)) {
    return true;
  } else {
    return false;
  }
};


const checkRows = (sudoku) => {
  for (let row = 0; row < 9; row += 1) {
    if (!checkNine(sudoku[row])) return false;
  }
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


const tryCellValue = (sudoku, row, column, valueToTry) => {
  sudoku[row][column] = valueToTry;
  if (checkNine(getRow(sudoku,row)) 
      &&  checkNine(getCol(sudoku,column))
      &&  checkNine(getBlock(sudoku,row,column))
     ) {
    sudoku[row][column] = "";
    return true;
  } 
  else {
    sudoku[row][column] = "";
    return false;
  }
};


const getRow = (sudoku, i) => {
  return sudoku[i];
};


const getCol = (sudoku, i) => {
  return sudoku.map(row => row[i]);
};


const getBlock = (sudoku, row, col) => {
  let blockStartRow = Math.floor(row / 3) * 3;
  let blockStartCol = Math.floor(col / 3) * 3;
  
  let block = [];
  for (let brow = blockStartRow; brow < (blockStartRow + 3); brow += 1) { // foreach cell in block
    for (let bcol = blockStartCol; bcol < (blockStartCol + 3); bcol += 1) {
      block.push(sudoku[brow][bcol]);
    }
  }
  return block;
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


const test = (func, ...testInputsAndResults) => {
  const fails = testInputsAndResults.filter(testcase => !(func.func(testcase.input) === testcase.result));
  if (fails.length > 0) {
    fails.forEach(testcase => {
      console.log(func.name, "fails on :", testcase.input);
    });
  } 
  else {
    console.log(func.name, "passes!");
  }
};


const tests = () => {
  test({func: checkNine, name:"checkNine"}
  , {input: [1,2,3,4,5,6,7,8,9], result: true}
  , {input: [1,2,3,5,5,6,7,8,9], result: false}
  , {input: [1,2,3,5,5,"","","",9], result: false}
  , {input: [1,2,3,5,6,"","","",9], result: true}
  );
  let OKSudoku1 = [
    [1,2,3,4,5,6,7,8,9]
  , [4,5,6,7,8,9,1,2,3]
  , [7,8,9,1,2,3,4,5,6]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  ];
  let ColFailSudoku1 = [
    [1,2,3,4,5,6,7,8,9]
  , [4,5,6,7,8,9,1,2,3]
  , [7,8,9,1,2,3,4,5,6]
  , ["","","","","","","","",""]
  , ["",5,"","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  ];
  let RowFailSudoku1 = [
    [1, 5,3,4,5,6,7,8,9]
  , [4,"",6,7,8,9,1,2,3]
  , [7, 8,9,1,2,3,4,5,6]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  ];
  let BlockFailSudoku1 = [
    [1,2,5,4,"",6,7,8,9]
  , [4,5,6,7,8,9,1,2,3]
  , [7,8,9,1,2,3,4,5,6]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  , ["","","","","","","","",""]
  ];
  let realSudoku1 = [
    [5,"",9,"","","","","",7]
  , ["",8,"","",1,"",5,2,""]
  , ["","",3,"",8,4,"","",1]
  , ["",9,"",7,"","","","",2]
  , [4,"","","",5,"",3,9,""]
  , [8,"",2,1,"","","","",4]
  , ["","","",3,"",2,"","",5]
  , ["",4,"","","","",7,"",""]
  , [1,"",7,"",9,"","",8,""]
  ];
  let realSudoku1solved = [
    [5,1,9,6,2,3,8,4,7]
  , [6,8,4,9,1,7,5,2,3]
  , [7,2,3,5,8,4,9,6,1]
  , [3,9,6,7,4,8,1,5,2]
  , [4,7,1,2,5,6,3,9,8]
  , [8,5,2,1,3,9,6,7,4]
  , [9,6,8,3,7,2,4,1,5]
  , [2,4,5,8,6,1,7,3,9]
  , [1,3,7,4,9,5,2,8,6]
  ];
  test({func: checkBlocks, name:"checkBlocks"}
  , {input: OKSudoku1, result: true}
  , {input: BlockFailSudoku1, result: false}
  , {input: RowFailSudoku1, result: true}
  , {input: ColFailSudoku1, result: true}
  , {input: realSudoku1, result: true}
  , {input: realSudoku1solved, result: true}
  );
  test({func: checkRows, name:"checkRows"}
  , {input: OKSudoku1, result: true}
  , {input: BlockFailSudoku1, result: true}
  , {input: RowFailSudoku1, result: false}
  , {input: ColFailSudoku1, result: true}
  , {input: realSudoku1, result: true}
  , {input: realSudoku1solved, result: true}
  );
  test({func: checkColumns, name:"checkColumns"}
  , {input: OKSudoku1, result: true}
  , {input: BlockFailSudoku1, result: true}
  , {input: RowFailSudoku1, result: true}
  , {input: ColFailSudoku1, result: false}
  , {input: realSudoku1, result: true}
  , {input: realSudoku1solved, result: true}
  );
  test({func: isSudokuCorrect, name:"isSudokuCorrect"}
  , {input: OKSudoku1, result: true}
  , {input: BlockFailSudoku1, result: false}
  , {input: RowFailSudoku1, result: false}
  , {input: ColFailSudoku1, result: false}
  , {input: realSudoku1, result: true}
  , {input: realSudoku1solved, result: true}
  );
  console.log(realSudoku1);
  solve(realSudoku1);
};


tests();