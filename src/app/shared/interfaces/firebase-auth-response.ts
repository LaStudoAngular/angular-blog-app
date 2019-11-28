export interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
  email?: string;
  displayName?: string;
  kind?: string;
  localId?: string;
  registered?: boolean;
  refreshToken?: string;
}
