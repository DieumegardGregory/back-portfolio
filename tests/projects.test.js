const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");

const newProject = {
    name_project: "Hackacook",
    description_project: "Répertoire de cuisine personnel"
}

const updatedProject = {
    description_project: "Checkpoint 4"
}

describe("app", () => {
    beforeAll(()=> {
      let sql = "TRUNCATE TABLE projects";
      query(sql);
    })
  it("GETs /api/projects and should obtain []", async () => {
      expect.assertions(1);
      const res = await request(app).get("/api/formations/").expect(200);
      expect(res.body.length).toEqual(0);
    });
    it("POSTs /api/projects and should obtain 201 ", async () => {
      expect.assertions(1);
      const res = await request(app).post("/api/projects/").send(newProject).expect(201);
      expect(res.body.name_project).toEqual("Hackacook");
    });
    it("GETs /api/projects and should obtain 200 ", async () => {
      expect.assertions(1);
      const res = await request(app).get("/api/projects/").expect(200);
      expect(res.body.length).toEqual(1);
    });
    it("PUTs /api/projects/1 and should obtain 200 ", async () => {
      expect.assertions(1);
      const res = await request(app).put("/api/projects/1").send(updatedProject).expect(200);
      expect(res.body.description_project).toEqual("Checkpoint 4");
    });
    it("DELETEs /api/projects/1 and should obtain 204 ", async () => {
      expect.assertions(1);
      const res = await request(app).delete("/api/projects/1").expect(204);
      expect(res.status).toEqual(204);
    });
  });