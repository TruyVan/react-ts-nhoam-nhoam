import {toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Toast{
    public error(msg: string, id: any|null){
        toast.error(msg, {
            toastId: `${id}`,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }
    public success(msg: string, id: any|null){
        toast.success(msg, {
            toastId: `${id}`,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }
    public info(msg: string, id: any|null){
        toast.info(msg, {
            toastId: `${id}`,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }
    public warn(msg: string, id: any|null){
        toast.warn(msg, {
            toastId: `${id}`,
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }
}
export const toastMsg = new Toast()