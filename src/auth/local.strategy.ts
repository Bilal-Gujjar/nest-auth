import { UnauthorizedException,Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super();
    }
    
    // validate(username: string, password: string): User{

    //     const  user: User = this.userService.getUserbyUsername(username);
    //     if (user === undefined) throw new UnauthorizedException();
    //     if (user!== undefined && user.password === password) 
    //         return user;  
    //     else throw new UnauthorizedException();
    // }
    //authenticate with email and password
    //    validate(username: string, password: string): User{

    //     const  user: User = this.userService.getUserbyUsername(username);
    //     if (user === undefined) throw new UnauthorizedException();
    //     if (user!== undefined && user.password === password) 
    //         return user;  
    //     else throw new UnauthorizedException();
    // }
   

    //validate with email and password
    
    // async validate(email: string, password: string): Promise<User> {
    //     const user: User = await this.userService.getUserByEmail(email, password);
    //     if (user === undefined) throw new UnauthorizedException();
    //     console.log(user);
        
    //     if (user !== undefined && user.password === password)
        
    //         return user;

    //     else throw new UnauthorizedException();
    // }

    //validate the user for local strategy
    async validate(username: string, password: string): Promise<User> {
        const user: User = await this.userService.getUserbyUsername(username);
        if (user === undefined) throw  new UnauthorizedException();
        if (user !== undefined && user.password === password)
        //console.log(user);
        
            return user;
        else throw new UnauthorizedException();
    }

    //

        

}
