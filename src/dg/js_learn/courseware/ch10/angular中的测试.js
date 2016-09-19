/*
使用jasmine进行javascript单元测试

页面前端逻辑复杂度与日俱增，前端工程师写出来的javascript变得庞大甚至臃肿，维护的难度不断加大，
我们需要一个javascript单元测试框架，用于降低维护javascript代码时的出错风险，保证重构后的代码的兼容性，
最重要的是减少人工测试的过程，降低js代码维护成本。
jasmine无疑是目前最优秀的javascript单元测试框架之一，在易用性和质量上都非常不错

jasmine行为驱动型的开发框架，在jasmine的官网的第一行文字是“BDD for JavaScript”。

 接下来，我们来看下jasmine的基础语法
 
 jasmine单元测试有二个核心的部分：describe 函数块和it函数块
*/



//describe 是 Jasmine 的全局函数，作为一个测试集的开始，它通常有 2 个参数：字符串和方法。
//字符串作为特定的一个测试集的名字和标题。方法是包含实现测试集的代码。
describe('my first test',function(){
	//Specs（测试用例） 通过调用 it 的全局函数来定义
	//每个 Spec 包含一个或多个 expectations（断言）来测试需要测试代码。
	//Jasmine 中的每个 expectation 是一个断言，可以是 true 或者 false。
	//当每个 Spec 中的所有 expectations 都是 true，则通过测试。
	//有任何一个 expectation 是 false，则未通过测试。而方法的内容就是测试主体。
	//Expectations 是由方法 expect 来定义，一个值代表实际值。另外的匹配的方法，代表期望值。
	it('this is specs ',function(){
		
		expect(true).toBe(true);
		expect(false).toBe(false);
	});
	var v;
	it('this is specs2',function(){
		v =true;
		expect(v).toBe(true);
		expect(v).not.toBe(false);
	});
	it('this is specs3',function(){
		v = 3;
		expect(v).toEqual(3);
	})

});
/*
 describe 方法用来组织相关的 Spec 集合。
 string 参数作为 Spec 集合的名字，会和其中的 Spec 连接组成 Spec 的完整名字。
 这样在一个大的 suite 中可以更容易找到某个 Spec。
 如果给它们命名适当，Specs 读起来是一个典型的 BDD 样式的句子。
 Spec 是作为测试主体，Suite 是一个或多个 Spec 的集合。
  describe 和 it 代码块中都是方法，可以包含任何可执行的代码来实现测试。而方法的内容就是 Suites。
*/
/*
 
比较的方法
toBe()：相当于===比较。
toNotBe()
toBeDefined()：检查变量或属性是否已声明且赋值。
toBeUndefined()
toBeNull()：是否是null。
toBeTruthy()：如果转换为布尔值，是否为true。
toBeFalsy()
toBeLessThan()：数值比较，小于。
toBeGreaterThan()：数值比较，大于。
toEqual()：相当于==，注意与toBe()的区别。一个新建的Object不是（not to be）另一个新建的Object，但是它们是相等（to equal）的。
expect({}).not().toBe({});
expect({}).toEqual({});
toNotEqual()
toContain()：数组中是否包含元素（值）。只能用于数组，不能用于对象。
toBeCloseTo()：数值比较时定义精度，先四舍五入后再比较。
toHaveBeenCalled()：可以检查function是否被调用过
toHaveBeenCalledWith()：可以检查传入参数是否被作为参数调用过。
toMatch()：按正则表达式匹配。
toNotMatch()
toThrow()：检验一个函数是否会抛出一个错误
*/

/*
 为了使某个测试用例干净的重复 setup 和 teardown 代码， Jasmine 提供了全局的 beforeEach 和 afterEach 方法。
 正像其名字一样，beforeEach 方法在 describe 中的每个 Spec 执行之前运行，afterEach 在每个 Spec 调用后运行。
*/

describe('this my second test',function(){
	var testVar ;
	var tmpVar;
	beforeEach(function(){
		testVar = 4 ;
	});
	afterEach(function(){
		testVar = 0 ;
		tmpVar = testVar;
	});
	
	it('test num',function(){
		expect(testVar).toBe(4);
	});
	
	it('test num',function(){
		expect(tmpVar).toBe(0);
	});
	it('test num2',function(){
		expect(testVar).toBe(4);
		testVar = 0;
		expect(testVar).toBe(0);
	})
});

