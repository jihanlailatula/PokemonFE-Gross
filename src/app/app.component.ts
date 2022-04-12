import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { pokemon } from './pokemon';
import { pokemonList } from './pokemonList';
import { PokemonService } from './pokemon.service';
import {TooltipPosition} from '@angular/material/tooltip'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public pokemons: pokemon[] = [];
  public pokemonlists: pokemonList[] = [];
  public addPokemon: pokemonList | undefined;
  public detailPokemon: pokemonList | undefined;
  public updatePokemon: pokemon | undefined;
  public deletePokemon: pokemon | undefined;
  
  constructor(private pokemonService: PokemonService){}

  ngOnInit(){
    this.getPokemons();
    this.getPokemonLists();
  }
  
  public getPokemonLists():void {
    this.pokemonService.getPokemonList().subscribe(
      (response: pokemonList[]) =>{
        this.pokemonlists = response
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public getPokemons():void {
    this.pokemonService.getPokemons().subscribe(
      (response: pokemon[]) =>{
        this.pokemons = response
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
  

  public onAddPokemon(addForm: NgForm): void {
    document.getElementById("add-pokemon-form")!.click();
    this.pokemonService.addPokemon(addForm.value).subscribe(
      {
        next:(response:pokemon) =>{
          this.getPokemons();
          addForm.reset();
        },
        error: (error : HttpErrorResponse) =>{
          alert(error.message);
          addForm.reset();
        }
      }
    );
  }

  public onUpdatePokemon(Pokemon: pokemon): void{
    document.getElementById("button-edit-pokemon")!.click();
    this.pokemonService.updatePokemon(Pokemon).subscribe(
      {
      next:(response:pokemon) =>{
        this.getPokemons();
      },
      error: (error : HttpErrorResponse) =>{
        alert(error.message);
      }
    }
    );
  }

  public onDeletePokemon(pokemonId: number): void {
    this.pokemonService.deletePokemon(pokemonId).subscribe(
      {
        next:(response: void) => {
          console.log(response);
          this.getPokemons();
        },
        error:(error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
    
  }
  public MyPokemonModal( ):void {
    const thiscontainer = document.getElementById('container-nav');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#MyPokeModal');
    thiscontainer!.appendChild(button);
    button.click();
  }




  public AddModal(PokemonList:pokemonList ):void {

    const thiscontainer = document.getElementById('container-main');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    this.addPokemon = PokemonList;
    button.setAttribute('data-target','#AddModal');
    thiscontainer!.appendChild(button);
    button.click();
  }

  public DetailsModal(PokemonList:pokemonList ):void {

    const thiscontainer = document.getElementById('container-main');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    this.detailPokemon = PokemonList;
    button.setAttribute('data-target','#DetailsModal');
    thiscontainer!.appendChild(button);
    button.click();
  }

  public EditDeleteModal( mode:string, Pokemon: pokemon):void {
    const thiscontainer = document.getElementById('container-main');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');

    if (mode==='edit'){
      this.updatePokemon = Pokemon;
      button.setAttribute('data-target','#EditModal');
    }
    else if (mode==='delete'){
      this.deletePokemon = Pokemon;
      button.setAttribute('data-target','#DeleteModal');
    }
    thiscontainer!.appendChild(button);
    button.click();
  }



}
