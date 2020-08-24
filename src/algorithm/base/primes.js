// 计算素数
const countPrimes = (n) => {
  let isPrim = new Array(n).fill(true);

  for (let i = 2; i * i < n; i++) {
    if (isPrim[i]) {
      // i 的倍数不可能是素数
      for (let j = i * i; j < n; j += i) {
        isPrim[j] = false;
      }
    }
  }

  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrim[i]) {
      count++;
    }
  }

  return count;
}

countPrimes(19);
