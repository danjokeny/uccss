import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'


@inject(Router, User)
export class users {
  constructor(router, users) {
    this.router = router;
    this.users = users;
    this.message = 'All Users, Roles, and Active Status';
    this.showUserEditForm = false;
  };

  newUser() {
    this.user = {
      fname: "",
      lname: "",
      active: true,
      role: "user",
      email: "",
      password: ""
    };
    //this.showUserEditForm = true;
    this.openEditForm();
  };

  async save() {
    if (this.user && this.user.fname && this.user.lname
      && this.user.email && this.user.password)
      await this.users.saveUser(this.user);
    await this.getUsers();
    this.back();
  };

  back() {
    this.showUserEditForm = false;
  };

  async saveUser(user) {
    let serverResponse;
    if (user) {
      if (user._id) {
        serverResponse = await this.data.put(user, this.USER_SERVICE);
      } else {
        serverResponse = await this.data.post(user, this.USER_SERVICE);
      };
      return serverResponse;
    };
  };

  async delete() {
    if (this.user) {
      await this.users.delete(this.user);
      await this.getUsers();
      this.back();
    };
  };

  openEditForm() {
    this.showUserEditForm = true;
    setTimeout(() => { $("#firstName").focus(); }, 500);
  };


  //lifecycle method upon page load
  async activate() {
    await this.getUsers();
  };

  async getUsers() {
    await this.users.getUsers();
  };

  //lifecycle method for loading icon
  attached() {
    feather.replace()
  };


};




