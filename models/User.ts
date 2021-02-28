import "next-auth";

declare module "next-auth" {
  interface User {
    snowflake: string; // Or string
  }
}