import { CanActivate, ExecutionContext } from "@nestjs/common";


export class RoleGuard implements CanActivate {

    private rolePassed: string;
    constructor(role: string) {
        this.rolePassed = role;
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp()
        const user:any = request.getRequest<Request>();

        return this.rolePassed === user.user.role;
   

        
    }
}

