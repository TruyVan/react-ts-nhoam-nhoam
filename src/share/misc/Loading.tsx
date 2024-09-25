import { ClockLoader } from "react-spinners";
interface LoadingProps{
    size?: number,
    color?: string,
    isLoading?: boolean
}
const Loading= ({size, color, isLoading}: LoadingProps)=>{
    return(<>
        <div className="w-full flex flex-col justify-center align-middle">
            <div className="flex justify-center align-middle">
                <ClockLoader size={size} color={color} loading={isLoading}/>
            </div>
            <div className="flex justify-center align-middle pt-3">
                <div><span className="text-signature pr-2 text-2xl">Nhoằm nhoằm</span><span>đang tải dữ liệu, bạn chờ chút nhé</span></div>
            </div>
        </div>
    </>)
}
export default Loading;