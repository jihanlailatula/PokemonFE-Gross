import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pokemon } from './pokemon';
import { pokemonList } from './pokemonList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

    // POKEMON all
    public getPokemonList(): Observable<pokemonList[]> {
      return this.http.get<pokemonList[]>(`${this.apiServerUrl}/pokeAPI/all`)
    }

    // MY POKEMON 
    public getPokemons(): Observable<pokemon[]> {
      return this.http.get<pokemon[]>(`${this.apiServerUrl}/pokemon/all`)
    }

    public addPokemon(Pokemon : pokemon): Observable<pokemon> {
      return this.http.post<pokemon>(`${this.apiServerUrl}/pokemon/add`,Pokemon)
    }

    public updatePokemon(Pokemon : pokemon): Observable<pokemon> {
      return this.http.put<pokemon>(`${this.apiServerUrl}/pokemon/update`,Pokemon)
    }

    public deletePokemon(Pokemonid : number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/pokemon/delete/${Pokemonid}`)
    }
   
}
