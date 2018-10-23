import {Component ,Input, OnChanges, SimpleChanges, OnInit, OnDestroy} from '@angular/core';
import {Post} from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription} from 'rxjs';

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnChanges,OnInit,OnDestroy{
    posts:Post[];
    private postsSub:Subscription;
    // @Input() posts:Post[] = [];
    // posts = [
    //     {
    //         title:'this is the first post'
    //     },
    //     {
    //         title:'this is the second post'
    //     },
    //     {
    //         title:'this is the third post'
    //     }
    // ]

    constructor(private postsService:PostsService){

    }

    ngOnInit(){
        // this is the method angular automatically executes for us when it creates this component
        // it is recommended that we do basic initialization tasks inside this lifecycle hook

        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostsUpdateListener()
            .subscribe((posts:Post[])=> {
                this.posts = posts;
            })
    }
    onDelete(postId:string){
        this.postsService.deletePost(postId);
    }

    ngOnChanges(changes:SimpleChanges):void {
        console.log(changes);
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}