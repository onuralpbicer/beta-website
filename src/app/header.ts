import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CONTENTFUL_CLIENT } from './shared/contentful.client';
import { IAppHeaderFields, IContentfulEntries } from './shared/contentful';
import { from, tap } from 'rxjs';
import { EntrySkeletonType } from 'contentful';

@Component({
  selector: 'app-header',
  imports: [],
  template: ``,
  styles: `
    :host {
        display: block; 
    }  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly contentfulClient = inject(CONTENTFUL_CLIENT);

  readonly test = rxResource({
    stream: () =>
      from(
        this.contentfulClient.getEntry<EntrySkeletonType<IAppHeaderFields>>(
          IContentfulEntries.AppHeader
        )
      ).pipe(
        tap((entry) => {
          console.log(entry.fields.logo);
        })
      ),
  });
}
