describe('Module: App', function() {
  beforeEach(module('ponyApp'));

  var route, location, rootScope, httpBackend;

  beforeEach(inject(function($route, $location, $rootScope, $httpBackend) {
    route = $route;
    location = $location;
    rootScope = $rootScope;
    httpBackend = $httpBackend;
  }));

  function validateTab(name) {
    httpBackend.expectGET('tabs/' + name + '.html').respond(200);
    location.path('/tab/' + name);
    rootScope.$digest();

    expect(route.current.templateUrl).toBe('tabs/' + name + '.html');
  }

  // The tests
  describe('Route: ', function() {
    it('none', function() {
      expect(route.current).toBeUndefined();
    });

    it('invalid', function() {
      httpBackend.expectGET('tabs/town.html').respond(200);
      location.path('/invalid');
      rootScope.$digest();

      expect(route.current.templateUrl).toBe('tabs/town.html');
    });

    it('town tab', function() {
      validateTab('town');
    });

    it('roster tab', function() {
      validateTab('roster');
    });

    it('achievements tab', function() {
      validateTab('achievements');
    });

    it('options tab', function() {
      validateTab('options');
    });
  });
});