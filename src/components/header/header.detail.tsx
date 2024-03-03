'use client'
import ConfigProvider from 'antd/es/config-provider';
import Rate from 'antd/es/rate';
import Layout from 'antd/es/layout';
const { Header } = Layout;
interface IProps {
    product : IProduct | null,
}
const HeaderDetail = (props:IProps) => {
    const { product } = props
    const convertToDecimalString =(number :any)=> {
        var decimalString = (number / 1000).toFixed(3);
        return decimalString.toString();
    }
    return(
        <>
            <Header style={{
                width: '100%',
                height:'62px',
                background:'#282828',
                position:'fixed',
                top:0,
                zIndex:4,
            }}>
                <div style={{marginLeft:'-50px',width:'100%',height:80,position:'relative',display:'flex'}}>
                    <div style={{position:'absolute',top:'-15px',left:'15px',fontSize:18,color:'whitesmoke'}}>{product?.productName}</div>
                    <div style={{display:'flex',gap:'10px',position:'absolute',top:'10px',left:'15px'}}>
                        <div style={{color:'#D2691E'}}>{product?.evaluate}</div>
                        <div>
                            <ConfigProvider
                                  theme={{
                                     token:{
                                     marginXS:3
                                     }
                                  }}     
                               >
                                <Rate disabled defaultValue={product?.evaluate} style={{fontSize:14,color:'#D2691E'}}/>
                            </ConfigProvider>
                        </div>
                        <div style={{color:'#B0E0E6',textDecoration:'underline'}}>(100 xếp hạng)</div>
                        <div style={{color:'white'}}>{convertToDecimalString(product?.numberStudents)} học viên</div>
                    </div>
                </div>
            </Header>
        </>
    )
}
export default HeaderDetail