import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "antd";
import { toastMsg } from "../../../utilities/helpers/ToastHelper";

const Footer = ()=>{
    useEffect(() => {
      // Khởi tạo AOS khi component mount
      AOS.init({
        duration: 1000, // Thời gian hiệu ứng
        once: false,     // Chỉ thực hiện hiệu ứng một lần
      });
    }, []); // Chỉ chạy khi component mount
    return(<>
    </>)
}
export default Footer;