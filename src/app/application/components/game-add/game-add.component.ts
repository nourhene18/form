import { Component } from '@angular/core';
import { Category } from '../../model/category';


@Component({
  selector: 'app-game-add',
  standalone: true,
  imports: [],
  templateUrl: './game-add.component.html',
  styleUrl: './game-add.component.css'
})
export class GameAddComponent  {
  categories = Object.values(Category);
}
