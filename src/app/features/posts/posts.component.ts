import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Posts } from 'src/app/classes/newsfeed';
import { Users } from 'src/app/classes/users';
import { GeralService } from 'src/app/services/geral.service';
import { NewsfeedService } from 'src/app/services/newsfeed.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  infoPosts: any = [];
  formCreatePost: FormGroup;
  lastId: number;

  constructor(private geralSrv: GeralService, private newsfeedSrv: NewsfeedService) { }

  ngOnInit(): void {
    this.formCreatePost = new FormGroup({
      txtPost: new FormControl('', Validators.required)
    });

    this.newsfeedSrv.getPosts().subscribe(r => {
      this.lastId = r.id + 1;
    });

    this.obterInfoPosts();
  }

  get f() { return this.formCreatePost.controls; }

  obterInfoPosts() {
    this.newsfeedSrv.getPosts().subscribe((r: any) => {
      this.infoPosts = r;
      console.log(this.infoPosts);
    }, (error: any) => alert(error));
  }

  createPost() {
    var objPost: Posts = {
      id: this.lastId,
      text_post: this.f.txtPost.value,
      date_post: new Date(),
      image_post: 'assets/images/posts/cover.jpg',
      reactions: [
        {
          id_reaction: 1,
          type_reaction: 'like',
          num_reaction: 0
        },
        {
          id_reaction: 2,
          type_reaction: 'dislike',
          num_reaction: 0
        }
      ],
      comments: [
        {
          id_comment: 1,
          text_comment: "",
          date_comment: new Date(),
          replies: [
            {
              id_reply: 1,
              text_reply: "",
              date_reply: new Date()
            }
          ]
        }
      ],
      shares: {
        id_share: 1,
        num_share: 0
      },
      user: {
        id_user: 1,
        username: 'luigi',
        image_user: 'assets/images/avatars/user.jpg'
      }
    };

    this.newsfeedSrv.createPosts(objPost).subscribe(
      r => alert(`Inserted new post! Details: \r\n ${r}`),
      error => alert(error)
    );
  }
}
