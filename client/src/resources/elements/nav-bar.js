import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)

export class NavBar {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.loginMessage = '';

    };

    //jQuery lifecycle method for highlighting selected menu option
    attached() {
        $('.navbar-nav a').on('click', function () {
            $('.navbar-nav').find('li.active').removeClass('active');
            $(this).parent('li').addClass('active');
        });
    };

    //authenticate and save token is local object as well as 
    //add user object from session object, and set isAuthenticated to true
    login() {
        return this.auth.login(this.email, this.password)
            .then(response => {
                this.userObj = response.user;
                sessionStorage.setItem("userObj", JSON.stringify(this.userObj));
                this.loginError = "";
                this.isAuthenticated = this.auth.isAuthenticated();
                this.loginMessage = "Welcome " + this.userObj.fname + "!";
                this.router.navigate('home');
            })
            .catch(error => {
                console.log(error);
                this.authenticated = false;
                this.loginMessage = "Invalid credentials.";
            });
    };

    //remove user object from session object, and set isAuthenticated to false
    logout() {
        if (this.userObj) {
            this.auth.logout(this.userObj.email);
            sessionStorage.removeItem('user');
            this.isAuthenticated = this.auth.isAuthenticated();
            this.auth.logout();
        };
    };

    //loading nav bar, set auth to false
    async activate() {
        this.isAuthenticated = false;
    };

    //bind lifecycle method to initialize the isAuthenticated
    bind() {
        this.isAuthenticated = this.auth.isAuthenticated();
    }

};
