const jwtCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
};

module.exports = jwtCookieOptions;