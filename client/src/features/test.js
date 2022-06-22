// const isDecresingNumber = (n) => {
//   if (n < 10) return false;

//   let remainingNum = n;
//   let prevDegit = -1;

//   while (remainingNum > 0) {
//     const lastDigit = remainingNum % 10;
//     if (lastDigit <= prevDegit) return false;

//     prevDegit = lastDigit;

//     remainingNum = Math.trunc(remainingNum / 10);
//   }

//   return true;
// };

const isDecresingNumber = (n) => {
  if (n < 10) return false;

  const numberString = n.toString();

  for (let i = 1; i < numberString.length; i++) {
    if (numberString[i] >= numberString[i - 1]) return false;
  }

  return true;
};

console.log(isDecresingNumber(1));
console.log(isDecresingNumber(-1));
console.log(isDecresingNumber(123));
console.log(isDecresingNumber(321));

//  thong ke so luong tu trong cau

const staticsWords = (str) => {
  if (str === '') return {};

  const wordObj = {};
  const strArr = str.split(' ').filter((word) => word !== '');

  strArr.forEach((word) =>
    wordObj[word] ? (wordObj[word] += 1) : (wordObj[word] = 1)
  );

  return wordObj;
};

console.log(staticsWords('hello hello cac cac ban a'));

const hasAlice = (studentList) => {
  if (!Array.isArray(studentList) || studentList.length === 1) return false;

  return studentList.some(
    (student) => student.name.toLowerCase() === 'Alice'.toLowerCase()
  );
};

const studentList = [
  { id: 1, name: 'a', gender: 'male' },
  { id: 1, name: 'a', gender: 'aaa' },
];

console.log(hasAlice(studentList));

const findStudentbyId = (studentList, studentId) => {
  if (!Array.isArray(studentList) || studentList.length === 0) return -1;

  return studentList.findIndex((student) => student.id === studentId);
};

const findAllPositiveEvenSubArr = (numberList) => {
  if (!Array.isArray(numberList) || numberList.length === 0) return [];

  const allPositiveEvenSubArr = [];
  let subEvenArr = [];

  for (let i = 0; i < numberList.length; i++) {
    const number = numberList[i];
    if (number % 2 === 0) subEvenArr.push(number);

    // need to reset subEvenArr
    if (number % 2 === 1 || i === numberList.length - 1) {
      if (subEvenArr.length >= 2) {
        allPositiveEvenSubArr.push(subEvenArr);
      }
      subEvenArr = [];
    }
  }

  return allPositiveEvenSubArr;
};

console.log(findAllPositiveEvenSubArr([1, 2, 8, 12, 5, 4, 6]));

const mostFrequentNum = (numberList) => {
  if (!Array.isArray(numberList) || numberList.length === 0) return undefined;

  const frequentObj = numberList.reduce((obj, number) => {
    obj[number] = obj[number] ? (obj[number] += 1) : 1;
    return obj;
  }, {});

  let maxKey = undefined;
  for (const key in frequentObj) {
    if (maxKey === undefined || frequentObj[key] > frequentObj[maxKey])
      maxKey = key;
  }

  return Number.parseInt(maxKey);
};

console.log(mostFrequentNum([2, 3, 2, 2, 1, 1, 1, 1, 1, 5]));

const debounce = (callback, time) => {
  let timeoutId = undefined;

  return () => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback();
    }, time);
  };
};

const counterDebounce = debounce(() => {
  console.log('hello');
}, 1000);
counterDebounce();
counterDebounce();
counterDebounce();

setTimeout(() => {
  counterDebounce();
  counterDebounce();
  counterDebounce();
}, 3000);

const throttle = (callback, wait) => {
  let isThrottle;

  return function () {
    if (isThrottle) return;

    isThrottle = true;

    setTimeout(() => {
      callback();
      isThrottle = false;
    }, wait);
  };
};

const logThrottle = throttle(() => {
  console.log('hello');
}, 500);

logThrottle();
logThrottle();
logThrottle();
