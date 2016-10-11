/*
  ǰ�������ANGULAR JS ��ܵĻ�����֪ʶ��ϵ����ܱȽϴ�
  ����һһ���ǣ����ڻ����ϼ���Ӧ�ã��������ա�
  ���һ�ڿΣ�����ȥ̽�������ܵģ����Ǽ�������js�м������ģʽ
  
  �������ģʽ����ʵ����ѧ����js��ʵ�ֵ���ģʽ������ģʽ��AOP�����ģʽ
  ��֪����һ��ǲ��ǵã���ʱ���ͷ��ϰһ����
  
  ��ڿ���������ʶ�²���ģʽ������ģʽ������-����ģʽ
*/

/*
 ���ȵ�������
 
 ʲô�ǲ���ģʽ��
 ����ģʽ�Ķ������:����һϵ���㷨��������һ������װ����������ʹ�����ǿ����໥�滻
 
 �ڳ�������У����ǳ����������������Ҫʵ��һ�����ܣ��ж��ַ�������ѡ�񡣱���
 һ��ѹ���ļ��ĳ��򣬼ȿ���ѡ��zip�㷨,Ҳ����ѡ��gzip�㷨
 ��Щ�㷨�����������ҿ������⻥���滻
 
 ���ǿ���ʹ�ò���ģʽ�����㽱��
 ���繫˾�����ս������Ը���Ա���Ĺ��ʻ����ͼ�Ч�ļ���������
 ���缨Ч�ȼ�ΪA�ģ�����4���½����Դ�����
 ���Բ�ͬ�ĵȼ���Ӧ��ͬ���㷨
 �������ǵ�ϰ�ߣ�һ��ʼ���������
 */
 
 var calcBonus = function(level,salary){
	 if(level==='A'){
		 return salary*4;
	 }
	 if(level==='B'){
		 return salary*3
	 }
	 //....
 }
 
//������ƺ��𣿴���ܼ򵥣��������Ч�ȼ�Խ�࣬���������Խ��Խ�Ӵ󣬶���ȱ������
//���ԭ���ļ�Ч�ȼ���Ƶ������⣬�ǵöԴ���������޲���
//�����㷨�ĸ����ԲҪ�Ǳ�ĵط���Ҫ���ã���Ҫ����ճ��

//���ǿ����ع���δ���
//ʹ����Ϻ������в�֣��Ѹ����㷨��ֵ����ĺ���

var  performanceA = function(salary){
	return salary *4;
};
var  performanceB = function(salary){
	return salary *3;
};
var  performanceC = function(salary){
	return salary *2;
};
var calcBonus = function(level,salary){
	 if(level==='A'){
		 return performanceA(salary);
	 }
	 if(level==='B'){
		 return performanceB(salary);
	 }
	 if(level==='C'){
		 return performanceC(salary);
	 }
};

//���뿴����˳�۶��ˣ����ǻ�û�н�������յ��㷨��������Խ��Խ�Ӵ󣬶���ϵͳ�仯ʱ��ȱ������

//�����������ǿ���ʹ�ò���ģʽ���ع�����
//�����ں���Ŀγ����ᵽ�����ڳ�����ƵĹ����У�Ҫ�Ѳ���Ĳ��ֺͱ仯�Ĳ��ָ���
//���ԭ��ͬ����ÿ�����ģʽ�����⣬����ģʽҲ������
//���Ե�ģʽ��Ŀ�ľ��ǽ��㷨��ʹ�ú��㷨��ʵ�ַ��뿪��
/*
  һ�����ڲ���ģʽ�ĳ������������������
  ��һ������һ������࣬�������װ�˾�����㷨�����Ӿ���ļ�����̡�
  �ڶ������ǻ�����Context��Context���ܿͻ���������������ί�и�ĳһ��������
*/

var performanceA = function(){};
performanceA.prototype.calculate=function(salary){
	return salary*4;
};

var performanceB = function(){};
performanceB.prototype.calculate=function(salary){
	return salary*3;
};

var performanceC = function(){};
performanceC.prototype.calculate=function(salary){
	return salary*2;
};

var Bonus = function(){
	this.salary = null;
	this.level = null;
};
Bonus.prototype.setSalary = function(salary){
	this.salary = salary;
};
Bonus.prototype.setLevel = function(level){
	this.level = level;
};
Bonus.prototype.getBonus = function(){
	this.level.calculate(this.salary);
};

//����
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setLevel(new performanceA());
bonus.getBonus();

//�����ʵ���Ƿ��촫ͳ������������Ե�ʵ��
//���������ǿ������javascript��ôʵ�ֲ���ģʽ
var levels = {
	'A':function(salary){
		return salary*4
	},
    'B':function(salary){
		return salary*3
	},
   'C':function(salary){
		return salary*2
	}
}
var calcBonus= function(level,salary){
	return levels[level](salary);
};

//ͨ������ĸ��죬����ṹ��ø��Ӽ�飬�㷨��ʵ�ֺ�ʹ�÷��뿪����
//������ĸ����У��ú�����¶�̬���������������

