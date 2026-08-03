export const config = {
  matcher: ["/hr-certificate/:path*"],
};

export default function middleware(request) {
  const authHeader = request.headers.get("authorization");

  const credentials = [
    [process.env.PILOT_USER_1, process.env.PILOT_PASS_1],
    [process.env.PILOT_USER_2, process.env.PILOT_PASS_2],
    [process.env.PILOT_USER_3, process.env.PILOT_PASS_3],
    [process.env.PILOT_USER_4, process.env.PILOT_PASS_4],
    [process.env.PILOT_USER_5, process.env.PILOT_PASS_5],
    [process.env.ADMIN_USER, process.env.ADMIN_PASS],
  ];

  if (authHeader && authHeader.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);

    const isValid = credentials.some(
      ([u, p]) => u && p && u === user && p === pass
    );
    if (isValid) {
      return;
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Cedars Abroad HR Pilot"',
    },
  });
}
