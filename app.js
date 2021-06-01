let matrix;

const Determinante = (mat) => {
  const rows = mat.length;
  const cols = mat[0].length;
  if (rows != cols) return console.warn("rows ≠ columns");

  let extended = [...mat];
  for (let row = 0; row < mat.length - 1; row++) {
    extended.push(mat[row]);
  }

  let str = "Det = ";
  let negStr = "";

  let positive = 0;
  let negative = 0;

  for (let r = 0; r < extended.length - cols + 1; r++) {
    let pos_mul = 1;
    let neg_mul = 1;
    for (let c = 0; c < mat[r].length; c++) {
      const posItem = extended[r + c][c];
      const negItem = extended[r + c][mat[r].length - 1 - c];
      pos_mul *= posItem;
      neg_mul *= negItem;
      str += posItem + "*";
    }
    positive += pos_mul;
    negative += neg_mul;
  }

  return positive - negative;
};

const createMatrix = (size) => {
  size = parseInt(size);
  document.getElementById("matrix_generator").className = "inputs hide";
  document.getElementById("matrix_container").className = "";
  let matrix_element = document.getElementById("matrix");

  let mat_innerHTML = "";

  matrix = [];

  for (let row = 0; row < size; row++) {
    let row_element = "<div class='row'>";
    let row_mat = [];
    for (let col = 0; col < size; col++) {
      row_mat.push(0);
      const placeholder = "" + (row + 1) + "" + (col + 1);
      row_element += `<input required class="mat_item" type="number" onchange="getItemValue(this)" placeholder="${placeholder}"/>`;
    }
    row_element += "</div>";
    mat_innerHTML += row_element;
    matrix.push(row_mat);
  }
  console.log(matrix);

  matrix_element.innerHTML = mat_innerHTML;
};

const getItemValue = (element) => {
  let rowIndex = Array.from(element.parentNode.parentNode.children).indexOf(
    element.parentNode
  );
  let colIndex = Array.from(element.parentNode.children).indexOf(element);

  matrix[rowIndex][colIndex] = parseFloat(element.value);
};

const ComputeMatrix = () => {
  const det = Determinante(matrix);
  alert("El determinante de la matriz es: " + det);
  return false;
};
