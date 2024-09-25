import axios from "axios";
import { toastMsg } from "./ToastHelper";

async function getLocation(){
    const apiKey = '8896a254c9b4438d8632ccb69b7c5a6b'; // Thay bằng API Key của bạn
    async function getLocalPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position => {
                const latitudeItem = position.coords.latitude;
                const longtitudeItem = position.coords.longitude;
                resolve ({latitudeItem, longtitudeItem})
            }),
            (error)=>{
                reject(error);
            }
        )
        })
    }
    
    async function formatAPILocationData(data:any) {
        // Gọi API OpenCage để lấy vị trí địa lý
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                key: apiKey,
                q: `${data.latitudeItem},${data.longtitudeItem}`, //Toạ độ lấy từ người dùng (sau khi cho quyền)
                pretty: 1,
                no_annotations: 1,  // Loại bỏ các chú thích không cần thiết
                language: 'vi'  // Chỉ định ngôn ngữ là tiếng Việt
            }
        });
        if (response.status === 200) {
            const apiData: any = response.data.results[0].components;
            return apiData;
        } else {
            toastMsg.error('Đã có lỗi xảy ra khi định vị vị trí của bạn!', '');
        }
    }
    
    if (navigator.geolocation) {
        try {
            const localPosition = await getLocalPosition();
            const apiPosition = await formatAPILocationData(localPosition);
            return apiPosition;
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        toastMsg.error('Trình duyệt không hỗ trợ định vị vị trí!', '');
    }
}
export default getLocation;