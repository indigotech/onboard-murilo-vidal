export class UserFixture {
  name: string;
  email: string;
  password: string;
  birthDate: Date;

  constructor(
    name = 'Mário Quintana',
    email = 'mario@quintana.com',
    password = 'marioquintana',
    birthDate = new Date('07-30-1906'),
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.birthDate = birthDate;
  }
}
