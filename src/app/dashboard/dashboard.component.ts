import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Message } from '../interfaces/message.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashService: DashboardService) { }

  public editId: number;
  public editedValue: string;
  public addMessageForm = new FormGroup({
    newMessage: new FormControl(null, Validators.required)
  });
  newMessage = this.addMessageForm.get('newMessage');

  public messages: Message[];
  public errors = new Array();

  ngOnInit(): void {
    this.dashService.get().subscribe(data => {
      this.messages = data;
    }, err => {
      this.errors.push(err);
    })
  }

  setEditable(id: number, event: any) {
    this.editId = id;
    this.editedValue = this.messages.find(message => message.id === id).msg;
    event.target.innerText = "Save";
  }

  edit(id: number, event: any) {
    var msg: Message = {
      id: id,
      msg: this.editedValue
    }
    this.dashService.edit(msg).subscribe(data => {
      this.messages.find(message => message.id === id).msg = data.msg;
    });
    this.editId = null;
    event.target.textContent = "Edit";
  }

  delete(id: number) {
    this.dashService.delete(id).subscribe();
    let index = this.messages.findIndex(msg => msg.id === id);
    this.messages.splice(index, 1);
  }

  addMessage() {
    if(!this.addMessageForm.valid) {
      this.addMessageForm.markAllAsTouched();
      return;
    }
      
    var msg: Message = {
      id: 0,
      msg: this.newMessage.value
    }
    this.dashService.add(msg).subscribe(data => {
      this.messages.push(data);
    }, err => {
      this.errors.push(err);
    });
    this.addMessageForm.reset();
  }
}
