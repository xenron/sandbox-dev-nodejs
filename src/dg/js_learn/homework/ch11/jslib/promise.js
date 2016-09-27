/**
 * 
 */

function ajax(method, url, data) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}
function test(){
	var p = ajax('GET', 'source/ajax.htm');
	/*p.then(function (text) { // 如果AJAX成功，获得响应内容
	    alert(text);
	}).catch(function (status) { 
	   alert('ERROR: ' + status);// 如果AJAX失败，获得响应代码
	});*/
	
	p.then(function (text) { // 如果AJAX成功，获得响应内容
	    alert(text);
	},function (status) { 
	   alert('ERROR: ' + status);// 如果AJAX失败，获得响应代码
	});
}

function test2(){
	var p1 = ajax('GET', 'source/ajax.htm');
	var p2 = ajax('GET', 'source/ajax.htm');
    Promise.all([p1,p2]).then(function(data){
    	alert(data);
    },function (status) { 
	   alert('ERROR: ' + status);// 如果AJAX失败，获得响应代码
	});
    
}