/*

嵌套代码块
describe 可以嵌套， Specs 可以定义在任何一层。
这样就可以让一个 suite 由一组树状的方法组成。
在每个 spec 执行前，Jasmine 遍历树结构，按顺序执行每个 beforeEach 方法。
Spec 执行后，Jasmine 同样执行相应的 afterEach。
*/

describe('this my second test',function(){
	var testVar ;
	beforeEach(function(){
		testVar = 4 ;
	});
	afterEach(function(){
		testVar = 0 ;
	});
	
	it('test num',function(){
		expect(testVar).toBe(4);
	});
	describe('nested describe',function(){
		var tmpVar ;
		beforeEach(function(){
			tmpVar = 34;
		});
		afterEach(function(){
			tmpVar = 0 ;
		})
		it('nested describe specs',function(){
			expect(tmpVar).toBe(34);
		})
	})
});

/*
 * 
 * 跳过测试代码块
	Suites 和 Specs 分别可以用 xdescribe 和 xit 方法来禁用。
	运行时，这些 Suites 和 Specs 会被跳过，也不会在结果中出现。
	这可以方便的在项目中可以根据需要来禁用隐藏某些测试用例。
 * 
 * */
 
 /*
 Spy能监测任何function的调用和方法参数的调用痕迹。需使用2个特殊的Matcher：
   toHaveBeenCalled：可以检查function是否被调用过，
   toHaveBeenCalledWith： 可以检查传入参数是否被作为参数调用过。
   使用spyOn(obj,'function')来为obj的function方法声明一个Spy。不过要注意的一点是，对Spy函数的调用并不会影响真实的值。
 */
describe("A spy", function() {
  var foo, bar = null;
  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };
    spyOn(foo, 'setBar');
    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks all the arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });
  it("stops all execution on a function", function() {
    // Spy的调用并不会影响真实的值，所以bar仍然是null。
    expect(bar).toBeNull();
  });
});
 
 
/*
    karma 与jasmine的集成
	
	安装node.js
    安装karma: npm install -g karma
	npm i -g karma-cli ：在系统的任何文件夹中直接执行 karma 命令
	karma --version 显示版本号，如果显示，则表示karma安装成功 
	接下来安装karma jasmine 适配器，还有 karma 与 chrome 的适配器。
	(cmd)执行如下命令安装：npm i -D jasmine-core karma-jasmine karma-chrome-launcher
*/

//karma 支持三个命令。
/*
start [<configFile>] [<options>] 启动 Karma 持续执行，也可以执行单次的测试，然后直接收集测试结果.
init [<configFile>] 初始化配置文件.
run [<options>] [ -- <clientArgs>] Trigger a test run. 
*/

//使用 karma init 初始化配置文件

C:\Users\magengbin>karma init

Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no
Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> Chrome
>
What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> MaWeb/src/test/**/*.js
>

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
>

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes
Config file generated at "C:\Users\magengbin\karma.conf.js".

//可能发生的错误
Uncaught TypeError: Cannot set property 'mock' of undefined



/*

  随着软件的规模和复杂度增长。依靠人工来进行测试越来越不现实。
  为了解决这个问题，可以使用Angular Scenario Runner来模拟用户交互，以此来帮助我们对我们的应用进行测试。
*/

/*
方案测试(scenario tests)使用Javascript写的，你在其中描述在某一个状态的某一个交互中你的应用应该运作。
一个方案包括一个或多个it代码块（你可以把这些当成你应用的需求），代码块它由命令和期望结果组成。
命令告诉Runner让应用执行某个操作（比如翻页或者点击按钮），期望告诉Runner验证执行后的应用状态（比如字段的值或者当前URL）。
如果某个期望不符合，那么Runner就会把它标记为“失败”然后继续验证下一个。
方案还能有beforeEach和afterEach代码块，他们会在it代码块前（后）执行，不管代码块是否成功。
*/

