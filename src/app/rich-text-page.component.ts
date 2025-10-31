import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IRichTextPage } from './shared/contentful';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-rich-text-page',
  imports: [JsonPipe],
  template: `
    <h1 class="mat-title-large">{{ richText().title }}</h1>
    <p>{{ richText().content | json }}</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextPageComponent {
  richText = input.required<IRichTextPage>();
}
