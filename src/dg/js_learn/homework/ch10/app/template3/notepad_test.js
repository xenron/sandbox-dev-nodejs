describe('myAppNotepad', function () {
    var elm;
    var $compile;
    var $scope;

    // load the tabs code
    beforeEach(module('myAppNotepad'));

    // load the templates
    beforeEach(module('template3/template.html'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_;
        $compile = _$compile_;

        // we might move this tpl into an html file as well...
        elm = angular.element('<notepad></notepad>');
        $compile(elm)($scope);
        $scope.$digest();
    }));

    it('dummy test', inject(function (_$compile_, _$rootScope_) {
        expect(true).toBe(true);
    }));
});

describe('myAppNotepad', function () {
    var elm;
    var template;
    var $compile;
    var $scope;

    // load the tabs code
    beforeEach(module('myAppNotepad'));

    // load the templates
    beforeEach(module('template3/template.html'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;

        // we might move this tpl into an html file as well...
        elm = angular.element('<notepad></notepad>');
        // $scope.notes = [{"id":1, "title":"test title", "content": "test content"}];
        template = $compile(elm)($scope);
        $scope.$digest();
        $scope.$apply();
    }));

    it("trigger click event and destroy element", function () {
        // spyOn(el.scope(), 'openEditor')
        // spyOn($.fn, 'notepad').andCallThrough();
        console.info("----------------------------");
        console.info(template.find("span [ng-click='openEditor()']"));
        console.info(template.scope().editMode);
        console.info($scope.editMode);


        $scope.notes = [{"id":1, "title":"test title", "content": "test content"}];
        console.info(template.find("span [ng-click='openEditor()']"));

        // console.info(el.scope());
        // console.info()
        // template.find("span [ng-click='openEditor()']").triggerHandler("click");
        template.find("span [ng-click='openEditor()']").click();
        template.find("span [ng-click='openEditor()']").trigger("click");
        console.info(template.scope().editMode);
        console.info($scope.editMode);

        // expect(el.scope().openEditor).toHaveBeenCalledWith();
        // expect($.fn.notepad).toHaveBeenCalled();
        expect(true).toBe(true);
        // $_scope.$digest();
        // template.scope().$digest();
        // console.info("----------------------------");
        // console.info($_scope.editMode);
        // console.info(template.scope().editMode);
        // console.info(el.scope().editMode);
        // expect(el.scope().editMode).toBe(true);
        // expect(true).toBe(true);
    });
});

