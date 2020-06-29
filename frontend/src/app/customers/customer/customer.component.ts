import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';

import { CustomerService } from '../../shared/customer.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  
  genders=['male', 'female', 'other']

  constructor(public service: CustomerService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CustomerComponent>) { }

  ngOnInit() {
  	this.service.getCustomers();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value){
        this.service.addCustomer(this.service.form.value).subscribe(data=>{
          if(data){
            this.notificationService.success(data.message);
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.onClose();
          }
        })
      }else{
        this.service.updateCustomer(this.service.form.get('_id').value, 
        this.service.form.value).subscribe(data=>{
          this.notificationService.success(data.message);
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.onClose();
        })
      }
    }
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.service.filter('Refresh Table');
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
