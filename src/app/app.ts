import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './header';

@Component({
  imports: [RouterModule, Header],
  selector: 'app-root',
  template: ` <app-header /> `,
  styles: ``,
})
export class App {}
