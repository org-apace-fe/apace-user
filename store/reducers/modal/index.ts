import { CSSProperties, ReactNode } from 'react';

interface ModalActionInterface {
	type: string;
	modalContent: ReactNode;
	modalStyles: CSSProperties;
	haveCloseIcon?: boolean;
}

interface ModalInterface {
	modalOpened: boolean;
	modalContent: ReactNode;
	modalStyles: CSSProperties;
	haveCloseIcon?: boolean;
}

const initialModalState: ModalInterface = {
	modalContent: '',
	modalStyles: {
		fontWeight: 800,
		color: 'white',
	},
	modalOpened: false,
};

const modalReducer = (
	state = initialModalState,
	action: ModalActionInterface
) => {
	switch (action.type) {
		case 'CLOSE_MODAL': {
			return { ...state, modalOpened: false };
		}
		case 'OPEN_AND_SET_MODAL_CONTENT': {
			return {
				...state,
				modalOpened: true,
				modalContent: action.modalContent,
				modalStyles: { ...state.modalStyles, ...action.modalStyles },
				...(action.haveCloseIcon === undefined && { haveCloseIcon: true }),
				...(action.haveCloseIcon === false && { haveCloseIcon: false }),
				...(action.haveCloseIcon === true && { haveCloseIcon: true }),
			};
		}
		default: {
			return state;
		}
	}
};

export default modalReducer;
