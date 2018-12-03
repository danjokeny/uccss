import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Helpticket } from '../resources/data/help-ticket-object'


@inject(Router, Helpticket)
export class helptickets {
    constructor(router, helptickets) {
        this.router = router;
        this.helptickets = helptickets;
        this.message = 'All help tickets page';
        this.showHelpTicketEditForm  = false;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    };

    async activate() {
        await this.helptickets.getHelpTickets(this.userObj);
    };                    
    
    newHelpTicket() {
        console.log('loading a new editForm')
        this.helpticket = {
            title: "What is the title here?",
            personname: this.userObj.fname + this.userObj.lname,
            ownername: "who will own this?",
            status: ''
        };
        console.log(' this.helpticket =' +  this.helpticket.title)
       /* this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };*/
        this.showEditForm();
    };

    showEditForm() {
        this.showHelpTicketEditForm  = true;
        //setTimeout(() => { $("#Title").focus(); }, 500);
    };

    back() {
        this.showHelpTicketEditForm = false;
      };
      

    async editHelpTicket(helpticket) {
        console.log('trying to edit a ticket row')
      //  console.log('this.helpticket.OwnerName =' +  this.helpTickets.helpticket.OwnerName)
       // console.log('this.helpticket.PersonName =' + this.helpticket.PersonName)
       // console.log('this.helpticket.Title =' + this.helpticket.Title)
       // console.log('this.helpticket.Status =' + this.helpticket.Status)
        this.helpticket = helpticket;    
/*        this.helpTicketContent = {
            personId: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpticket._id)*/
        this.showEditForm();
    };

    async save() {
        console.log('trying to insert save')
        console.log('this.helpticket =' + this.helpticket)
        console.log('this.helpticket.title =' + this.helpticket.title)
        if (this.helpticket && this.helpticket.title 
            //&& this.helpTicketContent && this.helpTicketContent.content
            ) {
            if (this.userObj.role !== 'user') {
                this.helpticket.ownerId = this.userObj._id;
            };
            let helpTicket =   this.helpticket ;
//            let helpTicket = { helpTicket: this.helpticket, content: this.helpticketContent };
            await this.helptickets.saveHelpTicket(this.helpticket);
            await this.getHelpTickets();
            this.back();
        };
    };

  //lifecycle method for loading icon
  attached() {
    feather.replace()
  };

};