//ʹ�ò���ģʽ��ʵ�ֱ���֤
var strategies = {
	isNotEmpty:function(value,errorMsg){
		if(value===''){
			return errorMsg;
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length<length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if(!/(^1[|3|5|8][0-9]{9}$)/.test(value)){
			return errorMsg;
		}
	}
};

var validator = function(){
	this.cache = [];
};

validator.prototype.add = function(dom,rule,errorMsg){
	var ary = rule.split(':');
	this.cache.push(function(){
		var strategy = ary.shift();
		ary.unshift(dom.value);
		ary.push(errorMsg);
		return strategies[strategy].apply(dom,ary);
	});
}

validator.prototype.start = function(){
	for(var i=0,validatorFunc;validatorFunc=this.cache[i++]){
		var msg =validatorFunc();
		if(msg){
			return msg;
		}
	}
}

/*
   ��������������ʲô�Ǵ���ģʽ?
   ����ģʽ����Ϊһ�������ṩһ������Ʒ��ռλ�����Ա�������ķ���
   �����ģʽ�Ĺؼ��ǣ����ͻ�������ֱ�ӷ���һ��������߲�������Ҫ��ʱ���ṩһ���������
   �����ƶ��������ķ��ʣ��ͻ�ʵ���Ϸ��ʵ��������������������������һЩ����֮��
   �ٰ�����ת�����������
*/

//һ���򵥵Ĵ�������

var Flower = function(){
};
var xiaoming = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};

var A = {
	receiveFlower:function(flower){
		console.log('�յ���'+flower)��
	}
}��
xiaoming.sendFlower(A);
//�����ǲ��ô����ģʽ��������������������B�����С������ֱ���ͻ���A������ͨ��B����
var Flower = function(){
};
var xiaoming = {
	sendFlower:function(target){
		var flower = new Flower();
		target.receiveFlower(flower);
	}
};

var B = {
	receiveFlower:function(flower){
		A.receiveFlower(flower);
	}
}��

var A = {
	receiveFlower:function(flower){
		console.log('�յ���'+flower);
	}
};
xiaoming.sendFlower(B);
//�������δ�����һ�£������������һ���򵥵Ĵ���ģʽ�ı�д
//С��ֱ���ͻ���Ů��Ů����յĸ��ʺܴ󣬱����͵�ʱ�䲻���ˣ�����Ů�����鲻��
//B��ΪŮ��ĺ����ѣ��������˽⣬����ͨ��B���ͣ������յĸ��ʺܴ�
//B�������ǹ��˵�һЩ�������

var B = {
	receiveFlower:function(flower){
		A.listenGoodMood(function(){
			A.receiveFlower(flower);
		});
	}
};
var A = {
	receiveFlower:function(flower){
		console.log('�յ���'+flower);
	},
	listenGoodMood:function(fn){
		setTimeout(function(){
			fn();
		},10000);
	}
};

/*
 ���ִ���ģʽ������������������
 ����������ӣ����ǿ��Կ������ִ���ģʽ��Ӱ��
 B���԰���A���˵�һЩ���󣬱����ͻ���������̫����߲��Ǹ߸�˧����������
 ��ֱ���ڴ���B�����˵������ִ��������������
 
 ����һ������ǣ������ʵ�еĻ��۸񰺹󣬵���new Flower()�Ǵ��۰���Ĳ���
 ��ô���԰�new Flower()�Ĳ�����������Bȥִ�У�����B��ѡ����A����õ�ʱ���ٲ���
 new Flower(),���Ǵ��������һ����ʽ�������������
 ��������ǰ�һЩ�����ܴ�Ķ����ӳٵ�������Ҫ����ʱ���ȥ����
*/
var B = {
	receiveFlower:function(flower){
		A.listenGoodMood(function(){
			var flower = new Flower();
			A.receiveFlower(flower);
		});
	}
};

/*
  ����-����ģʽ
  ����ģʽҲ�й۲���ģʽ�������������һ��һ�Զ��������ϵ
  ��һ�������״̬�����ı�ʱ���������������Ķ��󶼽��õ�֪ͨ��
  ��javascript�У�����һ�����¼�ģ�������洫ͳ�ķ���-����ģʽ
*/

var salesOffices = {};
salesOffices.clientList ={};
salesOffices.listen = function(key,fn){
	if(!this.clientList[key]){
		this.clientList[key] = [];
	}
	this.clientList[key].push(fn);
};
salesOffices.trigger = function(){
	var key = Array.prototype.shift.call(arguments),
	fns = this.clientList[key];
	if(!fns||fns.length===0){
		return false;
	};
	for(var i=0,fn;fn=fns[i++]){
		fn.apply(this,arguments);
	}
};
//�ѷ������ĵĹ�����ȡ����
var event ={
	clientList:[],
	listen:function(key,fn){
			if(!this.clientList[key]){
				this.clientList[key] = [];
			}
			this.clientList[key].push(fn);
     },
	 trigger: function(){
				var key = Array.prototype.shift.call(arguments),
				fns = this.clientList[key];
				if(!fns||fns.length===0){
					return false;
				};
				for(var i=0,fn;fn=fns[i++]){
					fn.apply(this,arguments);
				}
			},
    remove:function(key,fn){
		var fns = this.clientList[key];
		if(!fns){
			return false;
		}
		if(!fn){
			fns&&(fns.length=0);
		}else {
			for(var l = fns.length-1;l>=0;l--){
				var _fn = fns[l];
				if(_fn===fn){
					fns.splice(l,1);
				}
			}
		}
	}
};

var installEvent = function(obj){
	for(var i in event){
		obj[i]=event[i];
	}
}
//angular js ����˫���