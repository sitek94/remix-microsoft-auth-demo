export enum UserRole {
  Admin = 'library-admin',
  Staff = 'library-staff',
  User = 'library-user',
}

export type User = {
  id: string
  name: string
  roles: UserRole[]
}
