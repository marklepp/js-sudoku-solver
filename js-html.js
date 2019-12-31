var nhtml = (htmlArray) => {
  let [type, attributes, ... children] = htmlArray;
  let newEle = document.createElement(type);
  for (attribute in attributes) {
    if (attribute.slice(0,2) === "on" && typeof(attributes[attribute]) === "function") {
      newEle.addEventListener(attribute.slice(2).toLowerCase(), attributes[attribute] ,false);
    }
    else{
      newEle.setAttribute(attribute, attributes[attribute]);
    }
  }
  children.forEach(child => {
    if (typeof(child) === typeof("string")) {
      newEle.appendChild(document.createTextNode(child));
    }
    else if (Array.isArray(child)) {
      newEle.appendChild(nhtml(child));
    }
    else if (typeof(child) === "function") {
      newEle.appendChild(child());
    }
    else {
      newEle.appendChild(child);
    }
  });
  return newEle;
};


const SudokuCell = (row,col) => {
  let options = ["","1","2","3","4","5","6","7","8","9"];
  return [
    "td",{key: col},  
    ["select",{}]
      .concat(
        options.map((option) => ["option",{value: option}, option])
      )
  ];
};


const App = () =>{
  let zeroto8 = [0,1,2,3,4,5,6,7,8];
  return [
    "div", {},
      ["h1", {}, "Sudoku solver"],
      ["p",{}, "Enter sudoku and press 'solve'"],
      ["table", {},
      ].concat(zeroto8.map(row => {
          return ["tr",{key: row},].concat(
            zeroto8.map(col =>  SudokuCell(row,col))
          );
      }))
  ];
};


document.body.appendChild(nhtml(App()));