import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "profileStorage",
  access: (allow) => ({
    "public/*": [
      allow.guest.to(["read", "write"]),
      allow.authenticated.to(["read", "write"]),
      allow.groups(["AdminUser"]).to(["read", "write", "delete"]),
      allow.groups(["GuestUser"]).to(["read", "write"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
  }),
});
