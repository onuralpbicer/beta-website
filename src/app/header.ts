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
import { NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, NgOptimizedImage, MatButton],
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
    </mat-toolbar>

    <button mat-flat-button>Test button</button>
  `,
  styles: [
    `
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
