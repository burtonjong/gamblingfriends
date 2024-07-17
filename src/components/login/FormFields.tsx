import { generateClient } from "aws-amplify/api";
import type { AuthUser } from "aws-amplify/auth";
import { uploadData } from "aws-amplify/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Schema } from "@/../amplify/data/resource";
import { Input, Label } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import FormFieldButtons from "./FormFieldButtons";

const client = generateClient<Schema>();

type FileAndUser = Schema["User"]["type"] & { image: File };
export default function PersonalFormFields({ user }: { user: AuthUser }) {
  const router = useRouter();
  const { isPending, isError, data } = useQuery({
    queryKey: ["user", user?.userId],
    queryFn: async () => {
      return (await client.models.User.get({ id: user.userId as string })).data;
    },
  });

  const userMutation = useMutation({
    mutationFn: async (input: FileAndUser) => {
      try {
        await uploadData({
          path: `picture-submissions/${input.image.name}`,
          data: input.image,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image, ...userDataWithoutFile } = input;

        await client.models.User.update({
          completedRegistration: true,
          ...userDataWithoutFile,
        });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user or upload file");
      }
    },
    onSuccess: () => {
      // TODO: ADD TOAST
      router.push("/home");
    },
  });
  const [formState, setFormState] = useState<FileAndUser>({
    id: user?.userId,
  } as FileAndUser);
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userMutation.mutate(formState);
  };
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, type, value, files } = e.target;

    if (type === "file" && files) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setFormState((prevState) => ({ ...prevState, [name]: file }));
      } else {
        setFormState((prevState) => ({ ...prevState, [name]: null }));
        alert("The file is not an image.");
      }
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  if (isPending) {
    return (
      // These are mandatory divs for the loading spinner
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  if (isError) {
    return <div>Error, please try again later.</div>;
  }
  if (data?.completedRegistration) {
    router.push("/home");
    return null;
  }
  return (
    <form
      onSubmit={submitForm}
      className="relative flex w-full flex-col justify-center gap-4 rounded-3xl bg-white p-4 md:p-8"
    >
      <div className="flex flex-col justify-between gap-2 md:gap-6">
        <h1>Finish your registration</h1>
        <div className="flex flex-row gap-2 md:gap-12">
          {" "}
          <div className="flex w-1/2 flex-col gap-2">
            <Label htmlFor="firstName">* First Name:</Label>
            <Input
              required
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formState?.firstName ?? ""}
              onChange={(e) => updateForm(e)}
            />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <Label htmlFor="lastName">* Last Name:</Label>
            <Input
              required
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formState?.lastName ?? ""}
              onChange={(e) => updateForm(e)}
            />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <label>
              Profile Picture
              <input
                type="file"
                name="image"
                required
                accept="image/*"
                onChange={(e) => updateForm(e)}
              />
            </label>
          </div>
        </div>
      </div>
      <FormFieldButtons mutationStatus={userMutation.status} />
    </form>
  );
}
