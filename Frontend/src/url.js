const serverUrl = 'http://185.170.196.107:5051';
// const serverUrl = 'http://127.0.0.1:5051'

export const dataCollectionUrl = `${serverUrl}/data/collection`;
export const registerUrl = `${serverUrl}/auth/register`;
export const loginUrl = `${serverUrl}/auth/login`;
export const logOutUrl = `${serverUrl}/auth/logout`;
export const verifyURL = `${serverUrl}/auth/verify`;
export const imgUrl = `${serverUrl}/images`;
export const blogImgs = `${serverUrl}/blog-photos`;
export const cvURL = `${serverUrl}/download`;
export const mailUrl = `${serverUrl}/email`;
export const galleryUrl = `${serverUrl}/gallery`;
export const socialURLS = {
	facebook: 'https://www.facebook.com/mateusz.sliwowski.9',
	github: 'https://github.com/matej2314',
	linkedIn: 'https://www.linkedin.com/in/mateusz-%C5%9Bliwowski-499a04105/',
};

export const requestUrl = {
	courses: {
		new: `${serverUrl}/courses/new`,
		delete: `${serverUrl}/courses/delete`,
	},
	posts: {
		new: `${serverUrl}/posts/new`,
		put: `${serverUrl}/posts/edit`,
		delete: `${serverUrl}/posts/delete`,
	},
	projects: {
		new: `${serverUrl}/projects/new`,
		delete: `${serverUrl}/projects/delete`,
		put: `${serverUrl}/projects/update`,
	},
	services: {
		new: `${serverUrl}/services/new`,
		delete: `${serverUrl}/services`,
		put: `${serverUrl}/services/edit`,
	},
	skills: {
		new: `${serverUrl}/skills/new`,
		delete: `${serverUrl}/skills/delete`,
	},
	about: {
		new: `${serverUrl}/about/new`,
		edit: `${serverUrl}/about/update`,
		delete: `${serverUrl}/about/delete`,
	},
	interests: {
		new: `${serverUrl}/interests/new`,
		delete: `${serverUrl}/interests/delete`,
	},
};
