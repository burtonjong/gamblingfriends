import { signOut } from "aws-amplify/auth";

import { Authenticator } from "@aws-amplify/ui-react";
import type { MutationStatus } from "@tanstack/react-query";

const FormFieldButtons = ({
  mutationStatus,
}: {
  mutationStatus?: MutationStatus;
}) => {
  return (
    <div className="relative flex w-full flex-col justify-center gap-4 rounded-3xl bg-white">
      <Authenticator.SignUp.FormFields />
      <div className="flex w-full gap-3">
        <button
          onClick={() => void signOut()}
          className="rounded-full border-4 border-white bg-[#047D95] px-4 py-1 font-semibold text-white hover:opacity-90 md:px-8 md:py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={
            mutationStatus === "pending" || mutationStatus === "success"
          }
          className="rounded-full border-4 border-white bg-[#047D95] px-4 py-1 font-semibold text-white hover:opacity-90 md:px-8 md:py-2"
        >
          {mutationStatus === "pending" ? "Loading" : "Sign up"}
        </button>
      </div>
    </div>
  );
};
export default FormFieldButtons;
