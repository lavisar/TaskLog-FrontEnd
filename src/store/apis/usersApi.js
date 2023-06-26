import { authApi } from "./features/authApi";
import { dataURItoBlob } from "./features/decodeBase64";

export const usersApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (details) => {
        const formData = new FormData();

        // add image
        const type = details.image.split(",")[0].split(":")[1].split(";")[0];
        const imageBlob = dataURItoBlob(details.image, type);

        const imageFile = new File([imageBlob], details.imageName, {
          type: type,
        });
        formData.append("image", imageFile);

        const userJson = JSON.stringify(details.user);
        const userBlob = new Blob([userJson], { type: "application/json" });
        formData.append("user", userBlob);

        console.log(formData);
        return {
          method: "POST",
          url: "/auth/signup",
          body: formData,
        };
      },
    }),
    getUsers: builder.query({
      query: () => "/auth/all-users",
      // keepUnusedDataFor: 10,
    }),
  }),
});

export const { useSignUpMutation, useGetUsersQuery } = usersApi;
