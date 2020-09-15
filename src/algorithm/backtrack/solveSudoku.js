// 解数独


var solveSudoku = function (board) {

  backtrack(board, 0, 0);

  function backtrack(board, row, col) {
    var m = 9,
      n = 9;
    // 每一行的最后一列
    if (col == n) {
      return backtrack(board, row + 1, 0);
    }

    if (row == m) {
      // 找到一个可行解，触发 base case
      return true;
    }

    if (board[row][col] != '.') {
      return backtrack(board, row, col + 1);
    }

    for (var ch = '1'; ch <= '9'; ch++) {
      if (!isVerify(board, row, col, ch)) {
        continue;
      }

      board[row][col] = String(ch)
      if (backtrack(board, row, col + 1)) {
        return true;
      }
      board[row][col] = '.';
    }

    return false;
  }
  return board
};

function isVerify(board, r, c, n) {
  for (var i = 0; i < 9; i++) {
    if (board[r][i] == n) {
      return false;
    }

    if (board[i][c] == n) {
      return false;
    }

    if (board[parseInt(r / 3) * 3 + parseInt(i / 3)][parseInt(c / 3) * 3 + i % 3] == n) {
      return false
    }

  }
  return true

}


var b = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]

// var c = [
//   [".", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"]
// ]

var ans = solveSudoku(b)
console.log(ans);
