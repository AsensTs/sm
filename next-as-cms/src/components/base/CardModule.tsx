import React from 'react';
import { Card } from 'antd';

type Props = {}

export default function CardModule({}: Props) {
  return (
    <div className='h-full'>
        <div className='h-20' style={{marginBottom: "20px"}}>
            <p>Card content</p>
            <p>Card content</p>
        </div>
        <Card className='h-3/4'>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    </div>
  )
}