import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IFooterInfo } from './shared/loader';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer
      [style.grid-template-columns]="
        'repeat(' + footer().footerColumns.length + '), 1fr)'
      "
    >
      @for (column of footer().footerColumns; track column.title) {
      <h6>{{ column.title }}</h6>
      @for (link of column.links; track link.sys.id) {
      <a> {{ link.sys.id }} </a><br />
      } }

      <span class="copyright"> {{ footer().copyright }} {{ year }} </span>
    </footer>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      @use 'theme' as theme;

      :host {
        background: mat.get-theme-color(theme.$theme, primary);
        color: mat.get-theme-color(theme.$theme, on-primary);
        display: block;

        padding: 1rem;
        @media (min-width: 599px) {
          padding: 2rem;
        }
      }

      h6 {
        font-weight: normal;
      }

      footer {
        display: grid;
        grid-template-rows: auto min-content;
        grid-template-columns: repeat(2, 1fr);
      }

      .copyright {
        grid-row: 2;
        grid-column: 1 / span 2;
        text-align: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  footer = input.required<IFooterInfo>();

  readonly year = new Date().getFullYear();
}
