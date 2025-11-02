import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IWhyUs } from './shared/contentful';

@Component({
  selector: 'app-why-us-card',
  imports: [MatIconModule],
  template: `
    <div class="icon-container">
      @if (whyUs().iconName) {
      <mat-icon>{{ whyUs().iconName }}</mat-icon>
      } @else {
      <img [src]="whyUs().icon" [alt]="whyUs().title + '_icon'" />
      }
    </div>
    <span [innerHTML]="whyUs().title"></span>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      @use 'theme' as theme;

      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        > .icon-container {
          padding: 1rem;
          background: mat.get-theme-color(theme.$theme, primary);
          color: mat.get-theme-color(theme.$theme, on-primary);
          border-radius: 50%;
          aspect-ratio: 1;
          display: grid;
          place-items: center;
        }

        > span {
          text-align: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyUsComponent {
  readonly whyUs = input.required<IWhyUs>();
}
