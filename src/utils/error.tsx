import { error } from 'react-notification-system-redux';
import { Notification } from 'react-notification-system';
import { AxiosError } from 'axios';
import { toast, ToastPosition } from 'react-toastify';
const handleError = (err: any, dispatch: any, title = '') => {
    let unsuccessfulOptions: Notification = {
        title: title,
        message: err.message,
        level: 'error',
        position: 'tr',
        autoDismiss: 0,
    };
    if (err instanceof AxiosError && err.response) {
        if (err.response.status === 404) {
            unsuccessfulOptions.message = err.response.data.message;
            unsuccessfulOptions.title = 'Not Found';
        } else {
            unsuccessfulOptions.message = "Your request was unsuccessful. Please try again.";
        }
    }
    // dispatch(error(unsuccessfulOptions));
    toast.error(unsuccessfulOptions.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
    });
}
export default handleError;
