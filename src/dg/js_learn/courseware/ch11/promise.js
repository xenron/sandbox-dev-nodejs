/*
   我们在前面的课程里讲过，可以使用XHR(XmlHttpRequest)来实现异步调用
   通过传入回调函数来实现控制反转。
   这种方式为js带来强大的灵活性的同时，也存在者嵌套调用和并发的问题
   主要是:嵌套太深，代码可读性差；并行逻辑必须串行执行
   
*/

var  req = function(url,sucFn,errFn){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState ===4 && xmlhttp.status==200){
		     sucFn(xhr.responseText);
		}else {
			errFn(new Error({message:xhr.status}));
		}
	};
	xhr.open('get',url,true);
	xhr.send(null);
}
//此时假设我们有个功能，需要两个查询结果集合并处理，两个查询结构集又是不同的链接返回的
//因为异步的关系，我们不知道每一个查询什么时候返回结果，所以在外部串行是不可行的
//需要在内部嵌套调用，比如
req('query1.do',function(data1){
	request('query2.do',function(data2){
		console.log(data2+data1);
	},function(err2){
		console.error(err2);
	});
},function(err){
	console.error(err);
});
//像这样的代码，可读性差，而且如果两个结果不互相依赖，串行执行，增加了等待的时间
//这就是传说中的回调金字塔，当异步任务很多的时候，维护大量的callback将是一场灾难

/*
  Promise是上述问题的一种解决方案.
  Promise是一种异步编程模式，代表一种可能会长时间运行而且不一定必须完整的操作的结果
  这种模式不会阻塞和等待长时间的操作完成，而是返回一个代表了承诺（promised）结果的对象，代表一个异步操作的最终结果
  
  从字面上理解，Promise就是承诺的意思，比如A调用B，B给A一个承诺，于是，A就可以这样计划,当B返回结果时，就执行方案1
  如果B因为什么原因没有返回预料中的结果，则执行预急方案。这样风险可控。
  
*/
var resB = B();
var resA = function{
	resB.then(execF1,execF2);
}
resA();
//实际上，跟Promise交互的主要方式是通过它的then方法来注册回调函数来接收promise的最终结果或者promise不能完成的原因
/*
   Promise规范
   1. 一个Promise对象有三种状态：pending(等待),fullfilled(已完成),rejected(已拒绝)
   2. 一个Promise对象的状态只能从等待转到完成的状态或者拒绝的状态，同时完成的状态和拒绝的状态不能互相转换
   3. Promise必须实现then方法,可以说then方法是Promise的核心,而且then方法必须返回一个Promise对象，
      同一个promise的then可以调用多次，并且回调的执行顺序跟它们被定义时的顺序一致
   4. then方法接受两个参数，第一个参数是成功时的回调，在promise由“等待”态转换到“完成”态时调用，
      另一个是失败时的回调，在promise由“等待”态转换到“拒绝”态时调用。
	  同时，then可以接受另一个promise传入，也接受一个“类then”的对象或方法，即thenable对象
   由此规范，我们可以想像得到，一个Promise对象应该是什么样的
*/
var Promise = function () {
        /* initialize promise */
};
 Promise.prototype.then = function (onResolved, onRejected) {
     /* invoke handlers based upon state transition */
 };
 Promise.prototype.resolve = function (value) {
     /* move from unfulfilled to resolved */
 };

 Promise.prototype.reject = function (error) {
     /* move from unfulfilled to rejected */
 };
//如此，我们可以对上面的方法进行改写

var  req = function(url){
	var xhr = new XMLHttpRequest();
	return new Promise(resolve,reject){
		xhr.onreadystatechange = function(){
		if(xhr.readyState ===4 && xmlhttp.status==200){
		     resolve(xhr.responseText);
		}else {
			reject(new Error({message:xhr.status}));
		}
	};
	xhr.open('get',url,true);
	xhr.send(null); 
  }
};
//req返回一个Promise，可以使用then方法，指定其完成状态的回调函数和拒绝状态的回调函数

req('query1.do').then(function(data){
	console.log(data);
},function(err){
	console.log(err);
});
//以上纯粹的单请求，并不能体现这种编程模式的优势，如果是并行的请求呢？
//这时我们要实现when方法
Promise.when = function () {
    /* handle promises arguments and queue each */
};
//这样我们就可以这样弄

var promise1 ,promise2;
promise1 = req('query1.do');
promise2 = req('query2.do');
Promise.when(promise1,promise2).then(function(data1,data2){
	console.log(data1+data2);
},handleError);

//when函数会等待两个promise对象的状态发生变化再做具体的处理
//举例说明

//目前多数高级的浏览器都实现了Promise,很多框架也有各自的Promise实现，那么在angular里怎么实现Promise呢
//在ANGULAR中使用promise,需要借助于$q服务
/*
$q采用的是promise式的异步编程。
先使用$q的defer()方法创建一个deferred对象，
然后通过deferred对象的promise属性，将这个对象变成一个promise对象；
这个deferred对象还提供了三个方法，分别是resolve(),reject(),notify()
*/

