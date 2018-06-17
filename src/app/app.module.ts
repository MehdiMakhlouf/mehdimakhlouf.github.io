import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AceEditorModule} from 'ng2-ace-editor';


import {AppComponent} from './app.component';
import {ChapitreComponent} from './chapitre/chapitre.component';
import {SousChapitreComponent} from './sous-chapitre/sous-chapitre.component';
import {ConsoleInteractiveComponent} from './console-interactive/console-interactive.component';
import {MaterializeModule} from 'angular2-materialize';
import {ConsoleStaticComponent} from './console-static/console-static.component';
import {ConsoleInteractiveService} from './helpers/console-interactive.service';


@NgModule({
  declarations: [
    AppComponent,
    ChapitreComponent,
    SousChapitreComponent,
    ConsoleInteractiveComponent,
    ConsoleStaticComponent
  ],
  imports: [
    BrowserModule,
    AceEditorModule,
    MaterializeModule
  ],
  providers: [ConsoleInteractiveService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
