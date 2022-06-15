const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");
const credentials = require('.././loginInfo');


const newExp = {
  name_experience: "vendeur",
  place_experience: "Nanteuil-lès-Meaux",
  starting_year: "2003",
  ending_year: "2007"
}

const updatedExp = {
    name_experience: "cariste"
}

describe("app", () => {
  beforeAll( async ()=> {
    let sql = "SET FOREIGN_KEY_CHECKS=0";
    query(sql);
     sql = "TRUNCATE TABLE experiences";
    query(sql);
     sql = "SET FOREIGN_KEY_CHECKS=1";
    query(sql);
    const resp = await request(app).post("/api/users").send(credentials);
    console.log(resp.body);
  })
  let Cookies;
  it("Should login to create a cookie", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/auth/login").send(credentials).expect(200);
    expect(res.body.id).toEqual(1);
    // Save the cookie to use it later to retrieve the session
    Cookies = res.headers['set-cookie'].pop().split(';')[0];
  });
  it("GETs /api/experiences and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/experiences/").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("POSTs /api/experiences and should obtain 201 ", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/experiences/").set("Cookie",`${Cookies}`).send(newExp).expect(201);
    console.log(res.body)
    expect(res.body.name_experience).toEqual("vendeur");
  });
  it("GETs /api/experiences and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/experiences/").expect(200);
    expect(res.body.length).toEqual(1);
  });
  it("GETs /api/experiences and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/experiences?join=tasks").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("PUTs /api/experiences/1 and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).put("/api/experiences/1").send(updatedExp).expect(200);
    expect(res.body.name_experience).toEqual("cariste");
  });
  it("DELETEs /api/experiences/1 and should obtain 204 ", async () => {
    expect.assertions(1);
    const res = await request(app).delete("/api/experiences/1").expect(204);
    expect(res.status).toEqual(204);
  });
});