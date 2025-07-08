export interface User {
  uid: string
  email: string
  prenom?: string
  nom?: string
  telephone?: string
  role: 'client' | 'admin'
  dateCreation: string
  plan?: string
}
