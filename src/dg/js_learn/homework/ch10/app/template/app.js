directivesModule.directive('ssn', function () {
    return {
        restrict: 'A',
        replace: true,
        require: 'ngModel',
        scope: {
            ssn: '=ngModel',
            disabled: '=ngDisabled'
        },
        //templateUrl points to an external html template.
        templateUrl: '/myApp/templates/ssnControl.htm'
    }
});
