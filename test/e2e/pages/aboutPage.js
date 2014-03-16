var AboutPage = function() {
  this.el = 'about-view';
  this.url = '/about';

//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));
  this.content = element(by.id(this.el));
  this.contact = element(by.css('#about-view a'));

  this.get = function() {
    browser.get('#' + this.url);
  };

  this.isLoaded = function() {
    return this.content.isPresent();
  };

};


module.exports = new AboutPage();