import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IHomePageInfo } from './shared/loader';
import { WhyUsComponent } from './why-us.component';

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, WhyUsComponent],
  template: `
    <section class="hero">
      <img [src]="home().heroImage" alt="hero_image" />

      <h1 class="mat-title-large">{{ home().heroTitle }}</h1>

      <p>{{ home().heroDescription }}</p>

      <button mat-flat-button>{{ home().linkText }}</button>
    </section>
    <section class="why-us">
      <h2>{{ home().whyUsTitle }}</h2>

      <div class="why-us-container">
        @for (whyUs of home().whyUs; track whyUs.title) {
        <app-why-us-card [whyUs]="whyUs" />
        }
      </div>
    </section>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      @use 'theme' as theme;

      section {
        padding: 1rem;
        @media (min-width: 599px) {
          padding: 2rem;
        }

        color: mat.get-theme-color(theme.$theme, on-background);

        > h2 {
          margin: 0;
        }
      }

      .why-us-container {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        justify-content: space-evenly;
        align-items: flex-start;

        > * {
          flex: 1;
        }
      }

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
  readonly home = input.required<IHomePageInfo>();
}
