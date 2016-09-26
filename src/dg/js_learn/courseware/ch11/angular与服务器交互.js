/*

  ʹ��$http����ͨ��
  
  ����ajaxӦ����˵�����������������Ĵ�ͳ��ʽ��:
  ��ȡһ��XMLHttpRequest��������á��������󡢶�ȡ��Ӧ�����״̬�룬��������˵���Ӧ
  ����֮ǰ������ajaxʹ����·
*/

//��ȡXMLHttpRequest������Ҫ���ݲ�ͬ�������
if (window.XMLHttpRequest){
  xmlhttp=new XMLHttpRequest();
}
else{// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
//���ûص����������첽���óɹ�֮����Щ��������
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        //do somethint 
    }
  }
 //���������������
xmlhttp.open("GET",url,true);
xmlhttp.send();
};

/*
   ���ڼ򵥡����á����һᾭ���ظ���������˵�����������ǳ�֮���������Ҫ���ã�Ҫô��װ��Ҫôʹ�ô����
   
   Angular XHR API �������ṩ��XHR�������ͨ�ŵķ���
*/
$http.get('maWeb/ssqquery',{params:{date:'20160728'}}).
success(function(data,status,headers,config){
	....
}).error(function(data,status,headers,config){
	....
});
/*
data ��Ӧ��
status ��Ӧ��״ֵ̬
headers ��ȡͷ��Ϣ��getter�ĺ���
config �����е�config����
*/

//$http.get��ANGULAR js�ĺ��ķ���$http���ṩ���ڶ��ݷ���֮һ��
//ǰ������ѧ��jquery��ANGULAR���첽����Ĵ�����ǳ�����
//����get������Ҳ���Է���post����

var  postdata ={remark:'It is good!'};
var config = {params:{date:'20160728'}};
$http.post('maWeb/ssqquery',postdata,config).success(function(data,status,headers,config){
	....
}).error(function(data,status,headers,config){
	....
});
//���Ƶģ��������¿�ݷ���
$http.put/post(url,data,config) url��name���config��ѡ
$http.get/delete/jsonp/head(url,config) url���config��ѡ

//����ķ�������angular��װ�õĿ�ݷ�����ʹ��������Լ򵥣�������ʱ�򣬻���ڿ������Ͳ��ѵ�ȱ��
//��������ʵ��һЩ�Ƚ���������ñ�����������һЩ��Ȩͷ���޸ĶԻ���Ĵ���ʽ�ȣ��ͻ���������
//����Щ����£����ǿ��Ը����󴫵�һ����ѡ�����ö��󣬴Ӷ������������ȵ�����
$http(config);
//α����
$http({
	method:string,
	url:string,
	params:object,
	data:string or object,
	headers: object
	transformRequest:function transform(data,headersGetter) or an arra of functions,
	transformResponse:function transform(data,headersGetter) or an arra of functions,
	cache:boolean or Cache object,
	timeout:number ,
	withCredentials: boolean
	
});

/*
  method: һ���ַ�������ʾhttp��������ͣ�����get��post
  url : url�ַ�������ʾ��Դ�ľ��Ի������Դ·��.
  params :һ������ֵ�����ַ����Ķ��󣬱�ʾ��Ҫת����URL�����ļ���ֵ,���ᱻ���ӵ�URL����
  ����{key1:'values',key2,'value2'} ��ת����?key1=values1&key2=value2
  ���ʹ��js������ΪMAP���ֵ�����������ᱻת����JSON�ַ���
  
  data: һ���ַ������߶������ᱻ�����������ݷ���
  
  timeout: ������ʱ֮ǰ��Ҫ�ȴ��ĺ�����

*/
//headers���������������ͷ�������ַ�ʽ��һ����ֻΪĳ���ض��������������ͷ��,����������ָ��
headers:{'Authorization':'BASIC XXXXXXX'}
//��һ�ַ�ʽ�ǰ�����ͷ���õ�ÿһ�����ͳ�ȥ�������ϣ��൱�ڰ���Щ�������ó�ANGULAR��Ĭ��ֵ
//����ʹ��$httpProvider.defaults.headers���ö���������

angular.config('app',[]),config(function($httpProvider){
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.defaults.headers.get['DNT'] = '1';
});

//������Ӧ�������������������þͿ������û��棬Ȼ��ANGULAR�Ỻ�����Է���������Ӧ
//��һ����ͬһ��URL��������ʱ��ANGULAR���᷵�ػ����е���Ӧ����
cache:true


//ת���������Ӧ

//��������ͨ��$http���񷢳���������յ�����Ӧ��˵��angular�������һЩ������ת��

/*
  ת������: �����������ö��������а���JS������ô������������л���JSON��ʽ
  ת����Ӧ:�����⵽��XSRFǰ׺����ֱ�Ӷ����������⵽��JSON��Ӧ����ʹ��JSON�������������з����л�

*/

//������Լ�ת���������Զ���
var module = angular.module('app',[]);
module.config(function($httpProvider){
	$httpProvider.defaults.transformRequest=function(data){
		return $.param(data);
	}
});
//$http()����һ������,�ö�������������
then([success],[error]):
success(function(){})
error(function(){})
