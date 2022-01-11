import { CSSProperties, ReactNode } from 'react';

interface ModalContentAndStyle {
	modalContent: ReactNode;
	modalStyles?: CSSProperties;
	haveCloseIcon?: boolean;
}

export const closeModal = () => ({ type: 'CLOSE_MODAL' });

export const openModalAndSetContent = ({
	modalContent,
	modalStyles,
	haveCloseIcon,
}: ModalContentAndStyle) => {
	return {
		type: 'OPEN_AND_SET_MODAL_CONTENT',
		modalContent,
		modalStyles,
		haveCloseIcon,
	};
};
