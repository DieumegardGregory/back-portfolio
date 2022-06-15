const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");

const newUser = {
  email: "dieume.greg@gmail.com",
  password: "123456"
}

const updatedUser = {
  email: "die.gre@gmail.com"
}

describe("app", () => {
  beforeAll(()=> {
    let sql = "TRUNCATE TABLE users";
    query(sql);
  })
it("GETs /api/users and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/users/").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("POSTs /api/users and should obtain 201 ", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/users/").send(newUser).expect(201);
    expect(res.body.email).toEqual("dieumegard.gregory@gmail.com");
  });
  it("GETs /api/users and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/users/").expect(200);
    expect(res.body.length).toEqual(1);
  });
  it("PUTs /api/users/1 and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).put("/api/users/1").send(updatedUser).expect(200);
    expect(res.body.email).toEqual("die.gre@gmail.com");
  });
  it("DELETEs /api/users/1 and should obtain 204 ", async () => {
    expect.assertions(1);
    const res = await request(app).delete("/api/users/1").expect(204);
    expect(res.status).toEqual(204);
  });
});

