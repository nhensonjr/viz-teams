export class User {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  password: string;

  constructor(id: string, firstName: string, lastName: string, position: string, email: string, password: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.email = email;
    this.password = password;
  }
}
