import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'


@inject(Router, User)
export class users {
  constructor(router, users) {
    this.router = router;
    this.users = users;
    this.message = 'This is where we will display users';
    this.showUserEditForm = false;

  }

  newUser() {
    this.user = {
      fname: "",
      lname: "",
      active: true,
      role: "user",
      email: "",
      password: ""
    }
    this.showUserEditForm = true;
  }

  async save() {
    if (this.user && this.user.fname && this.user.lname
      && this.user.email && this.user.password)
      await this.users.saveUser(this.user);
  }



}
    



