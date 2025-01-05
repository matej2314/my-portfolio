const jwtCookieOptions = {
	httpOnly: true,
    secure: false,
    sameSite: "lax",
};

module.exports = jwtCookieOptions;