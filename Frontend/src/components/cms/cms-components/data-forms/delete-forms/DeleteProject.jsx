import { useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../../../store/auth-context';
import useSendRequest from '../../../../../hooks/useSendRequest';
import { requestUrl } from '../../../../../url';
import { deleteForms } from '../data-forms-classes';
import { handleToastAndClose } from '../../../../../utils/handleToastAndClose';

const deleteProjectUrl = requestUrl.projects.delete;

export default function DeleteProject({ selectedProject, onClose }) {
	const { sendRequest, result, error } = useSendRequest();
	const { user } = useContext(AuthContext);

	const handleDeleteProject = async () => {
		const projectId = selectedProject.id;
		const projectName = selectedProject.title;

		if (user.role !== 'admin') {
			toast.info('Sorry! You are not an admin!');
			return;
		}

		try {
			await sendRequest({
				url: `${deleteProjectUrl}/${projectId}`,
				method: 'DELETE',
				data: {
					projectId: projectId,
					projectName: projectName,
				},
			});
		} catch (error) {
			console.log('Nie udało się usunąć projektu');
		}
	};

	useEffect(() => {
		const cleanupFn = handleToastAndClose(error, result, onClose, toast);

		return cleanupFn;
	}, [result, error, onClose]);

	return (
		<div className={deleteForms.wrapper.wrapper}>
			<h2 className={deleteForms.h2.h2}>Czy na pewno chcesz usunąć projekt:</h2>
			{selectedProject.title && <p>{selectedProject.title} ?</p>}
			{selectedProject.id && <p>id: {selectedProject.id}</p>}

			{error && <p className={deleteForms.messages.error}>{error}</p>}
			<div className={deleteForms.buttonWrapper.buttonWrapper}>
				<button className={deleteForms.buttonsConfirm.buttonConf} onClick={handleDeleteProject}>
					Tak
				</button>
				<button className={deleteForms.buttonsConfirm.buttonConf} onClick={onClose}>
					Nie
				</button>
			</div>
		</div>
	);
}
