import React from 'react'
import HeatMap from '@uiw/react-heat-map'

const Heatmap = () => {
  return (
    <div className='w-full h-full'>
    <h1 className='text-2xl font-bold mb-4'>Heatmap Example</h1>
    <HeatMap 
      startDate="2023-01-01"
      endDate="2023-12-31"
    //   data = {dates.map(date => new Date(date).toISOString().slice(0, 10))}
    />
  </div>
  )
}

export default Heatmap