import { error } from 'react-notification-system-redux';
import { Notification } from 'react-notification-system';
import { AxiosError } from 'axios';
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
    dispatch(error(unsuccessfulOptions));
}
export default handleError;
