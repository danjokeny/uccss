define('app',["exports", "aurelia-auth"], function (_exports, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false
      }, {
        route: 'home',
        moduleId: './modules/home',
        name: 'Home',
        auth: true
      }, {
        route: 'users',
        moduleId: './modules/users',
        name: 'Users',
        auth: true
      }, {
        route: 'HelpTickets',
        moduleId: './modules/helpTickets',
        name: 'Help Tickets',
        auth: true
      }]);
    };

    return App;
  }();

  _exports.App = App;
});
define('text!app.html',[],function(){return "<template>\n  <nav-bar></nav-bar>\n  <router-view></router-view>\n</template>\n";});
define('auth-config',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
  };
  var _default = authConfig;
  _exports.default = _default;
});
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});
define('main',["exports", "./environment", "regenerator-runtime", "./auth-config"], function (_exports, _environment, _regeneratorRuntime, _authConfig) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);
  _regeneratorRuntime = _interopRequireDefault(_regeneratorRuntime);
  _authConfig = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  window.regeneratorRuntime = _regeneratorRuntime.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig.default);
    }).feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!modules/components/editHelpTicket.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-5\" style=\"margin-left:20px; \">\r\n                <div class=\"row-md\">\r\n                    <h2>Actions</h2>\r\n                    <div class=\"list-group-item\">\r\n                        <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                        <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                        <span show.bind=\"helpticket._id\" click.trigger=\"delete()\"><i data-feather=\"trash\"></i></span>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <label for=\"Title\">Title</label>\r\n                        <input class=\"form-control\" type=\"text\" placeholder=\"Title\" id=\"Title\" readonly.bind=\"helpticket._id\"\r\n                            value.bind=\"helpticket.Title\">\r\n                    </div>\r\n\r\n                    <div class=\"row-md\">\r\n                        <label for=\"Status\">Status</label>\r\n                        <select value.bind=\"helpticket.Status\" class=\"form-control\" id=\"Status\" readonly.bind=\"userObj.role ==='user'\">\r\n                            <option value=\"new\">new</option>\r\n                            <option value=\"inProcess\">inProcess</option>\r\n                            <option value=\"closed\">closed</option>\r\n                        </select>\r\n                        <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                            <label for=\"content\">Add content description</label>\r\n                            <textarea value.bind=\"helpticketcontent.Content\" class=\"form-control\" rows='3'></textarea>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <div class=\"col-2\">\r\n                                <label class=\"btn btn-primary\">\r\n                                    Browse for files&hellip;\r\n                                    <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\r\n                                        files.bind=\"files\">\r\n                                </label>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                            <ul>\r\n                                <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                        click.delegate=\"removeFile($index)\" class=\"pull-right\">\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"col-5\">\r\n                <form style=\"margin-top:20px; margin-bottom: 20px\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col\">\r\n                            <label for=\"PersonFirstName\">Person First Name</label>\r\n                            <input class=\"form-control\" type=\"text\" placeholder=\"\" readonly value.bind=\"helpticket.PersonID.fname\">\r\n\r\n                        </div>\r\n                        <div class=\"col\">\r\n                            <label for=\"PersonLastName\">Person Last Name</label>\r\n                            <input class=\"form-control\" type=\"text\" placeholder=\"\" readonly value.bind=\"helpticket.PersonID.lname\">\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n\r\n                <form style=\"margin-top:20px; margin-bottom: 20px\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col\">\r\n                            <label for=\"OwnerFirstName\">Owner First Name</label>\r\n                            <input class=\"form-control\" type=\"text\" placeholder=\"\" readonly value.bind=\"helpticket.OwnerID.fname\">\r\n\r\n                        </div>\r\n                        <div class=\"col\">\r\n                            <label for=\"OwnerLastName\">Owner Last Name</label>\r\n                            <input class=\"form-control\" type=\"text\" placeholder=\"\" readonly value.bind=\"helpticket.OwnerID.lname\">\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n                <h2>History</h2>\r\n                <div class=\"row-md\">\r\n\r\n                    <div class=\"card\" style=\"padding: 3px; margin-top: 15px; \">\r\n                        <div class=\"card-body\">\r\n                            Previous Comments/Content:\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                    <div class=\"card\" style=\"padding: 3px; margin-top: 15px; \" repeat.for=\"Content of helptickets.helpticketscontentArray\">\r\n                        <div class=\"card-body\">\r\n                            <div class=\"row\" style=\"padding: 3px;\">\r\n                                <div class=\"col-6\">\r\n                                    <span innerhtml.bind=\"Content.DateCreated | formatDate \"></span><br />\r\n                                    ${Content.PersonID.fname} ${Content.PersonID.lname}\r\n                                </div>\r\n\r\n                                <div class=\"col-6\" style=\"margin-bottom: 15px; \r\n                                border-left-style: solid;border-left-width: 1px;\"\r\n                                    value.bind=\"Content.Content\">\r\n                                    ${Content.Content}\r\n                                </div>\r\n\r\n                                <div>\r\n                                    <a href=\"http://localhost:5000/uploadedFiles/helpTickets/${Content.file.FileName}\"\r\n                                        target=\"_blank\">${Content.file.OriginalFileName}</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <Br />\r\n                    <Br />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/editUser.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <span show.bind=\"user._id\" click.trigger=\"delete()\"><i data-feather=\"trash\"></i></span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-4\" style=\"margin-top:20px;\">\r\n                <label for=\"firstName\">First name</label>\r\n                <input type=\"email\" class=\"form-control\" value.bind=\"user.fname\" id=\"firstName\" placeholder=\"First name\">\r\n            </div>\r\n            <div class=\"col-4\" style=\"margin-top:20px;\">\r\n                <label for=\"lastName\">Last name</label>\r\n                <input type=\"email\" class=\"form-control\" value.bind=\"user.lname\" id=\"lastName\" placeholder=\"Last name\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\" style=\"margin-top:20px;\">\r\n                <label for=\"Email\">Email</label>\r\n                <input type=\"email\" class=\"form-control\" value.bind=\"user.email\" id=\"email\" placeholder=\"Email\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\" style=\"margin-top:20px;\">\r\n                <label for=\"Password\">Password</label>\r\n                <input type=\"email\" class=\"form-control\" value.bind=\"user.password\" id=\"password\" placeholder=\"password\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\" style=\"margin-top:20px;\">\r\n                <label for=\"role\">Role</label>\r\n                <select value.bind=\"user.role\" class=\"form-control\" id=\"role\">\r\n                    <option value=\"user\">User</option>\r\n                    <option value=\"staff\">Staff</option>\r\n                    <option value=\"admin\">Administrator</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\" style=\"margin-top:20px;\">\r\n                <input class=\"form-check-input\" checked.bind=\"user.active\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                <label class=\"form-check-label\" for=\"defaultCheck1\">\r\n                    Active\r\n                </label>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/tableHelpTickets.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-10\">\r\n                <table class=\"table table-bordered\" >\r\n                    <thead class=\"thead\">\r\n                        <tr>\r\n                            <th colspan=\"4\">\r\n                                <span click.trigger=\"newHelpTicket()\"><i data-feather=\"plus\"></i></span>\r\n                                <span click.trigger=\"getHelpTickets()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                            </th>\r\n                        </tr>\r\n                        <tr class=\"thead-light\" style=\"border-color: red\">\r\n                            <th scope=\"col\" >Title</th>\r\n                            <th scope=\"col\">Status</th>\r\n                            <th scope=\"col\">Person Name</th>\r\n                            <th scope=\"col\">Owner Name</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr  click.trigger=\"editHelpTicket(helpticket)\" repeat.for=\"helpticket of helptickets.helpticketsArray\">\r\n                            <td>${helpticket.Title}</td>\r\n                            <td>${helpticket.Status}</td>\r\n                            <td>${helpticket.PersonID.fname}\r\n                                ${helpticket.PersonID.lname} </td>\r\n                            <td>${helpticket.OwnerID.fname}\r\n                                ${helpticket.OwnerID.lname} </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/tableUsers.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <table class=\"table table-bordered\" >\r\n                    <thead class=\"thead\">\r\n                        <tr>\r\n                            <th colspan=\"1\">\r\n                                <span click.trigger=\"newUser()\"><i data-feather=\"plus\"></i></span>\r\n                                <span click.trigger=\"getUsers()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                            </th>\r\n                        </tr>\r\n                        <tr class=\"thead-light\">\r\n                            <th scope=\"col\">First</th>\r\n                            <th scope=\"col\">Last</th>\r\n                            <th scope=\"col\">Role</th>\r\n                            <th scope=\"col\">Active</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr repeat.for=\"user of users.usersArray\">\r\n                            <td click.trigger=\"editUser(user)\">${user.fname}</td>\r\n                            <td click.trigger=\"editUser(user)\">${user.lname}</td>\r\n                            <td click.trigger=\"editUser(user)\">${user.role}</td>\r\n                            <td>\r\n                                <div class=\"form-check\">\r\n                                    <input class=\"form-check-input\" change.delegate=\"changeActive(user)\" checked.bind=\"user.active\"\r\n                                        type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                                </div>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('modules/helpTickets',["exports", "aurelia-framework", "aurelia-router", "../resources/data/help-ticket-object"], function (_exports, _aureliaFramework, _aureliaRouter, _helpTicketObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.helptickets = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var helptickets = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _helpTicketObject.Helpticket), _dec(_class =
  /*#__PURE__*/
  function () {
    function helptickets(router, _helptickets) {
      this.router = router;
      this.helptickets = _helptickets;
      this.message = 'Help Tickets';
      this.showHelpTicketEditForm = false;
      this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }

    var _proto = helptickets.prototype;

    //get help tickets upon loading the page
    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.helptickets.getHelpTickets(this.userObj);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    //pre-populate form for adding a new help ticket and a new content row
    _proto.newHelpTicket = function newHelpTicket() {
      //intialize
      this.helpticket = "";
      this.filesToUpload = new Array();
      this.files = new Array();
      this.helpticketscontentArray = new Array(); //prepopulate helpticket

      this.helpticket = {
        Title: "",
        PersonID: this.userObj,
        OwnerID: this.userObj,
        Status: 'new'
      }; //prepopulate content

      this.helpticketcontent = {
        Content: "",
        PersonID: "",
        helpTicketId: "",
        file: {
          FileName: "",
          OriginalFileName: ""
        }
      }; //dispaly the form

      this.showEditForm();
    };

    //Show the edit form, and set focus on title
    _proto.showEditForm = function showEditForm() {
      this.showHelpTicketEditForm = true;
      setTimeout(function () {
        $("#Title").focus();
      }, 500);
    };

    //go back to the grid, clean up the file arrays
    _proto.back = function back() {
      this.filesToUpload = new Array();
      this.files = new Array();
      this.helpticketscontentArray = new Array();
      this.showHelpTicketEditForm = false;
    };

    //edit a ticket from the grid
    _proto.editHelpTicket =
    /*#__PURE__*/
    function () {
      var _editHelpTicket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(helpticket) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //initialize & set the ticket to row
                this.helpticket = "";
                this.filesToUpload = new Array();
                this.files = new Array();
                this.helpticketscontentArray = new Array();
                this.helpticket = helpticket; //set the content to blank (to allow add new content)

                this.HelpTicketContent = {
                  personId: this.userObj._id,
                  content: ""
                };
                this.helpticketcontent = {
                  Content: "",
                  PersonID: "",
                  helpTicketId: "",
                  file: {
                    FileName: "",
                    OriginalFileName: ""
                  }
                }; //get all the existing contents to display as browse

                _context2.next = 9;
                return this.helptickets.getHelpTicketsContents(helpticket._id);

              case 9:
                //display the form
                this.showEditForm();

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function editHelpTicket(_x) {
        return _editHelpTicket.apply(this, arguments);
      };
    }();

    //save either a insert, or an update
    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var helpTicket, serverResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.helpticket && this.helpticket.Title && this.helpticketcontent && this.helpticketcontent.Content)) {
                  _context3.next = 9;
                  break;
                }

                //check if person editing is admin/staff, if so, set owner id
                if (this.userObj.role !== 'user') {
                  console.log('set owner id');
                  this.helpticket.OwnerID = this.userObj._id;
                }

                ; //combine ticket and content            

                helpTicket = {
                  helpTicket: this.helpticket,
                  content: this.helpticketcontent
                }; //save help ticket & content both

                _context3.next = 6;
                return this.helptickets.saveHelpticketAndContent(helpTicket);

              case 6:
                serverResponse = _context3.sent;

                if (this.filesToUpload && this.filesToUpload.length > 0) {
                  this.helptickets.uploadFile(this.filesToUpload, serverResponse.contentID);
                } //await this.helptickets.getHelpTickets(this.userObj);


                this.back();

              case 9:
                ; //Get all tickets for grid

                _context3.next = 12;
                return this.helptickets.getHelpTickets(this.userObj);

              case 12:
                //go back to grid from the edit form
                this.back();

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    //Delete help ticket and contents too
    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.helpticket && this.helpticket._id)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.helptickets.deleteHelpticket(this.helpticket._id);

              case 3:
                _context4.next = 5;
                return this.helptickets.getHelpTickets(this.userObj);

              case 5:
                this.back();

              case 6:
                ;

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function _delete() {
        return _delete2.apply(this, arguments);
      };
    }();

    //builds the list of files to add to content 
    _proto.changeFiles = function changeFiles() {
      var _this = this;

      this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();

      for (var i = 0; i < this.files.length; i++) {
        var addFile = true;
        this.filesToUpload.forEach(function (item) {
          if (item.name === _this.files[i].name) addFile = false;
        });
        if (addFile) this.filesToUpload.push(this.files[i]);
      }
    }; //lifecycle method for loading icon


    _proto.attached = function attached() {
      feather.replace();
    };

    return helptickets;
  }()) || _class);
  _exports.helptickets = helptickets;
  ;
});
define('text!modules/helpTickets.html',[],function(){return "<template>\r\n    <require from=\"./home.css\"></require>\r\n\r\n    <h1>${message}</h1>\r\n\r\n    <div class=\"container\"></div>\r\n        <div class=\"row\">\r\n            <div class=\"col-9\" >\r\n                <compose show.bind=\"showHelpTicketEditForm\" view=\"./components/editHelpTicket.html\"></compose>\r\n                <compose show.bind=\"!showHelpTicketEditForm\" view=\"./components/tableHelpTickets.html\"></compose>\r\n            </div>\r\n            <div class=\"col-3\" >\r\n                <img src=\"/images/help_button2.gif\" class=\"img-fluid\" alt=\"Responsive image\" >\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</template>";});
define('modules/home',["exports", "aurelia-framework", "aurelia-router"], function (_exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  _exports.__esModule = true;
  _exports.Home = void 0;

  var _dec, _class;

  var Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function Home(router) {
    this.router = router;
    this.message = 'HelpMe - Ticket Application Website!';
    this.message2 = 'Thank you for logging in ';
  }) || _class);
  _exports.Home = Home;
  ;
});
define('text!modules/home.css',[],function(){return "* {     font-family:  Helvetica;\r\n}\r\n\r\nh1 {\r\n    color: blue;\r\n    text-align: center;\r\n  }\r\n\r\nh3 {\r\n    color: red;\r\n    text-align: center;\r\n }\r\n\r\n body {\r\n    background-color: lightblue;\r\n  }\r\n\r\n  small_img {\r\n    height:\"50px\"; width:\"50px\"; \r\n\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n  }\r\n\r\n  img {\r\n    height:\"50%\"; width:\"50%\"; \r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n  }\r\n\r\n";});
define('text!modules/home.html',[],function(){return "<template>\r\n\t<require from = \"./home.css\"></require>\r\n\t<h1>${message}</h1>\r\n\t<h3>${message2}</h3>\r\n\t<img src=\"/images/help_ticket.png\">\r\n</template>\r\n\r\n";});
define('modules/landing',["exports", "aurelia-framework", "aurelia-router"], function (_exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  _exports.__esModule = true;
  _exports.Landing = void 0;

  var _dec, _class;

  var Landing = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function Landing(router) {
    this.router = router;
    this.message = 'HelpMe - Ticket Application Website!';
    this.message2 = 'Please log in';
  }) || _class);
  _exports.Landing = Landing;
  ;
});
define('text!modules/landing.html',[],function(){return "<template>\r\n    <require from = \"./home.css\"></require>\r\n    <h1>${message}</h1>\r\n    <h3>${message2}</h3>\r\n    <img src=\"/images/keyboard_help.png\" >\r\n</template>";});
define('modules/users',["exports", "aurelia-framework", "aurelia-router", "../resources/data/user-object"], function (_exports, _aureliaFramework, _aureliaRouter, _userObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.users = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var users = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userObject.User), _dec(_class =
  /*#__PURE__*/
  function () {
    function users(router, _users) {
      this.router = router;
      this.users = _users;
      this.message = 'All Users, Roles, and Active Status';
      this.message2 = '(Admin access only)';
      this.showUserEditForm = false;
    }

    var _proto = users.prototype;

    //initialize new user form for input
    _proto.newUser = function newUser() {
      this.user = {
        fname: "",
        lname: "",
        active: true,
        role: "user",
        email: "",
        password: ""
      };
      this.openEditForm();
    };

    //save user for insert and update
    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.user && this.user.fname && this.user.lname && this.user.email && this.user.password)) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return this.users.saveUser(this.user);

              case 3:
                _context.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    //back to user grid
    _proto.back = function back() {
      this.showUserEditForm = false;
    };

    //set the form to selected user
    _proto.editUser = function editUser(user) {
      this.user = user;
      this.openEditForm();
    };

    //display edit form (for insert and udpate)
    _proto.openEditForm = function openEditForm() {
      this.showUserEditForm = true;
      setTimeout(function () {
        $("#firstName").focus();
      }, 500);
    };

    //delete a user
    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.user) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return this.users.delete(this.user);

              case 3:
                _context2.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
                ;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function _delete() {
        return _delete2.apply(this, arguments);
      };
    }();

    //changing an selected user from teh grid
    _proto.changeActive = function changeActive(user) {
      this.user = user;
      this.save();
    };

    //lifecycle method upon page load
    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getUsers();

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    //get all the users
    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.users.getUsers();

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    //lifecycle method for loading icon
    _proto.attached = function attached() {
      feather.replace();
    };

    return users;
  }()) || _class);
  _exports.users = users;
  ;
});
define('text!modules/users.html',[],function(){return "<template>\r\n    <require from=\"./home.css\"></require>\r\n\r\n    <h1>${message}</h1>\r\n    <h3>${message2}</h3>\r\n    <div class=\"row\">\r\n        <div class=\"col-3\">\r\n            <img  src=\"/images/stick_figure_admin.png\" \r\n             class=\"img-fluid\" alt=\"Responsive image\">\r\n        </div>\r\n        <div class=\"col-9\">\r\n                <compose show.bind=\"showUserEditForm\" view=\"./components/editUser.html\"></compose>\r\n                <compose show.bind=\"!showUserEditForm\" view=\"./components/tableUsers.html\"></compose>\r\n        </div>\r\n    </div>\r\n\r\n</template>";});
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (_exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  _exports.__esModule = true;
  _exports.DataServices = void 0;

  var _dec, _class;

  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class =
  /*#__PURE__*/
  function () {
    //http request
    function DataServices(http) {
      var _this = this;

      //base stuff
      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');

            _request.headers.append('Authorization', authHeader);

            return _request;
          },
          response: function response(_response) {
            return _response;
          }
        });
      });
    } //generic get 


    var _proto = DataServices.prototype;

    _proto.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    }; //generic post 


    _proto.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    }; //generic put


    _proto.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    }; //generic delete


    _proto.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    }; //upload a file


    _proto.uploadFiles = function uploadFiles(files, url) {
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append(item.name, item);
      });
      return this.httpClient.fetch(url, {
        method: 'post',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
  _exports.DataServices = DataServices;
  ;
});
define('resources/data/help-ticket-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.Helpticket = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  //import { helptickets } from '../../modules/helpTickets';
  var Helpticket = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function Helpticket(data) {
      this.data = data;
      this.HELP_TICKET_SERVICE = 'helptickets';
      this.HELP_TICKETCONTENT_SERVICE = '/HelpTicketContent/helpTicket';
      this.HELP_FILEUPLOAD_SERVICE = 'HelpTicketContent/helpTicket';
    }

    var _proto = Helpticket.prototype;

    //get all help tickets 
    _proto.getHelpTickets =
    /*#__PURE__*/
    function () {
      var _getHelpTickets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(userObj) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.HELP_TICKET_SERVICE;

                if (userObj.role == 'user') {
                  url += '/user/' + userObj._id;
                }

                ;
                _context.next = 5;
                return this.data.get(url);

              case 5:
                response = _context.sent;

                if (!response.error) {
                  this.helpticketsArray = response;
                } else {
                  this.helpticketsArray = [];
                }

                ;

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getHelpTickets(_x) {
        return _getHelpTickets.apply(this, arguments);
      };
    }();

    //get all content records to show
    _proto.getHelpTicketsContents =
    /*#__PURE__*/
    function () {
      var _getHelpTicketsContents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(inticketid) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = this.HELP_TICKETCONTENT_SERVICE + '/' + inticketid;
                _context2.next = 3;
                return this.data.get(url);

              case 3:
                response = _context2.sent;

                if (!response.error) {
                  this.helpticketscontentArray = response;
                } else {
                  this.helpticketscontentArray = [];
                }

                ;

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getHelpTicketsContents(_x2) {
        return _getHelpTicketsContents.apply(this, arguments);
      };
    }();

    //save both ticket and content (for both insert and update)
    _proto.saveHelpticketAndContent =
    /*#__PURE__*/
    function () {
      var _saveHelpticketAndContent = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(helpticket) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!helpticket) {
                  _context3.next = 12;
                  break;
                }

                if (!helpticket.helpTicket._id) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 4;
                return this.data.put(helpticket, this.HELP_TICKET_SERVICE);

              case 4:
                serverResponse = _context3.sent;
                _context3.next = 10;
                break;

              case 7:
                _context3.next = 9;
                return this.data.post(helpticket, this.HELP_TICKET_SERVICE);

              case 9:
                serverResponse = _context3.sent;

              case 10:
                ;
                return _context3.abrupt("return", serverResponse);

              case 12:
                ;

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function saveHelpticketAndContent(_x3) {
        return _saveHelpticketAndContent.apply(this, arguments);
      };
    }();

    //delete
    _proto.deleteHelpticket =
    /*#__PURE__*/
    function () {
      var _deleteHelpticket = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(inhelpticket) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!inhelpticket) {
                  _context4.next = 3;
                  break;
                }

                _context4.next = 3;
                return this.data.delete(this.HELP_TICKET_SERVICE + '/' + inhelpticket);

              case 3:
                ;
                return _context4.abrupt("return", serverResponse);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function deleteHelpticket(_x4) {
        return _deleteHelpticket.apply(this, arguments);
      };
    }();

    //upload file
    _proto.uploadFile =
    /*#__PURE__*/
    function () {
      var _uploadFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(files, id) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.data.uploadFiles(files, this.HELP_FILEUPLOAD_SERVICE + "/upload/" + id);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function uploadFile(_x5, _x6) {
        return _uploadFile.apply(this, arguments);
      };
    }();

    return Helpticket;
  }()) || _class);
  _exports.Helpticket = Helpticket;
  ;
});
define('resources/data/user-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.User = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var User = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function User(data) {
      this.data = data;
      this.USER_SERVICE = 'users';
    }

    var _proto = User.prototype;

    //set up save user route (put and post)
    _proto.saveUser =
    /*#__PURE__*/
    function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 12;
                  break;
                }

                if (!user._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(user, this.USER_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(user, this.USER_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                ;
                return _context.abrupt("return", serverResponse);

              case 12:
                ;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function saveUser(_x) {
        return _saveUser.apply(this, arguments);
      };
    }();

    //set up get users route
    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.data.get(this.USER_SERVICE);

              case 2:
                response = _context2.sent;

                if (!response.error) {
                  this.usersArray = response;
                } else {
                  this.usersArray = [];
                }

                ;

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    //setup dete user route
    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(user) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(user && user._id)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.data.delete(this.USER_SERVICE + '/' + user._id);

              case 3:
                ;

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _delete(_x2) {
        return _delete2.apply(this, arguments);
      };
    }();

    return User;
  }()) || _class);
  _exports.User = User;
  ;
});
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.NavBar = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth) {
      this.router = router;
      this.auth = auth;
      this.loginMessage = '';
    }

    var _proto = NavBar.prototype;

    //jQuery lifecycle method for highlighting selected menu option
    _proto.attached = function attached() {
      $('.navbar-nav a').on('click', function () {
        $('.navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
    };

    //authenticate and save token is local object as well as 
    //add user object from session object, and set isAuthenticated to true
    _proto.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        _this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(_this.userObj));
        _this.loginError = "";
        _this.isAuthenticated = _this.auth.isAuthenticated();
        _this.loginMessage = "Welcome " + _this.userObj.fname + "!";

        _this.router.navigate('home');
      }).catch(function (error) {
        console.log(error);
        _this.authenticated = false;
        _this.loginMessage = "Invalid credentials.";
      });
    };

    //remove user object from session object, and set isAuthenticated to false
    _proto.logout = function logout() {
      if (this.userObj) {
        this.auth.logout(this.userObj.email);
        sessionStorage.removeItem('user');
        this.isAuthenticated = this.auth.isAuthenticated();
        this.auth.logout();
      }

      ;
    };

    //loading nav bar, set auth to false
    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.isAuthenticated = false;

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    //bind lifecycle method to initialize the isAuthenticated
    _proto.bind = function bind() {
      this.isAuthenticated = this.auth.isAuthenticated();
    };

    return NavBar;
  }()) || _class);
  _exports.NavBar = NavBar;
  ;
});
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\r\n    <nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\r\n        <a class=\"navbar-brand\" href=\"#\">HelpMeWebsite!</a>\r\n        <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarText\" aria-controls=\"navbarText\"\r\n            aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n        <span show.bind=\"loginMessage\" style=\"color:white;margin-left: 10px;\">\r\n            ${loginMessage}\r\n        </span>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n            <div show.bind=\"!isAuthenticated\">\r\n                <form class=\"form-inline\">\r\n                    <div class=\"form-group mb-2\">\r\n                        <label for=\"staticEmail2\" class=\"sr-only\">Email</label>\r\n                        <input type=\"text\" class=\"form-control\" id=\"staticEmail2\" value.bind=\"email\" placeholder=\"Email\">\r\n                    </div>\r\n                    <div class=\"form-group mx-sm-3 mb-2\">\r\n                        <label for=\"inputPassword2\" class=\"sr-only\">Password</label>\r\n                        <input type=\"password\" class=\"form-control\" id=\"inputPassword2\" value.bind=\"password\"\r\n                            placeholder=\"Password\">\r\n                    </div>\r\n                    <button type=\"submit\" class=\"btn btn-primary mb-2\" click.trigger=\"login()\">Login</button>\r\n                    <span show.bind=\"loginError\" style=\"color:yellow; margin-left: 10px;\">\r\n                        ${loginMessage}\r\n                    </span>\r\n                </form>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n            <ul class=\"navbar-nav\" show.bind=\"isAuthenticated\">\r\n                <li class=\"nav-item active\">\r\n                    <a class=\"nav-link\" href=\"#Home\">Home <span class=\"sr-only\">(current)</span></a>\r\n                </li>\r\n                <li class=\"nav-item\" show.bind=\"userObj.role ==='admin'\">\r\n                    <a class=\"\r\n                        nav-link\" href=\"#Users\">Users</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" href=\"#HelpTickets\">Help Tickets</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" href=\"#Logout\" click.trigger=\"logout()\">Logout</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </nav>\r\n</template>";});
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {
    //global references
    config.globalResources(['./elements/nav-bar']);
    config.globalResources(['./value-converters/format-date']);
  }
});
define('resources/value-converters/format-date',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.FormatDateValueConverter = void 0;

  var FormatDateValueConverter =
  /*#__PURE__*/
  function () {
    function FormatDateValueConverter() {}

    var _proto = FormatDateValueConverter.prototype;

    _proto.toView = function toView(value) {
      var myDate = new Date(value);
      return myDate.toLocaleDateString() + "<br/>" + myDate.toLocaleTimeString();
    };

    return FormatDateValueConverter;
  }();

  _exports.FormatDateValueConverter = FormatDateValueConverter;
  ;
});
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map