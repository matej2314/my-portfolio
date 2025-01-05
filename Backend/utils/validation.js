function isValidPassword(password) {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*!#^%$@?])[a-zA-Z\d*!#^%$@?]{10,30}$/;
	return regex.test(password);
};

function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

function isValidUsername(username) {
	const regex = /^[a-zA-Z0-9]{5,}$/;
	return regex.test(username);
};

module.exports = { isValidPassword, isValidEmail, isValidUsername };