import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
} from '@angular/core';
import { CONTENTFUL_CLIENT } from './shared/contentful.client';
import { EntrySkeletonType } from 'contentful';
import { IPageFields } from './shared/contentful';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-tab',
  imports: [MatButtonModule],
  template: ` <button mat-button>{{ resource.value().fields.title }}</button> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTab {
  private readonly contentfulClient = inject(CONTENTFUL_CLIENT);

  link = input.required<string>();

  readonly resource = resource({
    params: () => this.link(),
    loader: ({ params: id }) =>
      this.contentfulClient.getEntry<EntrySkeletonType<IPageFields>>(id),
  });
}
