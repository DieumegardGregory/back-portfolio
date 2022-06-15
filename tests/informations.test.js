const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");

const newInfo = {
  profile: "Je suis en reconversion",
  looking_for: "je cherche une alternance"
}

const updatedInfo = {
  profile: "j'ai mon alternance"
}

describe("app", () => {
  beforeAll(()=> {
    let sql = "TRUNCATE TABLE informations";
    query(sql);
  })
it("GETs /api/informations and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/informations/").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("POSTs /api/informations and should obtain 201 ", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/informations/").send(newInfo).expect(201);
    expect(res.body.profile).toEqual("Je suis en reconversion");
  });
  it("GETs /api/informations and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/informations/").expect(200);
    expect(res.body.length).toEqual(1);
  });
  it("PUTs /api/informations/1 and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).put("/api/informations/1").send(updatedInfo).expect(200);
    expect(res.body.profile).toEqual("j'ai mon alternance");
  });
  it("DELETEs /api/informations/1 and should obtain 204 ", async () => {
    expect.assertions(1);
    const res = await request(app).delete("/api/informations/1").expect(204);
    expect(res.status).toEqual(204);
  });
});

