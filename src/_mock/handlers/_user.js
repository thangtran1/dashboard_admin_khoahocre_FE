import { faker } from "@faker-js/faker";
import { http, HttpResponse, delay } from "msw";

import { UserApi } from "@/api/services/userService";

import { USER_LIST } from "../assets";

const signIn = http.post(`/api${UserApi.Login}`, async ({ request }) => {
  const { email, password } = await request.json();

  if (!user || user.password !== password) {
    return HttpResponse.json({
      status: 10001,
      message: "Incorrect username or password.",
    });
  }

  return HttpResponse.json({
    status: 0,
    message: "",
    data: {
      user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
});

const userList = http.get("/api/user", async () => {
  await delay(1000);
  return HttpResponse.json(
    Array.from({ length: 10 }).map(() => ({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
      address: faker.location.streetAddress(),
    })),
    {
      status: 200,
    }
  );
});

export default [signIn, userList];
