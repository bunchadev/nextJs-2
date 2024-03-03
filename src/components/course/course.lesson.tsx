'use client'
import CheckOutlined  from '@ant-design/icons/CheckOutlined';
interface IProps {
    lesson : ILessonContent | null
}
const CourseLesson=(props: IProps)=>{
    const { lesson } = props
    return(
      <div style={{width:'95%',height:'auto',margin:'20px 20px 20px 20px',display:'flex',flexWrap:'wrap'}}>
          {
            lesson?.title.map((title,index)=>{
                return(
                    <div key={index} style={{flexBasis:'46%',display:'flex',marginLeft: index%2!==0 ? '50px' : 0,gap:16,marginTop:index > 1 ? '20px' : 0}}>
                      <CheckOutlined style={{fontSize:13,alignItems:'start',marginTop:3,fontWeight:'lighter'}}/>
                      <div style={{wordBreak:'break-all',fontSize:16}}>
                         {title}  
                      </div>
                    </div>
                )
            })
          }
      </div>
    )
}
export default CourseLesson
