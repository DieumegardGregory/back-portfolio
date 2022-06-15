const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");
const credentials = require('.././loginInfo');

const newSoftskill = {
  name_softskill: "patience"
}

const updatedSoftskill = {
  name_softskill: "travail en équipe"
}

describe("app", () => {
  beforeAll(()=> {
    let sql = "TRUNCATE TABLE softskills";
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
it("GETs /api/softskills and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/softskills/").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("POSTs /api/softskills and should obtain 201 ", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/softskills/").set("Cookie",`${Cookies}`).send(newSoftskill).expect(201);
    expect(res.body.name_softskill).toEqual("patience");
  });
  it("GETs /api/softskills and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/softskills/").expect(200);
    expect(res.body.length).toEqual(1);
  });
  it("PUTs /api/softskills/1 and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).put("/api/softskills/1").send(updatedSoftskill).expect(200);
    expect(res.body.name_softskill).toEqual("travail en équipe");
  });
  it("DELETEs /api/softskills/1 and should obtain 204 ", async () => {
    expect.assertions(1);
    const res = await request(app).delete("/api/softskills/1").expect(204);
    expect(res.status).toEqual(204);
  });
});

