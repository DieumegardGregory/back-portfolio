const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");

const newSubskill = {
  name_subskill: "javascript",
  hardskill_id: 2
}

const updatedSubskill = {
  name_subskill: "python"
}

describe("app", () => {
  beforeAll(()=> {
    let sql = "TRUNCATE TABLE subskills";
    query(sql);
    sql = "INSERT INTO hardskills (name_hardskill) VALUE ('langages connus')";
    query(sql);
  })
it("GETs /api/subskills and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/subskills/").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("POSTs /api/subskills and should obtain 201 ", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/subskills/").send(newSubskill).expect(201);
    expect(res.body.name_subskill).toEqual("javascript");
  });
  it("GETs /api/subskills and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/subskills/").expect(200);
    expect(res.body.length).toEqual(1);
  });
  it("PUTs /api/subskills/1 and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).put("/api/subskills/1").send(updatedSubskill).expect(200);
    expect(res.body.name_subskill).toEqual("python");
  });
  it("DELETEs /api/subskills/1 and should obtain 204 ", async () => {
    expect.assertions(1);
    const res = await request(app).delete("/api/subskills/1").expect(204);
    expect(res.status).toEqual(204);
  });
});

