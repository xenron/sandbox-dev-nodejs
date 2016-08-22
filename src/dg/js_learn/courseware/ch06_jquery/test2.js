
//基于列表项的级别添加样式
$(document).ready(function(){
	$('#selected-plays > li').addClass('horizontal');
	$('#selected-plays li:not(.horizontal)').addClass('sub_level');
	
//$('a[href^="mailto:"]').addClass('mailto');
//$('a[href$=".cn"]').addClass('htmlLink');

	$('a').filter(function(){
		alert(this.hostname);
		return this.hostname&&this.hostname!=location.hostname;
	}).addClass('external') ;


});