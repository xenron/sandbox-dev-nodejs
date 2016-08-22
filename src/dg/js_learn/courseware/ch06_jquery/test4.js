$(document).ready(function(){
   
   $('#item button').click(function(){
	   var content = this.id+'.htm';
	  $('#content').load('a.htm');
   });
});