console.time('Add 1000000 records');
var rec = [];
for (var i = 0; i < 1000000; i++) {
  rec.push(1);
}
console.timeEnd('Add 1000000 records');
//	> Add 1000000 records: 59ms