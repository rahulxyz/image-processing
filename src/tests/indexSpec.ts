import supertest from "supertest";
import app from "../index";

describe("Express App", () => {
  it("should respond to /api/image with 400 if missing query params", async () => {
    const response = await supertest(app).get("/api/image");
    expect(response.status).toBe(400);
    expect(response.body.error).toContain("Missing required query parameters");
  });

  it("should respond to /api/image with 400 if width is not a number", async () => {
    const response = await supertest(app).get(
      "/api/image?filename=fjord&width=abc&height=100"
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toContain("width must be a valid number");
  });

  it("should respond to /api/image with 400 if height is not a number", async () => {
    const response = await supertest(app).get(
      "/api/image?filename=fjord&width=100&height=abc"
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toContain("height must be a valid number");
  });
});
