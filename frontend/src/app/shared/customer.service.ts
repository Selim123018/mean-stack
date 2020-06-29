import { Injectable } from '@angular/core';
import { Customer } from './customer'
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  endpoint: string = 'http://localhost:5000/api/customers';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl(''),
    dateofBirth: new FormControl(''),
    city: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      _id: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      dateofBirth: '',
      city: ''
    });
  }

  addCustomer(data: Customer): Observable<any> {
    let API_URL = `${this.endpoint}/newCustomer`;
    return this.http.post(API_URL, data);
  }

  getCustomers(): Observable<any> {
    let API_URL = `${this.endpoint}/allCustomer`;
    return this.http.get(API_URL);
  }

  updateCustomer(id: String, data: Customer): Observable<any>{
    console.log(id)
    console.log(data)
    let API_URL = `${this.endpoint}/update/${id}`;
    return this.http.post(API_URL, data);
  }

  deleteCustomer(id: String): Observable<any>{
    let API_URL = `${this.endpoint}/delete/${id}`;
    return this.http.delete(API_URL);
  }
  
  populateForm(customer) {
    console.log(customer)
    this.form.setValue(_.omit(customer));
  }

  private listeners= new Subject<any>();

  listen():Observable<any>{
    return this.listeners.asObservable();
  }
  filter(filterBy:String){
    this.listeners.next(filterBy);
  }
}
