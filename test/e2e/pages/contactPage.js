var ContactPage = function() {
  this.el = 'contact-view';
  this.url = '/contact';

//  this.nameInput = element(by.model('yourName'));
//  this.greeting = element(by.binding('yourName'));
//  this.usTabContent = element(by.css('[module=app-us] .tab-content'));
//  this.tabs = element.all(by.repeater('pane in panes'));
  this.content = element(by.id(this.el));
  this.about = element(by.css('#contact-view a'));

  this.get = function() {
    browser.get('#' + this.url);
  };

  this.isLoaded = function() {
    return this.content.isPresent();
  };

};


module.exports = new ContactPage();