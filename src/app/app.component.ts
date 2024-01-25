import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ReplaceStrategyComponent} from "./replace-strategy/replace-strategy.component";
import {RethrowStrategyComponent} from "./rethrow-strategy/rethrow-strategy.component";
import {RetryingStrategyComponent} from "./retrying-strategy/retrying-strategy.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReplaceStrategyComponent, RethrowStrategyComponent, RetryingStrategyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'error-handling-pattern';
}
