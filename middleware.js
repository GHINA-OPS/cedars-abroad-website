export const config = {
  matcher: ["/hr-certificate/:path*", "/certificate/:path*", "/ai-fundamentals-certificate/:path*"],
};

function isAuthorized(request, credentials) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) return false;

  const decoded = atob(authHeader.slice(6));
  const separatorIndex = decoded.indexOf(":");
  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);

  return credentials.some(([u, p]) => u && p && u === user && p === pass);
}

function unauthorized(realm) {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${realm}"`,
    },
  });
}

const HR_CREDENTIALS = [
  [process.env.PILOT_USER_1, process.env.PILOT_PASS_1],
  [process.env.PILOT_USER_2, process.env.PILOT_PASS_2],
  [process.env.PILOT_USER_3, process.env.PILOT_PASS_3],
  [process.env.PILOT_USER_4, process.env.PILOT_PASS_4],
  [process.env.PILOT_USER_5, process.env.PILOT_PASS_5],
  [process.env.ADMIN_USER, process.env.ADMIN_PASS],
];

const BSC_CREDENTIALS = [
  [process.env.BSC_PILOT_USER_1, process.env.BSC_PILOT_PASS_1],
  [process.env.BSC_PILOT_USER_2, process.env.BSC_PILOT_PASS_2],
  [process.env.BSC_PILOT_USER_3, process.env.BSC_PILOT_PASS_3],
  [process.env.BSC_PILOT_USER_4, process.env.BSC_PILOT_PASS_4],
  [process.env.BSC_PILOT_USER_5, process.env.BSC_PILOT_PASS_5],
  [process.env.BSC_ADMIN_USER, process.env.BSC_ADMIN_PASS],
];

const AICERT_CREDENTIALS = [
  [process.env.AICERT_PILOT_USER_1, process.env.AICERT_PILOT_PASS_1],
  [process.env.AICERT_PILOT_USER_2, process.env.AICERT_PILOT_PASS_2],
  [process.env.AICERT_PILOT_USER_3, process.env.AICERT_PILOT_PASS_3],
  [process.env.AICERT_PILOT_USER_4, process.env.AICERT_PILOT_PASS_4],
  [process.env.AICERT_PILOT_USER_5, process.env.AICERT_PILOT_PASS_5],
  [process.env.AICERT_ADMIN_USER, process.env.AICERT_ADMIN_PASS],
];

export default function middleware(request) {
  const path = new URL(request.url).pathname;

  if (path.startsWith("/hr-certificate")) {
    if (isAuthorized(request, HR_CREDENTIALS)) return;
    return unauthorized("Cedars Abroad HR Pilot");
  }

  if (path.startsWith("/certificate")) {
    if (isAuthorized(request, BSC_CREDENTIALS)) return;
    return unauthorized("Cedars Abroad AI Balanced Scorecard Pilot");
  }

  if (path.startsWith("/ai-fundamentals-certificate")) {
    if (isAuthorized(request, AICERT_CREDENTIALS)) return;
    return unauthorized("Cedars Abroad Introduction to AI Pilot");
  }
}
