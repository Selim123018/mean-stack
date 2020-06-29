import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerService } from './shared/customer.service';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { TableComponent } from './table/table.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerComponent,
    CustomerListComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
  entryComponents:[CustomerComponent]
})
export class AppModule { }
