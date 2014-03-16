var HomePage = function() {
  this.el = 'home';
  this.url = '/';
//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));
  this.content = element(by.id(this.el));
  this.footerAbout = element(by.id('about-footer'));

  this.get = function() {
    browser.get(this.url);
  };

  this.isLoaded = function() {
    return this.content.isPresent();
  };

//  this.setName = function(name) {
//    this.nameInput.sendKeys(name);
//  };
};


module.exports = new HomePage();