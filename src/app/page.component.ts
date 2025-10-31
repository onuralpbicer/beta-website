import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { IHeaderInfo } from './shared/loader';
import { FooterComponent } from './footer.component';

@Component({
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: 'app-page',
  template: `
    <app-header [header]="header()" /> <router-outlet /> <app-footer />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  header = input.required<IHeaderInfo>();
}
