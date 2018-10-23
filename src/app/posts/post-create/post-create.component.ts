import { Component, ElementRef, EventEmitter, Output } from "@angular/core";
import {Post} from '../post.model';
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  isColorShown: boolean;
  isTweetButtonDisabled: boolean = false;
  enteredTitle: string = "";
  enteredContent: string = "";



  numberOfRows: number = 4;

  // @Output()
  // postCreated = new EventEmitter<Post>();
  


  constructor(el: ElementRef,private postsService:PostsService) {
    console.log(el.nativeElement);
  }

  onAddPost(form:NgForm) {
    // const post:Post = {
    //   title:this.enteredTitle,
    //   content:this.enteredContent
    // }
    console.log(form);
    if(form.invalid){
      return;
    }
    const post:Post = {
      id:null,
     

      title:form.value.title,
      content:form.value.content
    }

    this.postsService.addPost(post);
    // this.postCreated.emit(post);

    form.resetForm();
    
  }
  increaseHeightOfTextArea() {
    this.numberOfRows += 1;
  }

  toggleBorderColor() {
  }

  checkForTweetLength() {
    console.log(this.enteredContent.length);
    if (this.enteredContent && this.enteredContent.length > 20) {
        
      this.isTweetButtonDisabled = true;
      this.isColorShown = true;

    } else {
        this.isTweetButtonDisabled = false;
        this.isColorShown = false;
    }
  }
}
