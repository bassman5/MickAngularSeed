describe('e2e: main', function() {

  var ptor;
  // Will go to / before each test is run
  beforeEach(function() {
    browser.get('/');
    ptor = protractor.getInstance();
  });

  it('should load the home page', function() {
    var ele = by.id('home');
    expect(ptor.isElementPresent(ele)).toBe(true);
  });

//  it('the input box should go away on submit', function() {
//    element(by.input('repo.name')).sendKeys('angular/angular.js\n');
//    expect(ptor.isElementPresent(by.id('repoform'))).toBe(false);
//  });
//
//  describe('listing page', function() {
//    beforeEach(function() {
//      element(by.input('repo.name')).sendKeys('angular/angular.js\n');
//    });
//
//    it('should have 30 issues', function() {
//      var elems = element.all(by.repeater('d in data'));
//      expect(elems.count()).toBe(30);
//    });
//
//    it('includes a user gravatar per-element', function() {
//      var elems = element.all(by.repeater('d in data'));
//      elems.first().then(function(elm) {
//        elm.findElement(by.tagName('img')).then(function(img) {
//          img.getAttribute('src').then(function(src) {
//            expect(src).toMatch(/gravatar\.com\/avatar/);
//          });
//        })
//      });
//    });
//
//  });

  describe('page navigation', function() {

    it('should navigate to the /about page when clicking', function() {
      element(by.id('about-footer')).click();
      expect(ptor.getCurrentUrl()).toMatch(/\/about/);
    });

    it('should navigate to contacts page from learn more button', function() {
      element(by.id('about-footer')).click();
      element(by.css('#about-view a')).click();
      expect(ptor.getCurrentUrl()).toMatch(/\/contact/);
    });

  });

});