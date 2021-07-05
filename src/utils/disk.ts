import { bindCallback, Observable } from 'rxjs';
import * as fs from 'fs';
import { map } from 'rxjs/operators';

export function loadData<T>(path: string): Observable<T> {
  return bindCallback(fs.readFile)(path).pipe(
    map(([errno, buffer]) => {
      try {
        return JSON.parse(buffer.toString());
      } catch (e) {
        return {};
      }
    }),
  );
}

export function dumpData<T>(path: string, data: T): Observable<boolean> {
  return bindCallback(fs.writeFile)(path, JSON.stringify(data)).pipe(map(_ => true));
}
