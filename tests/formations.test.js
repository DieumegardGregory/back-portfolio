const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");
const credentials = require('.././loginInfo');

const newFormation = {
  name_formation: "Développeur Web et Web mobile",
  place_formation: "La Loupe",
  year_formation: "2021",
  school: "Wild Code School"
};

const updatedFormation = {
  name_formation: "Data Analyst",
  year_formation: "2023"
}

describe("app", () => {
  beforeAll(()=> {
    let sql = "TRUNCATE TABLE formations";
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
it("GETs /api/formations and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/formations/").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("POSTs /api/formations and should obtain 201 ", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/formations/").set("Cookie",`${Cookies}`).send(newFormation).expect(201);
    expect(res.body.place_formation).toEqual("La Loupe");
  });
  it("GETs /api/formations and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/formations/").expect(200);
    expect(res.body.length).toEqual(1);
  });
  it("PUTs /api/formations/1 and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).put("/api/formations/1").send(updatedFormation).expect(200);
    expect(res.body.name_formation).toEqual("Data Analyst");
  });
  it("DELETEs /api/formations/1 and should obtain 204 ", async () => {
    expect.assertions(1);
    const res = await request(app).delete("/api/formations/1").expect(204);
    expect(res.status).toEqual(204);
  });
});