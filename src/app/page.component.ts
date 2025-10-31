import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { IHeaderInfo } from './shared/loader';

@Component({
  imports: [RouterModule, HeaderComponent],
  selector: 'app-page',
  template: ` <app-header [header]="header()" /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  header = input.required<IHeaderInfo>();
}
