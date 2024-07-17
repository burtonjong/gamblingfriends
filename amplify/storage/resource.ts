import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "amplify-du72x3ky0vx8i-t24-amplifyteamdrivebucket28-t35hewrozah3",
  access: (allow) => ({
    "profile-pictures/{entity_id}/*": [
      allow.guest.to(["read"]),
      allow.groups(["GuestUser"]).to(["read", "write"]),
      allow.groups(["AdminUser"]).to(["read", "write", "delete"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
    "picture-submissions/*": [
      allow.guest.to(["read", "write"]),
      allow.authenticated.to(["read", "write"]),
      allow.groups(["AdminUser"]).to(["read", "write", "delete"]),
      allow.groups(["GuestUser"]).to(["read", "write"]),
    ],
  }),
});
