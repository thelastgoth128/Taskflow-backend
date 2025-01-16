import { Users } from "src/users/entities/users.entity";

declare global{
    namespace Express {
        interface Request{
            user?:Users
        }
    }
}