import { Button } from "antd"
import { observer } from "mobx-react"

const About = ()=>{
    return(<>
    <div className="about-page container mx-auto">
        <div className="title"></div>
        <div className="content flex gap-5">
            <img className="max-w-lg max-h-fit" src="/assets/img/photos/hurry.gif" alt="" />
            <div className="description flex flex-col justify-center">
                <span className="text-center">Đây là dự án cá nhân của đội ngũ chúng tôi (cụ thể là <span className="italic font-bold">1 người</span>). Chúng tôi mang đến cho bạn những món ăn tuy không phải là đặc biệt nhưng là đặc sắc. Hãy đến với <span className="text-signature text-xl font-bold">Nhoằm Nhoằm</span> để cùng chìm đắm vào những hương vị khó cưỡng của nền ẩm thực nước nhà.</span>
                <div className="flex justify-center align-middle pt-2"><Button target="_blank" href="https://nmhung-portfolio.vercel.app/" danger>Tìm hiểu thêm về tác giả</Button></div>
            </div>
        </div>
    </div>
    </>)
}
export default observer(About)