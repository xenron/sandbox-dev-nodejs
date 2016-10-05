var Dessert = Dessert || {};
Dessert.Controllers = angular.module('dessert.controllers', []);
Dessert.Directives = angular.module('dessert.directives', []);
Dessert.Filters = angular.module('dessert.filters', []);
Dessert.Managers = angular.module('dessert.managers', []);
Dessert.Services = angular.module('dessert.services', []);

Dessert.Dependencies = ['dessert.controllers', 'dessert.directives', 'dessert.filters', 'dessert.managers', 'dessert.services'];