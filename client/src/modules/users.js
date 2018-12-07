import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'


@inject(Router, User)
export class users {
  constructor(router, users) {
    this.router = router;
    this.users = users;
    this.message = 'All Users, Roles, and Active Status';
    this.message2 = '(Admin access only)';
    this.showUserEditForm = false;
  };

  //initialize new user form for input
  newUser() {
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
  async save() {
    if (this.user && this.user.fname && this.user.lname
      && this.user.email && this.user.password)
      await this.users.saveUser(this.user);
    await this.getUsers();
    this.back();
  };

  //back to user grid
  back() {
    this.showUserEditForm = false;
  };

  //set the form to selected user
  editUser(user) {
    this.user = user;
    this.openEditForm();
  };

  //display edit form (for insert and udpate)
  openEditForm() {
    this.showUserEditForm = true;
    setTimeout(() => { $("#firstName").focus(); }, 500);
  };
  
  //delete a user
  async delete() {
    if (this.user) {
      await this.users.delete(this.user);
      await this.getUsers();
      this.back();
    };
  };

  //changing an selected user from teh grid
  changeActive(user) {
    this.user = user;
    this.save();
  };


  //lifecycle method upon page load
  async activate() {
    await this.getUsers();
  };

  //get all the users
  async getUsers() {
    await this.users.getUsers();
  };

  //lifecycle method for loading icon
  attached() {
    feather.replace()
  };


};