//格式
describe('',function(){
	beforeEach(function(){
		command;
	});
	afterEach(function(){
		command;
	});
	it('',function(){
		command;
		command;
		expectation;
	    expectation;
	})
})
//例子
describe('test search ctr',function(){
		beforeEach(function(){
			browser().navigateTo('/MaWeb/angular/searchText.jsp');
		});
		it('should filter result',function(){
           input('query').enter('test1');
           expect(repeater('ul li').count.toBe(1));
           input('query').enter('sss');
           expect(repeater('ul li').count.toBe(1));

		});
});
/*
pause():暂停测试执行，知道你在命令行中执行resume()（或者在Runner UI中点击继续按钮）。

sleep(seconds):将测试暂停一段指定的事件，以秒计。

browser().navigateTo(url):将url加载到测试框架中。

browser().navigateTo(url, fn):将函数返回的url加载到测试框架中。参数中的url是用来测试输出的。
                              在url是动态地时候，你可以用这个api（意思是在你写测试的时候并不知道url是什么的时候）。

browser().reload():在测试框架中刷新加载的页面。
browser().window().href() :返回测试框架页面中的window.location.href。
browser().window().path():返回测试框架页面中的window.location.pathname。
browser().window().search():返回测试框架页面中的window.location.search.
browser().window().hash():返回测试框架页面中的window.location.hash.
browser().location().url():返回测试框架页面中的$location.url().
browser().location().path():返回测试框架页面中的$location.path().
browser().location().search():返回测试框架页面中的$location.search().
browser().location().hash():返回测试框架页面中的$location.hash().
expect(future).{matcher}:验证当前的future对象是否满足当前的匹配.所有的api都会返回一个future对象，它没在执行后就会对这个对象赋值。
						匹配是用angular.scenario.matcher定义的， 它用future对象的值来验证是否复合期望，
						比如：expect(browser().location().href()).toEqual('http://www.google.com')。

expect(future).not().{matcher}:验证当前future对象值是否不满足当前匹配。
using(selector, label):审查下一个DSL元素选项。
binding(name):返回符合给定名字的第一个绑定值。
input(name).enter(value):在指定输入框中输入指定值。
input(name).check():勾选或者反勾选指定名字的checkbox。
input(name).select(value):选择指定名字的单选框。
input(name).val():返回指定名字的input元素的值。
repeater(selector, label).count():返回用指定jquery选择器选择到的元素的个数。参数中label是用来检测输出的。
repeater(selector, label).row(index):返回用指定jquery选择器选择到的元素的指定索引的绑定（数组）。参数中label是用来检测输出的。
repeater(selector, label).column(binding):返回用指定jquery选择器选择到的元素的列的值（数组）。参数中label是用来检测输出的。
select(name).option(value):返回指定名字的select中指定值的option。
select(name).option(value1, value2...):返回指定名字的select中的和给定任意一个值匹配的option。
element(selector, label).count():返回符合指定jquery选择器的元素的个数。参数中label是用来检测输出的。
element(selector, label).click():模拟指定jquery选择器的元素的点击事件。参数中label是用来检测输出的。
element(selector, label).query(fn):执行函数fn(selectedElements, done)，selectedElements是符合jquery选择器的元素，done是函数执行后的回调。
                                   参数中label是用来检测输出的。

element(selector, label).{method}()返回指定jquery选择器选择的元素的方法。
                                    方法可以是如下的jquery方法：val, text, html, height, innerHeight, 
									 outerHeight, width, innerWidth, outerWidth, position, scrollLeft, 
									 scrollTop, offset.参数中label是用来检测输出的。

element(selector, label).{method}(value):执行指定jquery选择器选择的元素的方法。
											方法可以是如下的jquery方法：val, text, html, height, innerHeight, outerHeight,
											width, innerWidth, outerWidth, position, scrollLeft, 
											scrollTop, offset.参数中label是用来检测输出的。

element(selector, label).{method}(key):返回执行指定jquery选择器选择的元素执行方法的结果，传递key做参数。
                                       方法可以是：attr, prop, css。参数中label是用来检测输出的。

element(selector, label).{method}(key, value):返回执行指定jquery选择器选择的元素执行方法的结果，传递key和value做参数。
                                              方法可以是：attr, prop, css。参数中label是用来检测输出的。

*/