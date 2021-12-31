import { useEffect, useState } from "react"

export const Timer = () => {
  const [count,setCount] = useState(10);

  // useEffect(()=>{
  //   setInterval(()=>{
  //     setCount((p)=>{
  //       if(p===0){
  //         clearInterval(p)
  //         return 0;
  //       }
  //       return (p-1);

  //     })
  //   },1000)

  // },[])
 
  return (
    <div>Counter:-{count}</div>
  )
}