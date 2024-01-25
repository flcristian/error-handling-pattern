import {Component, OnInit} from '@angular/core';
import {from, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-rethrow-strategy',
  standalone: true,
  imports: [],
  templateUrl: './rethrow-strategy.component.html',
  styleUrl: './rethrow-strategy.component.css'
})
export class RethrowStrategyComponent implements OnInit {
  stream$ = from(['5', '10', '6', 'Hello', '2']);

  ngOnInit(){
    console.log("=-=-=-=-=-=-=-=\nRETHROW STRATEGY\n=-=-=-=-=-=-=-=")
    this.stream$.pipe(
      map((value) => {
        if(isNaN(value as any)) {
          throw new Error('This is not a number.')
        }
        return parseInt(value)
      }),
      catchError((error) => {
        console.log('Caught Error: ', error);
        return throwError(() => error)
      })
    )
      .subscribe({
        next: (res) => console.log('Value emitted', res),
        error: (err) => console.log('Error occurred', err),
        complete: () => console.log('Stream completed!')
      })
  }
}
