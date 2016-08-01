var fun1 = function (previous, current, index, array) {
  console.log(current);
  console.log(typeof(current));
  if (Array.isArray(current)) {
    console.log("array");
    var tmp = merge(previous, current);
    console.log(tmp);
    return tmp;
  } else if (typeof(current) == 'number') {
    console.log("array");
    return previous + current;
  }
  return 0;
};

var merge = function() {
    return Array.prototype.concat.apply([], arguments)
}

var sum1 = [1, 2, 3, 4].reduce(fun1);
console.log(sum1); // 10

var sum2 = [[1,2],[3,4]].reduce(fun1);
console.log(sum2); // 10



