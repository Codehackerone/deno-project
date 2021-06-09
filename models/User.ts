import { usersCollection } from "../mongo.ts";
export default class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor({ id = "", name = "", email = "", password = "" }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
  }

  static async findOne(params: object): Promise<any> {
    let user = await usersCollection.findOne(params, {
      noCursorTimeout: false,
    } as any);
    return user;
  }

  async save(this: any) {
    delete this.id;
    const oid = await usersCollection.insertOne(this);
    this.id = oid;
    return this;
  }
}
