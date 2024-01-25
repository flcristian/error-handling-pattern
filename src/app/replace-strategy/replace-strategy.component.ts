import {Component, OnInit} from '@angular/core';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-replace-strategy',
  standalone: true,
  imports: [],
  templateUrl: './replace-strategy.component.html',
  styleUrl: './replace-strategy.component.css'
})
export class ReplaceStrategyComponent implements OnInit {
  stream$ = from(['5', '10', '6', 'Hello', '2']);

  ngOnInit(){
    console.log("=-=-=-=-=-=-=-=\nREPLACE STRATEGY\n=-=-=-=-=-=-=-=")
    this.stream$.pipe(
      map((value) => {
        if(isNaN(value as any)) {
          throw new Error('This is not a number.')
        }
        return parseInt(value)
      }),
      catchError((error) => {
        console.log('Caught Error: ', error);
        return of()
      })
    )
      .subscribe({
        next: (res) => console.log('Value emitted', res),
        error: (err) => console.log('Error occurred', err),
        complete: () => console.log('Stream completed!')
      })
  }
}
