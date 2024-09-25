const NoContent=()=>{
    return(<>
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex justify-center aitems-center">
                <img style={{width: '100px', height:'100px'}} src="/assets/img/photos/Search-none.svg" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center pt-3">
                <span className="text-signature pr-2 text-2xl text-center">Nhoằm nhoằm</span>
                <span>không tìm thấy thông tin bạn yêu cầu</span>
            </div>
        </div>
    </>)
}
export default NoContent;