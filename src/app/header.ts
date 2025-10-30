import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
} from '@angular/core';
import { CONTENTFUL_CLIENT } from './shared/contentful.client';
import { IAppHeaderFields, IContentfulEntries } from './shared/contentful';
import { EntrySkeletonType } from 'contentful';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTab } from './header-tab';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    NgOptimizedImage,
    MatButtonModule,
    MatIconModule,
    HeaderTab,
    MatInputModule,
  ],
  template: `
    <mat-toolbar>
      @if (logo.hasValue()) {
      <img
        [ngSrc]="logo.value().fields.file.url"
        [height]="36"
        [width]="108"
        alt="logo"
      />
      }

      <nav aria-label="Header tabs">
        @for (link of header.value()?.fields.headerLinks; track link.sys.id) {
        <app-header-tab [link]="link.sys.id" />
        }
      </nav>

      <button mat-icon-button class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>

    <button mat-flat-button>Test button</button>
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
export class Header {
  private readonly contentfulClient = inject(CONTENTFUL_CLIENT);

  readonly header = resource({
    loader: () =>
      this.contentfulClient.getEntry<EntrySkeletonType<IAppHeaderFields>>(
        IContentfulEntries.AppHeader,
      ),
  });

  readonly logo = resource({
    params: () => this.header.value()?.fields.logo.sys.id,
    loader: ({ params: id }) => this.contentfulClient.getAsset(id),
  });
}
