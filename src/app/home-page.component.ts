import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IHomePage } from './shared/contentful';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule],
  template: `
    <section class="hero">
      <img [src]="home().heroImage" alt="hero_image" />

      <h1 class="mat-title-large">{{ home().heroTitle }}</h1>

      <p>{{ home().heroDescription }}</p>

      <button mat-flat-button>{{ home().linkText }}</button>
    </section>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      @use 'theme' as theme;

      .hero {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        > button {
          @include mat.button-overrides(
            (
              filled-container-color:
                mat.get-theme-color(theme.$theme, secondary-container),
              filled-label-text-color:
                mat.get-theme-color(theme.$theme, on-secondary-container),
            )
          );
        }

        padding: 1rem;
        @media (min-width: 599px) {
          padding: 2rem;
        }

        color: mat.get-theme-color(theme.$theme, on-primary);

        height: 40dvh;
        @media (min-width: 599px) {
          height: 50dvh;
        }

        img {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          z-index: -1;
        }

        &::after {
          content: '';
          z-index: -1;
          position: absolute;
          inset: 0;
          background: rgba(mat.get-theme-color(theme.$theme, primary), 0.5);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly home = input.required<IHomePage>();
}
