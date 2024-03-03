'use client'
import Collapse, { CollapseProps } from "antd/es/collapse/Collapse";
import { useEffect, useRef, useState } from "react";
import PlaySquareOutlined  from '@ant-design/icons/PlaySquareOutlined';
interface IProps {
    videos : IVideo[] | null,
    activeKey: string[],
    setAcctiveKey:(v:  string[]) => void
}
const CollapseDetail=(props: IProps)=>{
    const { videos,activeKey, setAcctiveKey } = props
    const [items,setItems] = useState<CollapseProps['items'] | undefined>([])
    const convertTimeToMinutes = (time: string): number => {
        const [minutes, seconds] = time.split(':');
        const totalMinutes = parseInt(minutes, 10);
        return totalMinutes;
    }
    const handleTitleVideos = () => {
       const myArray :(CollapseProps['items'] | undefined) = []
       videos?.map((video,index) => {
          let countH = 0
          let countP = 0
          const myElement : React.ReactNode = video?.descriptionVideoDtos?.map((item,index)=>{
            countP = countP + 1
            countH = countH + convertTimeToMinutes(item.timeVideo)
            return(
              <div style={{display:'flex',justifyContent:'space-between',marginTop:index>0?'20px':0}} key={index}>
                  <div style={{display:'flex',gap:'10px'}}>
                     <PlaySquareOutlined />
                     <div>{item.titleVideo}</div>
                  </div>
                  <div>{item.timeVideo}</div>
              </div>
            )
          })
          const item :  any= {
              key: index,
              label:  countH < 60 ? <div style={{display:'flex',justifyContent:'space-between'}} >
                                        <div style={{fontSize:17,fontWeight:'bold'}}>{video.title}</div>
                                        <div>{countP} bài giảng _ {countH} phút</div>
                                    </div>
                                  :
                                    <div style={{display:'flex',justifyContent:'space-between'}} >
                                        <div style={{fontSize:17,fontWeight:'bold'}}>{video.title}</div>
                                        <div>{countP} bài giảng _ {parseInt((countH / 60).toString())} giờ {(countH-Math.floor(countH/60)*60)} phút</div>
                                    </div>,
              children: myElement,
          }
          myArray.push(item)
       });
       setItems(myArray) 
    }
    const onChange = (key: any) => {
        setAcctiveKey(key)
      };
    useEffect(()=>{
        handleTitleVideos()
    },[])
    return(
        <>
            <Collapse items={items} onChange={onChange} activeKey={activeKey} size="large" style={{borderRadius:'3px',whiteSpace:'pre-wrap'}} />
        </>
    )
}
export default CollapseDetail