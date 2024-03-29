import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableDisplayComponent } from './components/table-display/table-display.component';
import { CreateRiskComponent } from './components/create-risk/create-risk.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MatIcon } from '@angular/material/icon';
import { BubblePaginationDirective } from './directives/bubble-pagination.directive';
import { DeleteAlertComponent } from './components/delete-alert/delete-alert.component';

@NgModule({
  declarations: [AppComponent, TableDisplayComponent, DeleteAlertComponent],
  imports: [
    ToolbarComponent,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    CreateRiskComponent,
    FormsModule,
    BubblePaginationDirective,
  ],

  exports: [
    ToolbarComponent,
    CommonModule,
    CreateRiskComponent,
    MaterialModule,
    BubblePaginationDirective,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