var app = angular.module('app',[]);
app.controller('promise',function($q,$http){
//创建了一个defer对象;
var defer = $q.defer(); 
//创建了defer对象对应的promise
var promise = defer.promise;
//promise对象定义了成功回调函数,失败回调函数
promise.then(function(data){console.log('成功'+data)},
               function(data){console.log('失败'+data)}); 
//对promise发起通知: 1.执行这段代码的时候就是执行回调的时候, 
//2.调用resolve方法,表示需要被执行的是成功的回调
//3.resolve里的参数就是回调执行的时候需要被传入的参数  
defer.resolve('code_bunny');
});

/*
promise式异步有两个重要的对象,一个defer对象,一个promise对象,每个defer对象都有和它绑定的promise对象,他们之间的关系是一一对应的。
defer对象负责告知promise对象什么时候执行回调,执行什么回调,回调执行的时候传入什么参数。
而promise对象负责接收来自defer对象的通知,并且执行相应的回调
*/
/*
 $q的方法:
$q.defer(): 返回一个对象.一般把它赋值给defer变量
*/
var defer = $q.defer();
//defer的方法:
defer.resolve(data)//对promise发起通知,通知执行成功的回调,回调执行的参数为data
defer.reject(data) //对promise发起通知,通知执行失败的回调,回调执行的参数为data
defer.notify(data)//对promise发起通知,通知执行进度的回调,回调执行的参数为data
//defer的属性:
defer.promise
//defer.promise的属性
defer.promise.$$v //promise的$$v对象就是对应的defer发送的data,当defer还没有发送通知时,$$v为空
//defer.promise的方法
defer.promise.then([success],[error],[notify])//.then方法接受三个参数,均为函数,函数在接受到defer发送通知时被执行,函数中的参数均为defer发送通知时传入的data
// [success]: 成功回调,defer.resolve()时调用;[error]: 失败回调,defer.reject()时调用;[notify]: 进度回调,defer.notify()时调用
/*
.then()方法返回一个promise对象,可以接续调用.then()。
注意,无论.then()是调用的success函数,还是error函数,还是notify函数
,发送给下一个promise对象的通知一定是成功通知,而参数则是函数的返回值.
也就是说,then()方法里的函数被执行结束后,即为下一个promise发送了成功通知,并且把返回值作为参数传递给回调.
*/        .
var app = angular.module('Async',[]);
//defer.resolve(),defer.reject(),defer.notify()
app.controller('promise',function($q,$http,$scope){
    var defer = $q.defer();         //创建了一个defer对象;
    var promise = defer.promise;    //创建了defer对象对应的promise
    promise.then(function(data){$scope.name='成功'+data},
	              function(data){$scope.name='失败'+data},
				  function(data){$scope.name='进度'+data});
    $http({
        method:'GET',
        url:'/name'
    }).then(function(res){
        defer.resolve(res.data)
    },function(res){
        defer.reject(res.data)
    })
});
//链式调用
var app = angular.module('Async',[]);
//.then()的链式调用
app.controller('promise',function($q,$http,$scope){
    var defer = $q.defer();         //创建了一个defer对象;
    var promise = defer.promise;    //创建了defer对象对应的promise
    promise.then(function(data){
        $scope.name='成功'+data;
        return data+'2'
    },function(data){
        $scope.name='失败'+data;
        return data+'2'
    },function(data){
        $scope.name='进度'+data;
        return data+'2'
    }).then(function(data){
        $scope.name2 = '成功'+data
    },function(data){
        $scope.name2 = '失败'+data
    });
    $http({
        method:'GET',
        url:'/name'
    }).then(function(res){
        defer.resolve(res.data)
    },function(res){
        defer.reject(res.data)
    })
});

//第二个方法
defer.promise.catch([callback])
//相当于.then(null,[callback])的简写. 直接传入失败回调.返回一个promise对象.发给下一个promise对象的通知依然是成功通知.data值就是回调的返回值.            
app.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promis
    promise.catch(function (data) {
        $scope.name = data;
        return data+2
    }).then(function (data) {
           $scope.name2 = '成功' + data
        }, function (data) {
            $scope.name2 = '失败' + data
        });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer.resolve(res.data)
        }, function (res) {
            defer.reject(res.data)
        })
});
//第三个方法
defer.promise.finally([callback])
//.finally只接受一个回调函数,而且这个回调函数不接受参数.无论defer发送的通知是成功,失败,进度,这个函数都会被调用
app.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;
    var promise = defer.promise;    //创建了defer对象对应的promise
    promise.finally(function () {
        $scope.name = '已接收通知';
        return 'code_dog';
    }).then(function (data) {
            $scope.name2 = '成功' + data
        }, function (data) {
            $scope.name2 = '失败' + data
        });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer.resolve(res.data)
        }, function (res) {
            defer.reject(res.data)
        })
});
//$q.reject(data)在promise的.then(funciton(){})函数里面调用.作用是给.then()返回的下一个promise发送错误信息,并且给错误回调传入参数data
app.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;
    var promise = defer.promise;    //创建了defer对象对应的promise
    promise.then(function (data) {
        return $q.reject(data+'2')
    },function(){
        return $q.reject(data+'2')
    }).then(function (data) {
            $scope.name2 = '成功' + data
        }, function (data) {
            $scope.name2 = '失败' + data
        });
    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer.resolve(res.data)
        }, function (res) {
            defer.reject(res.data)
        })
});

//.finally方法里调用
app.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;
    var promise = defer.promise;    //创建了defer对象对应的promise
    promise.finally(function () {
        return $q.reject('code_dog')
    }).then(function (data) {
            $scope.name2 = '成功' + data
        }, function (data) {
            $scope.name2 = '失败' + data
        });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer.resolve(res.data)
        }, function (res) {
            defer.reject(res.data)
        })
});

// $q.all接受一个数组类型的参数,数组的值为多个promise对象.它返回一个新的promise对象
//当数组中的每个单一promise对象都收到了成功通知,这个新的promise对象也收到成功通知(回调参数是一个数组,数组中的各个值就是每个promise收到的data,
//注意顺序不是按照单个promise被通知的顺序,而是按照[promise1,promise2]这个数组里的顺序)
// 当数组中的某个promise对象收到了失败通知,这个新的promise对象也收到失败通知,回调参数就是单个promise收到的失败通知的回调参数
app.controller('promise', function ($q, $http, $scope) {
    var defer1 = $q.defer();         //创建了一个defer1对象;
    var promise1 = defer1.promise;    //创建了defer1对象对应的promise1
    var defer2 = $q.defer();         //再创建了一个defer2对象;
    var promise2 = defer2.promise;    //创建了新的defer2对象对应的promise2

    //promise1收到通知后执行的回调:给name1和name2赋值
    promise1.then(function (data) {
        $scope.name1 = data;
        return data+'.2'
    },function(data){
        $scope.name1 = data;
        return data+'.2'
    }).then(function (data) {
            $scope.name2 = 'promise1成功' + data
        }, function (data) {
            $scope.name2 = 'promise1失败' + data
        });
    //promise2收到通知后执行的回调:给age1和age2赋值
    promise2.then(function (data) {
        $scope.age1 = data;
        return data+'.2'
    },function(data){
        $scope.age1 = data;
        return data+'.2'
    }).then(function (data) {
            $scope.age2 = 'promise2成功' + data
        }, function (data) {
            $scope.age2 = 'promise2失败' + data
        });
    
    //创建一个promise3,它依赖于promise1和promise2
    var promise3 = $q.all([promise1,promise2]);
    promise3.then(function(data){
        $scope.three = data;
    },function(data){
        $scope.three = data;
    });

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
            defer1.resolve(res.data)
        }, function (res) {
            defer1.reject(res.data)
        });

    $http({
        method: 'GET',
        url: '/age'
    }).then(function (res) {
            defer2.resolve(res.data)
        }, function (res) {
            defer2.reject(res.data)
        })
});
//.when接受四个参数,其中,第二,第三,第四个参数都是函数,相当于promise.then()里面的三个参数. 第一个参数有两种可能:
// 1. 第一个参数不是promise对象: 直接调用成功回调,回调的参数就是第一个参数本身
$q.when(obj,[success],[error],[notify])
app.controller('promise', function ($q, $http, $scope) {

    $q.when('code_dog',function(data){
        $scope.name = data;
        return data+'2'
    },function(data){
        $scope.name = data;
        return data+'2'
    }).then(function (data) {
        $scope.name2 = '成功' + data
    }, function (data) {
        $scope.name2 = '失败' + data
    });

});
// 2. 第一个参数是一个promise对象
 /*
 当这个promise对象收到通知的时候,调用回调.回调就是第二,三,四个参数...(相当于.then([success],[error],[notify]))
 另外,.when()返回的对象也就相当于.then()返回的对象.都是一个新的promise对象,都可以接收到回调发送的通知和参数...
 可以理解为*/
var defer = $q.defer(); 
defer.promise.then([success],[error],[notify])
//这一段也可以写成: 
var defer = $q.defer();
$q.when(defer.promise,[success],[error],[notify])

app.controller('promise', function ($q, $http, $scope) {
    var defer = $q.defer();         //创建了一个defer对象;

    var promise = defer.promise;    //创建了defer对象对应的promise

    $q.when(promise,function(data){
        $scope.name = data;
        return data+'2'
    },function(data){
        $scope.name = data;
        return data+'2'
    }).then(function (data) {
        $scope.name2 = '成功' + data
    }, function (data) {
        $scope.name2 = '失败' + data
    });
    
    /* 这样写得到的结果也是等价的.    
    promise.then(function(data){
        $scope.name = data;
        return data+'2'
    },function(data){
        $scope.name = data;
        return data+'2'        
    }).then(function (data) {
        $scope.name2 = '成功' + data
    }, function (data) {
        $scope.name2 = '失败' + data
    });
    */

    $http({
        method: 'GET',
        url: '/name'
    }).then(function (res) {
        defer.resolve(res.data)
    }, function (res) {
        defer.reject(res.data)
    });

});