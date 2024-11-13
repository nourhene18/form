import { Component, inject } from '@angular/core';
import { Category } from '../../model/category';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';


@Component({
  selector: 'app-game-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[GameService],
  templateUrl: './game-add.component.html',
  styleUrl: './game-add.component.css'
})
export class GameAddComponent  {
  categories = Object.values(Category);
  games: Game[]=[];
  /*gameForm:FormGroup=new FormGroup({
    id:new FormControl(1, {nonNullable:true}),
    name:new FormControl("Echec", {nonNullable:true}),
    price:new FormControl(46.3, {nonNullable:true}),
    madeIn:new FormControl('Tunisie', {nonNullable:true}),
    category:new FormControl(Category.BoardGames, {nonNullable:true}),
    isNew:new FormControl(true, {nonNullable:true}),

  })*/
  gameService: GameService=inject(GameService);
  formBuilder:FormBuilder=inject(FormBuilder);
  gameForm!:FormGroup;
  ngOnInit(): void {
    this.gameForm=this.formBuilder.nonNullable.group({
      id:[1],
      name:[''],
      price:[0],
      madeIn:['Tunisie'],
      category:[Category.BoardGames],
      isNew:[true]
    })
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
    this.gameForm.get('name')?.valueChanges.subscribe(
      (value)=>console.log(value)
    )
  }
  onSubmit(): void {
    let newId = this.games.length+1;
    this.gameForm.get('id')?.setValue(newId);

    this.gameService.addGame(this.gameForm.value).subscribe((game) => {
      this.games.push(game);  
      console.log('Jeu ajouté:', game);
    });
  }

  onResetForm(): void {
    this.gameForm.reset();
    this.gameForm.get('id')?.setValue(this.games.length+1);
    this.gameForm.get('madeIn')?.setValue('Autre');
    this.gameForm.get('category')?.setValue(Category.CardGames);


  }
}
