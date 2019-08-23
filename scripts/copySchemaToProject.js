import fs from 'fs-extra-promise'; // eslint-disable-line import/no-extraneous-dependencies

const copySchemaToProject = async () => {
	try {
		await fs.copy('./data', '../api/data');

		console.info('Schema successfully copied to api');
	} catch (error) {
		console.error('There was an error while trying to copy schema to api', error);
	}
};

copySchemaToProject();
