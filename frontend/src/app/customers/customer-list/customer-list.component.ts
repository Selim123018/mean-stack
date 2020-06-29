import { CustomerComponent } from './../customer/customer.component';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { CustomerService } from '../../shared/customer.service'
import { NotificationService } from '../../shared/notification.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  cols = [
    { key: "name", display: "data.name" },
    { key: "email", display: "data.email" },
    { key: "phone", display: "data.phone" },
    { key: "gender", display: "data.gender" },
    { key: "city", display: "data.city" },
    { key: "dateofBirth", display: "data.dateofBirth",
    config: { isDate: true, format: "dd MMM yy" }},
    { key: "action", display: "data.actions",
    config: { isAction: true, actions: ["delete", "update"] }}
  ];
 
  constructor(private service: CustomerService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService) { 
      this.service.listen().subscribe(()=>{
        this.refreshCustomer();
      })
    }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'email', 'phone', 'gender', 'dateofBirth', 'city', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;  

  ngOnInit(): void {
    this.service.getCustomers().subscribe(data=>{
      this.listData=new MatTableDataSource(data);
      this.changeDetectorRef.detectChanges();
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(CustomerComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(CustomerComponent, dialogConfig);
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
      this.service.deleteCustomer(id).subscribe(data=>{
          this.refreshCustomer();
          this.notificationService.warn(data.message);
      })
    }

  }

  refreshCustomer() {
    this.service.getCustomers().subscribe(data=>{
      this.listData.data=data
    })
  }

  onActionHandler(data) {
    if(typeof data==="object"){
      this.onEdit(data);
    }else{
      this.onDelete(data);
    }
  }

}
