module.exports = {
    getAllProjects: 'SELECT * FROM projects ORDER BY id',
    addNewProject: 'INSERT INTO projects (id, project_name, goal, project_category, project_URL, project_screenName, project_description, repo, technologies, long_text, difficulty, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    deleteProject: 'DELETE FROM projects WHERE id=? AND project_name=?',
    updateProject: `
		UPDATE projects 
		SET 
			project_name = ?, 
			project_category = ?, 
			project_URL = ?, 
			project_screenName = ?, 
			goal = ?, 
			project_description = ?, 
			repo = ?, 
			technologies = ?, 
			long_text = ?, 
			difficulty = ?, 
			end_date = ? 
		WHERE id = ?
	  `,
};