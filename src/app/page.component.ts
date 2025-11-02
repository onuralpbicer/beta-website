import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { IFooterInfo, IHeaderInfo } from './shared/loader';
import { FooterComponent } from './footer.component';

@Component({
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: 'app-page',
  template: `
    <app-header [header]="header()" />
    <main>
      <router-outlet />
    </main>
    <app-footer [footer]="footer()" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  header = input.required<IHeaderInfo>();
  footer = input.required<IFooterInfo>();
}
