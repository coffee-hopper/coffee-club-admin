export interface User {
  id: string;
  googleEmail: string;
  username: string;
  role: "user" | "admin";
  googlePicture?: string;
  // Add other user properties as needed
}
