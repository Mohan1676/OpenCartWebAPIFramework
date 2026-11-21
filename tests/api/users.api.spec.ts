// gorest_qT5mp0B4GIxu7kHCB3fWmprr4N0kaYNZB6sWalhXOPt17HBtD

import { test, expect } from "@playwright/test";

let AUTH_TOKEN = {
  Authorization:
    "Bearer gorest_qT5mp0B4GIxu7kHCB3fWmprr4N0kaYNZB6sWalhXOPt17HBtD",
};

test.skip("get call", async ({ request }) => {
  let response = await request.get("https://gorest.co.in/public/v2/users", {
    headers: AUTH_TOKEN,
  });
  // console.log(response) ;
  let jsonBody = await response.json();
  console.log(jsonBody);

  let statusCode = response.status();
  console.log(`The status code for the api is ${statusCode}`);
  expect(statusCode).toBe(200);
});

test("post call", async ({ request }) => {
  const userData = {
    name: "Automation",
    email: `automation_${Date.now()}@open.com`,
    gender: "male",
    status: "active",
  };

  const response = await request.post("https://gorest.co.in/public/v2/users", {
    headers: AUTH_TOKEN,
    data: userData,
  });

  const jsonBody = await response.json();

  console.log(jsonBody);

  const statusCode = response.status();

  console.log(`The status code for the API is ${statusCode}`);

  expect(statusCode).toBe(201);
});

test("Put call", async ({ request }) => {
  const firstNames = ["John", "David", "Rahul", "Santhosh", "Michael"];

  const randomName = firstNames[Math.floor(Math.random() * firstNames.length)];

  const body = {
    id: 8717176,
    name: randomName,
    email: "automation_1795070355880@open.com",
    gender: "male",
    status: "Inactive",
  };

  const response = await request.put(
    "https://gorest.co.in/public/v2/users/8717176",
    {
      headers: AUTH_TOKEN,
      data: body,
    },
  );

  console.log(response.json);
  console.log(response.status());
  expect(response).toBe(200);
});

test("Delete call", async ({ request }) => {
  const response = await request.delete(
    "https://gorest.co.in/public/v2/users/8717176",
    {
      headers: AUTH_TOKEN,
    },
  );

  console.log(response.json);
  console.log(response.status());
});
