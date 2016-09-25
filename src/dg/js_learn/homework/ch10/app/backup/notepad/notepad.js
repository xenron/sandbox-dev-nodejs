/**
 * 
 */
var app = angular.module('myAppNotepad',[]);

app.directive("ngDestroy", function(){                                                                                                                                                                         
        return {                                                                                                                                                                                             
            restrict: "C",                                                                                                                                                                                   
            replace: true,                                                                                                                                                                                   
            link: function(scope, elem, attrs) {
                var span = angular.element("<span>x</span>");
                    elem.append(span);
                    span.on("click", function(){
                    elem.remove();
                });
            }
         };
  });

app.directive('notepad',function(){
	return {
		restrict:'AE',
		scope:{},
		// templateUrl:'template.htm',
		link:function(scope,elem,attrs){
			scope.editMode = false;
			scope.restore = function(){
				scope.editMode = false;
				scope.index = -1;
				scope.noteText = '';
			};
		   scope.openEditor = function(index){
				scope.editMode = true;
			   if(index!==undefined){
				   scope.noteText= scope.notes[index].content;
				   scope.index = index;
			   }else {
				   scope.noteText = undefined;
			   }
		   };
		   scope.save = function(){
			   if(scope.noteText!==''&&scope.noteText!==undefined){
				   var note ={};
				   note.title = scope.noteText.length>10?scope.noteText.substring(0,10)+'...':scope.noteText;
				   note.content = scope.noteText;
				   note.id = scope.index!=-1?scope.index:scope.notes.length;
				   scope.notes[note.id]=note;
			   }
			   scope.restore();
		   }
		   var editor = angular.element(elem.children().eq(1));
		   scope.restore();
		   scope.notes = [];
		   editor.bind('keyup keydown',function(){
			   scope.noteText = editor.text().trim();
		   });

		   var span = angular.element("<span><a href='#' ng-click='openEditor()'  ng-show='!editMode'>Add Note</a></span>");
		   elem.append(span);

		}
	}
});
app.controller('NotePadCtrl', [function() {

}]);
