export default class BaseModel {
    public static prepare(data: any) {
      data.id = data._id;
      delete data._id;
      return data;
    }
  }