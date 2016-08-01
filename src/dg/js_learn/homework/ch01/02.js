var str ="adadfdfseffserfefsefseeffffftsdg"; //命名一个变量放置给出的字符串
var maxLength = 0; //命名一个变量放置字母出现的最高次数并初始化为0
var result = ''; //命名一个变量放置结果输入  

while( str != '' ){ //循环迭代开始，并判断字符串是否为空
    oldStr = str; //将原始的字符串变量赋值给新变量
    getStr = str.substr(0,1); //用字符串的substr的方法得到第一个字符（首字母）
    // eval("str = str.replace(/"+getStr+"/g,'')"); //详细如补充  
    str = str.replace(new RegExp(getStr,"g"),"")

    if( oldStr.length-str.length > maxLength ) { //判断原始的字符串的长度减去替代后字符串长度是否大于之前出现的最大的字符串长度
        maxLength = oldStr.length-str.length; //两字符串长度相减得到最大的字符串长度
        result = getStr + "=" + maxLength //返回最大的字符串结果（字母、出现次数）
    }
}
console.log(result)