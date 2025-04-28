// frontend/src/app/app.module.ts (if not using standalone app bootstrap)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { TaskDashboardPageComponent } from "./features/tasks/pages/task-dashboard-page/task-dashboard-page.component"; // Import your Material module

@NgModule({
  declarations: [
    AppComponent
    // Other non-standalone components if any
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, // Add HttpClientModule
    MaterialModule // Add MaterialModule
    ,
    TaskDashboardPageComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }