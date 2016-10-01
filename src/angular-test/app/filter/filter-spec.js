'use strict';

describe('appFilter module', function () {

    var $filter;
    var filter;

    beforeEach(function () {
        module('appFilter');
        inject(function (_$injector_) {
            $filter = _$injector_.get('$filter');
            filter = $filter('titleCase');
        });
    });

    it('Should return undefined when undefined is passed in', function () {
        expect(filter(undefined)).toBeUndefined();
    });

    it('Should return null when null is passed in', function () {
        expect(filter(null)).toBeNull();
    });

    it('Should return a blank string when a blank string is passed in', function () {
        expect(filter("")).toEqual("");
    });

    it('Should change the casing of lower cased word', function () {
        expect(filter("george harrison")).toEqual("George Harrison");
    });

    it('Should change the casing of an upper case word', function () {
        expect(filter("GEORGE BUSH")).toEqual("George Bush");
    });

    it('Should change the casing of random cased word', function () {
        expect(filter("the QUiCk BrOwN foX")).toEqual("The Quick Brown Fox");
    });

    it('Should play nice with a normal phrase', function () {
        expect(filter("This Is A Control")).toEqual("This Is A Control");
    });


});