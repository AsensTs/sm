import React, { useEffect, useState } from "react";
import { Button } from "antd";

const RoleIndex: React.FC = () => {
  const [count , setCount] = useState(0);

  return (
    <div>
      <div>search form</div>
      <div> role tables : {count} </div>
      <Button type="primary" onClick={() => setCount(count => count = count+1)}> 加一 </Button>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      title: '角色管理'
    }, // will be passed to the page component as props
  }
}

export default RoleIndex
