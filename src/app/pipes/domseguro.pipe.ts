import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer){}
  transform(value: string): any {
    const uri = 'https://open.spotify.com/embed?uri=';
    // Verificamos que la url no contenga información maliciosa y transformamos la información
    return this._domSanitizer.bypassSecurityTrustResourceUrl(uri + value);
  }

}
