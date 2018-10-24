import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  OnInit
} from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  isColorShown: boolean;
  isTweetButtonDisabled: boolean = false;
  enteredTitle: string = "";
  enteredContent: string = "";
  private mode: string = "create";
  private postId: string;
  post: Post;

  numberOfRows: number = 4;

  // @Output()
  // postCreated = new EventEmitter<Post>();

  constructor(
    el: ElementRef,
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
    console.log(el.nativeElement);
  }

  ngOnInit() {
    // we listen to changes in the route URL the route parameters to be precise and we can react to that and update the UI

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        // if we have a postId then we are in the edit mode otherwise we are in the create mode
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    // const post:Post = {
    //   title:this.enteredTitle,
    //   content:this.enteredContent
    // }
    console.log(form);
    if (form.invalid) {
      return;
    }
    const post: Post = {
      id: null,

      title: form.value.title,
      content: form.value.content
    };
    if (this.mode === "create") {
      this.postsService.addPost(post);
    } else {
    this.postsService.updatePost(this.postId,form.value.title,form.value.content);
    }

    // this.postCreated.emit(post);
    form.resetForm();
  }
  increaseHeightOfTextArea() {
    this.numberOfRows += 1;
  }

  toggleBorderColor() {}

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
