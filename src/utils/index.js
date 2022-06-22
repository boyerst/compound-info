import React from 'react'
import { useQuery } from "@apollo/client"



export const formatNum = (num) => {
  return Number.parseFloat(num).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})

}

export const formatPercentage = (num) => {
  return Number.parseFloat(num).toLocaleString(undefined, {minimumFractionDigits: 3, maximumFractionDigits: 3})

}

