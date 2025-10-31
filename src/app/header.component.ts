import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IHeaderInfo } from './shared/loader';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatMenuModule,
  ],
  template: `
    <mat-toolbar>
      <img [src]="header().logo" [height]="36" [width]="108" alt="logo" />

      <nav aria-label="Header tabs">
        @for (link of header().headerLinks; track link.url) {
        <a mat-button [routerLink]="[link.url]">{{ link.title }}</a>
        }
      </nav>

      <button mat-icon-button class="menu-button" [matMenuTriggerFor]="menu">
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        @for (link of header().headerLinks; track link.url) {
        <a mat-menu-item [routerLink]="[link.url]">{{ link.title }}</a>
        }
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      @use 'theme' as theme;

      :host {
        @media (min-width: 599px) {
          mat-toolbar {
            justify-content: flex-start;
          }

          .menu-button {
            display: none;
          }

          nav {
            display: flex;
          }
        }
      }

      nav {
        display: none;
        align-items: center;
      }

      mat-toolbar {
        justify-content: space-between;
        border-bottom: 1px solid mat.get-theme-color(theme.$theme, surface-dim);

        @include mat.toolbar-overrides(
          (
            container-background-color:
              mat.get-theme-color(theme.$theme, surface),
            mobile-height: 48px,
            standard-height: 64px,
          )
        );
      }

      img {
        height: 36px;
        width: unset;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  header = input.required<IHeaderInfo>();
}
