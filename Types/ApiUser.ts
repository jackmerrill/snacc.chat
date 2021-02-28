import { User as UserModel} from '@prisma/client'
export class ApiUser {
  id: number;
  name: string;
  image: string;
  snowflake: string;
  constructor(user:UserModel) {
    this.id = user.id;
    this.name = user.name?user.name:"";
    this.image = user.image?user.image:"";
    this.snowflake = user.snowflake?user.snowflake:"";
  }

}
