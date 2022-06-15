const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");
const credentials = require('.././loginInfo');

const newHardskill = {
  name_hardskill: "langages connus"
}

const updatedHardskill = {
  name_hardskill: "node.js"
}

describe("app", () => {
  beforeAll(()=> {
    let sql = "SET FOREIGN_KEY_CHECKS=0";
    query(sql);
     sql = "TRUNCATE TABLE hardskills";
    query(sql);
     sql = "SET FOREIGN_KEY_CHECKS=1";
    query(sql);
  })
  let Cookies;
  it("Should login to create a cookie", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/auth/login").send(credentials).expect(200);
    expect(res.body.id).toEqual(1);
    // Save the cookie to use it later to retrieve the session
    Cookies = res.headers['set-cookie'].pop().split(';')[0];
  });
it("GETs /api/hardskills and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/hardskills/").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("POSTs /api/hardskills and should obtain 201 ", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/hardskills/").set("Cookie",`${Cookies}`).send(newHardskill).expect(201);
    expect(res.body.name_hardskill).toEqual("langages connus");
  });
  it("GETs /api/hardskills and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/hardskills/").expect(200);
    expect(res.body.length).toEqual(1);
  });
  it("GETs /api/hardskills and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/hardskills?join=subskills").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("PUTs /api/hardskills/1 and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).put("/api/hardskills/1").send(updatedHardskill).expect(200);
    expect(res.body.name_hardskill).toEqual("node.js");
  });
  it("DELETEs /api/hardskills/1 and should obtain 204 ", async () => {
    expect.assertions(1);
    const res = await request(app).delete("/api/hardskills/1").expect(204);
    expect(res.status).toEqual(204);
  });
});