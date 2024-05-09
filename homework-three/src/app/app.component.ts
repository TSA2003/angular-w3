import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public readonly minimumTitleLength = 5;
  public readonly minimumDescriptionLength = 7;

  public notesList: Note[] = [];
  public modelTitle = '';
  public modelDescription = '';
  public selectedNoteIndex = -1;
  public currentEditingNoteIndex = -1;
  public saveButtonDisabled;

  public saveNote() {

    if(this.currentEditingNoteIndex == -1) {

      let note: Note = new Note(this.modelTitle, this.modelDescription);
      this.notesList.push(note);
    }
    else {

      this.notesList[this.currentEditingNoteIndex].title = this.modelTitle;
      this.notesList[this.currentEditingNoteIndex].description = this.modelDescription;
    }
    this.resetData();
  }

  public changeSelectedNote(index) {

    this.selectedNoteIndex = index;
  }

  public deleteNote(index) {

    this.notesList.splice(index, 1);
    this.selectedNoteIndex = -1;
    this.resetData();
  }

  public editNote(index) {

    this.currentEditingNoteIndex = this.selectedNoteIndex;
    this.modelTitle = this.notesList[index].title;
    this.modelDescription = this.notesList[index].description;
  }

  public applyTitleInputStyle() {

    let style;
    this.saveButtonDisabled = false;
    if(this.modelTitle.length < this.minimumTitleLength) {
      style = {'border-color': 'red'}
      this.saveButtonDisabled = true;
    }

    return style;
  }

  public applyDescriptionInputStyle() {

    let style;
    this.saveButtonDisabled = false;
    if(this.modelDescription.length < this.minimumDescriptionLength) {
      style = {'border-color': 'red'}
      this.saveButtonDisabled = true;
    }

    return style;
  }

  public resetData() {

    this.modelTitle = '';
    this.modelDescription = '';
    this.selectedNoteIndex = -1;
    this.currentEditingNoteIndex = -1;
  }
}

export class Note {
  constructor(public title, public description) {}
}