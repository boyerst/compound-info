import React from 'react'
import { useQuery } from "@apollo/client"



export const formatNum = (price) => {
  return Number.parseFloat(price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})

}



