import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Pais, PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    paises: ['', Validators.required],
    fronteras: ['', Validators.required]
  })

  /// LLenado de selectores

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];
  // fronteras: PaisSmall[] = []

  /// UI

  cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private paisesServices: PaisesService ) { }

  ngOnInit() {

    this.regiones = this.paisesServices.regiones;

    // Cuando cambie la region
    // this.miFormulario.get( 'region' )?.valueChanges
    //   .subscribe( region => {
    //     console.log( region )

    //     this.paisesServices.getPaisesPorRegion( region )
    //       .subscribe( paises => {
    //         console.log( paises )
    //         this.paises = paises
    //       })

    //   })

    this.miFormulario.get( 'region' )?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get('paises')?.reset('');
          this.cargando = true;
        }),
        switchMap( region => this.paisesServices.getPaisesPorRegion( region ) )
      )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
      })

    this.miFormulario.get( 'paises' )?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.fronteras = [];
          this.miFormulario.get('fronteras')?.reset('');
          this.cargando = true;
        }),
        switchMap( codigo => this.paisesServices.getFronteraPorPais( codigo ) )
      )
      .subscribe( pais => {
        this.fronteras = pais?.borders || [];
        this.cargando = false;
      })

  }

  guardar() {

    console.log( this.miFormulario.value )

  }

}