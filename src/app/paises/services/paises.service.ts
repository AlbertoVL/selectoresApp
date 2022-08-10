import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { combineLatest, combineLatestWith } from 'rxjs/operators';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = [ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ];
  private baseUrl: string = 'https://restcountries.com/v2'

  get regiones(): string[] {
    return [ ...this._regiones ];
  }

  constructor( private http: HttpClient ) { }

  getPaisesPorRegion( region: string ): Observable<PaisSmall[]> {

    const url: string = `${ this.baseUrl }/region/${ region }?fields=alpha3Code,name`
    return this.http.get<PaisSmall[]>( url )
  }

  getFronteraPorPais( codigo: string ): Observable<Pais | null> { /// getPaisPorCodigo

    if ( !codigo ){
      return of(null)
    }

    const url: string = `${ this.baseUrl}/alpha/${ codigo }`;
    return this.http.get<Pais>( url );
  }

  getPaisPorCodigo( codigo: string ): Observable<PaisSmall> { /// getPaisPorCodigoSmall

    const url: string = `${ this.baseUrl}/alpha/${ codigo }?fields=alpha3Code;name`;
    return this.http.get<PaisSmall>( url );
  }

  getPaisesPorFronteras( fronteras: string[] ) {
    
    if (!fronteras){
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    fronteras.forEach ( codigo => {
      const peticion = this.getPaisPorCodigo( codigo );
      peticiones.push( peticion );
    });

    return combineLatest( peticiones );
  }

}