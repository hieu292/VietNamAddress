import { toast } from 'react-toastify';
import ActionTypes from './constants';


export const exportCSV = (data) => ({
  type: ActionTypes.EXPORT_CSV,
  payload: { data },
});

export const exportCSVSuccess = (link) => {
  toast.success('Export CSV Successfully');
  return {
    type: ActionTypes.EXPORT_CSV_SUCCESS,
    payload: { link },
  };
};

export const exportCSVError = (error) => {
  toast.error('Error When Export CSV');
  return {
    type: ActionTypes.EXPORT_CSV_ERROR,
    payload: { error },
  };
};
