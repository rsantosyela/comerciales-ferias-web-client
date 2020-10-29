import { ProviderAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { CommercialAgent } from '../../models/commercial-agent';
import { Fair } from '../../models/fair';
import { ContactService } from '../../services/contact.service';
import { CommercialAgentService } from '../../services/commercial.agent.service';
import { FairService } from '../../services/fair.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
//import { ExportToCsv } from 'export-to-csv';
import { CommercialAgentRenderComponent } from '../../custom-components/commercial.agent.render.component';
import { FairRenderComponent } from '../../custom-components/fair.render.component';
import { NgxSmartModalService } from 'ngx-smart-modal'; 
//import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ ContactService, CommercialAgentService, FairService]
})
export class ContactsComponent implements OnInit {
  public contact: Contact;
  public contacts: Array<Contact>;
  public data;

  public commercialAgents: CommercialAgent;
  public fairs: Fair;

  public newContactName: string;
  public newContactEmail: string;
  public newContactPhone: number;
  public newContactCommercialAgent: string;
  public newContactFair: string;

  //public fair: Fair;
  //public selectedFairId: string;

  public contactForm: FormGroup;

  private defaultValuesContactForm = () => {
    return {
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      commercial_agent: ['', Validators.required],
      fair: ['', Validators.required],
    };
  }
  
  settings = {
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'editAction', title: '<i class="btn-edit">Editar</i>'},
        { name: 'deleteAction', title: '<i class="btn-delete">Eliminar</i>'},    
      ],
      position: 'right',
    }, 
    columns: {
      name: {
        title: 'Nombre',
        sortDirection: 'asc',
      },
      email: {
        title: 'Correo electrónico'
      },
      phone: {
        title: 'Teléfono'
      },
      commercial_agent: {
        title: 'Agente Comercial',
        type: "custom",
        renderComponent: CommercialAgentRenderComponent,
        filterFunction: (cell, search) => {
          return cell.name === search;
        }
      },
      fair: {
        title: "Feria",
        type: "custom",
        renderComponent: FairRenderComponent,
        filterFunction: (cell, search) => {
          return cell.name === search;
        }
      }
    },
    noDataMessage: "No hay comerciales registrados"
  };

  constructor(
    private _contactService: ContactService,
    private _commercialAgentService: CommercialAgentService,
    private _fairService: FairService,
    private _router: Router,
    private _route: ActivatedRoute,
    private ngxSmartModalService: NgxSmartModalService
  ){
    this.contact = new Contact("","","",0,"","");
    this.contacts;
  }

  ngOnInit(){
    this.getContacts();
    this.getCommercialAgents();
    this.getFairs();
    this.resetControllers();
  }

  resetControllers(){
    this.contactForm = new FormBuilder().group(this.defaultValuesContactForm());
  }
  
  customActions(event){
    this.contact = event.data;
    switch (event.action) {
 
      case "editAction":

        this.contactForm.setValue({
          name: this.contact.name,
          email: this.contact.email,
          phone: this.contact.phone,
          commercial_agent: this.contact.commercial_agent._id,
          fair: this.contact.fair._id,
        });

        this.ngxSmartModalService.getModal("updateContactModal").open();
      break;

      case "deleteAction":
        this.ngxSmartModalService.getModal("deleteContactModal").open();
      break;
      
      default:

      break;
    }
  }
  
  reload(){
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['contactos']);
  }

  getContacts(){
    this._contactService.getContacts().subscribe(
      response => {
        this.contacts = response.contacts;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCommercialAgents(){
    this._commercialAgentService.getCommercialAgents().subscribe(
      response => {
        this.commercialAgents = response.commercialAgents;
      },
      error => {
        console.log(error);
      }
    );
  }

  getFairs(){
    this._fairService.getFairs().subscribe(
      response => {
        this.fairs = response.fairs;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  startNewContactModal(){
    this.ngxSmartModalService.getModal("createContactModal").open();
  }

  createContact(){
    this.contact = new Contact("","","",0,"","");
    
    this.contact.name = this.contactForm.value.name;
    this.contact.email = this.contactForm.value.email;
    this.contact.phone = this.contactForm.value.phone;
    this.contact.commercial_agent = this.contactForm.value.commercial_agent;
    this.contact.fair = this.contactForm.value.fair;

    console.log(this.contact);

    this._contactService.createContact(this.contact).subscribe(
      response => {
        window.location.reload();
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  closeDeleteContactModal(){
    this.ngxSmartModalService.getModal("deleteContactModal").close();
  }
  
  updateContact(){
    this._contactService.updateContact(this.contact).subscribe(
      response => {
        window.location.reload();
        console.log(response);  
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteContact(id){
    this._contactService.deleteContact(id).subscribe(
      response => {
        window.location.reload();
        console.log(response);      
      },
      error => {
        console.log(<any>error);
      }
    )    
  }  
}
