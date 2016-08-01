
var GoogleMapApi = function(){};
GoogleMapApi.prototype.show = function(){
    console.log('show map by google api');
};
GoogleMapApi.prototype.display = function(){
    console.log('show map by google api, new version display !!!');
};

var BaiduMapApi = function(){};
BaiduMapApi.prototype.show = function(){
    console.log('show map by baidu api');
};

// param: object
var showMap1 = function(mapObj) {
    mapObj.show();
};

// GoogleMapApi
showMap1(new GoogleMapApi());
// BaiduMapApi
showMap1(new BaiduMapApi());

// param: function
var showMap1 = function(mapShowFunc) {
    mapShowFunc();
};

// GoogleMapApi
showMap1(new GoogleMapApi().display);
// BaiduMapApi
showMap1(new BaiduMapApi().show);
