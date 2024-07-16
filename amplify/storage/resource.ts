import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "amplifyTeamDrive",
  access: (allow) => ({
    "profile-pictures/{entity_id}/*": [
      allow.groups(["GuestUser"]).to(["read"]),
      allow.groups(["AdminUser"]).to(["read", "write", "delete"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
    "picture-submissions/*": [
      allow.authenticated.to(["read", "write"]),
      allow.groups(["AdminUser"]).to(["read", "write", "delete"]),
    ],
  }),
});
