import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followersReducer'
})
export class FollowersReducerPipe implements PipeTransform {

  transform(followers: number): string {
    if(followers > 999 && followers < 1000000)
      return Math.trunc(followers / 1000).toString() + 'K';
    
    if(followers >= 1000000)
      return Math.trunc(followers / 1000000).toString() + 'M';

    return followers.toString();
  }

}
