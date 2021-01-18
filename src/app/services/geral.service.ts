import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Posts } from '../classes/newsfeed';
import { Users } from '../classes/users';
import { NewsfeedService } from './newsfeed.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class GeralService {
  constructor(
    private usersSrv: UsersService, 
    private newsFeedSrv: NewsfeedService
  ) { }

  getMixedData(): any {
    let users = this.usersSrv.getUsersMapped();
    let posts = this.newsFeedSrv.getPosts();

    return forkJoin([users, posts]).pipe(
      map(r => {
        return [{
          id_user: r[0][0].id_user,
          username: r[0][0].username,
          image_user: r[0][0].image,
          id: r[1][0].id,
          text_post: r[1][0].text_post,
          date_post: r[1][0].date_post,
          image_post: r[1][0].image_post,
          reactions: r[1][0].reactions,
          comments: r[1][0].comments,
          shares: r[1][0].shares
        }];
      })
    );
  }
}
