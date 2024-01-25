import {Component, OnInit} from '@angular/core';
import {from, retry, retryWhen, tap, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-retrying-strategy',
  standalone: true,
  imports: [],
  templateUrl: './retrying-strategy.component.html',
  styleUrl: './retrying-strategy.component.css'
})
export class RetryingStrategyComponent implements OnInit {
  stream$ = from(['5', '10', '6', 'Hello', '2']);

  ngOnInit(){
    console.log("=-=-=-=-=-=-=-=\nRETRYING STRATEGY\n=-=-=-=-=-=-=-=")
    this.stream$.pipe(
      map((value) => {
        if(isNaN(value as any)) {
          throw new Error('This is not a number.')
        }
        return parseInt(value)
      }),
      retry(2),
      catchError((error) => {
        console.log('Caught Error: ', error);
        return throwError(() => error)
      })
      /*retryWhen((errors) => {
        return errors.pipe(
          tap(() => console.log('Retrying the source Observable...'))
        )
      })*/ // TRIES UNTIL THERE IS NO ERROR (here it's an infinite loop)
    )
      .subscribe({
        next: (res) => console.log('Value emitted', res),
        error: (err) => console.log('Error occurred', err),
        complete: () => console.log('Stream completed!')
      })
  }
}
