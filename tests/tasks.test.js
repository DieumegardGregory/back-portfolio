const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");

const newTask = {
  name_task: "mise en rayon",
  experience_id: 2
}

const updatedTask = {
  name_task: "livraisons"
}

describe("app", () => {
  beforeAll(()=> {
    let sql = "TRUNCATE TABLE tasks";
    query(sql);
    sql = "INSERT INTO experiences (name_experience, place_experience, starting_year, ending_year) VALUES ('vendeur', 'Meaux', '2004', '2007')";
    query(sql);
  })
it("GETs /api/tasks and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/tasks/").expect(200);
    expect(res.body.length).toEqual(0);
  });
  it("POSTs /api/tasks and should obtain 201 ", async () => {
    expect.assertions(1);
    const res = await request(app).post("/api/tasks/").send(newTask).expect(201);
    expect(res.body.name_task).toEqual("mise en rayon");
  });
  it("GETs /api/tasks and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/tasks/").expect(200);
    expect(res.body.length).toEqual(1);
  });
  it("PUTs /api/tasks/1 and should obtain 200 ", async () => {
    expect.assertions(1);
    const res = await request(app).put("/api/tasks/1").send(updatedTask).expect(200);
    expect(res.body.name_task).toEqual("livraisons");
  });
  it("DELETEs /api/tasks/1 and should obtain 204 ", async () => {
    expect.assertions(1);
    const res = await request(app).delete("/api/tasks/1").expect(204);
    expect(res.status).toEqual(204);
  });
});

