function buildFun(n) {

    var res = [];

    for (var i = 0; i < n; i++) {
      (function () {
        var count = i;
        res.push(function() {
              return count;
        });
      })();
      
    }
    return res;
}

//замыкаем объявление count и присвоение ей переменной счетчика и выполнение пуша в массив, count не всплывает