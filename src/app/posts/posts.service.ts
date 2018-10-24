import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject, Subscriber, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: "root" // Angular 6 way of providing service to the angular Injector
})
export class PostsService {
  private posts: Post[] = [];
  private newFilteredArray:Post[];

  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    // spread operator
    // [] -> creates a new array
    // ... pulls the elements of some other array and assign in the new array
    // if I add or remove elements from this newly created array from some other
    // component I will not affect the original posts array
    // return [...this.posts];

    // the http GET request is not going to be fired if we have not called Subscriber() function
    // also note no need to store the Subscription and unsubscribe as for the features built into angular this will be handled by angular automatically

    // we were getting the json data that json data needs to be converted to javascript object
    // which is here being automatically handled by this.http.get method call
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:5000/api/posts"
      ).pipe(map(postData => {
        return postData.posts.map((post => {
          return {
            title:post.title,
            content:post.content,
            // we will use this id to delete the document from the collection
            id:post._id

          }
        }));
      }))
      .subscribe(trasformedPost => {
        this.posts = trasformedPost;
        console.log('transformed posts',this.posts);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post) {
    const newPost: Post = {
      id: null,
      title: post.title,
      content: post.content
    };
    this.http
      .post<{ message: string,postId:string }>("http://localhost:5000/api/posts", newPost)
      .subscribe(responseData => {
        console.log(responseData.message);
        const id = responseData.postId;
        // here  if you are wondering how can we edit a const object we can safely do that 
        // becoz we are not overwriting the object itself only its property
        newPost.id = id; 
        // no optimistic updating
        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
      });

    // optimistic adding the data ie showing data to user even before we have successfully received data from the server
    // this.posts.push(newPost);
    // this.postsUpdated.next([...this.posts]);
  }

  deletePost(postId:string){
    this.http.delete('http://localhost:5000/api/posts/' + postId)
      .subscribe((deleteResponse) => {
        console.log("deleted",deleteResponse);
        this.posts =  this.posts.filter(post => {
          return post.id !== postId;
        });
        this.postsUpdated.next([...this.posts]);

      })
  }

  updatePost(id:string,title:string,content:string){
    const post:Post = {id:id,title:title,content:content};
    // now we need to have a backend route to send this request
    this.http.put('http://localhost:5000/api/posts/' + id,post)
      .subscribe((response) => {
        console.log(response);
      })
  }

  getPost(id:string){
    return {...this.posts.find(p => p.id === id)};
  }



  // just checking the checkout command
}
