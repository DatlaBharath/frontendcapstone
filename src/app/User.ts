export class User {
    id!: number;
    email: string;
    password: string;
    fullName: string;
    mobile: number;

    constructor(email: string, password: string, fullName: string, mobile: number) {
        // this.id = id;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.mobile = mobile;
    }

    toString(): string {
        return `User(id=${this.id}, email=${this.email}, fullName=${this.fullName}, mobile=${this.mobile})`;
    }

}
