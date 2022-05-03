import { userStub, USER_STUB_EMAIL, USER_STUB_ID } from './user.stub';

export class MongooseUserApi {
  users = [
    userStub(USER_STUB_ID, USER_STUB_EMAIL),
    userStub('626c07c021c78dd30f4deaaa', 'FlenFelten@gmail.com'),
  ];

  find(field, value) {
    return this.users.find((user) => user[field] == value);
  }

  findById(id) {
    return this.users.find((user) => user._id == id);
  }

  findOne({ email }) {
    return this.users.find((user) => user.email == email);
  }

  findAll() {
    return null;
  }

  create(user) {
    if (user.email == 'fault@gmail.com') return null;
    else return user;
  }

  findByIdAndUpdate(id, newObj, option) {
    return newObj;
  }
}
