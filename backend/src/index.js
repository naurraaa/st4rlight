export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // GET /rooms
    if (request.method === "GET" && pathname === "/rooms") {
      const { results } = await env.DB.prepare("SELECT * FROM rooms").all();
      return Response.json(results);
    }

    // POST /rooms
    if (request.method === "POST" && pathname === "/rooms") {
      const body = await request.json();
      const { name, capacity, status } = body;

      if (!name || !capacity || !status) {
        return new Response("Data tidak lengkap", { status: 400 });
      }

      await env.DB.prepare(
        "INSERT INTO rooms (name, capacity, status) VALUES (?, ?, ?)"
      )
        .bind(name, capacity, status)
        .run();

      return new Response("Room added", { status: 201 });
    }

    // DELETE /rooms/:id
    const matchDelete = pathname.match(/^\/rooms\/(\d+)$/);
    if (request.method === "DELETE" && matchDelete) {
      const id = parseInt(matchDelete[1]);
      await env.DB.prepare("DELETE FROM rooms WHERE id = ?").bind(id).run();
      return new Response("Room deleted", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  },
};
