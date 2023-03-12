import React from 'react'

export const Card = ({children, amount = '0', icon, theContext = 'null', setVariant}) => {

    const green = "text-green-500 bg-green-100 dark:text-green-100 dark:bg-green-500"
    const blue = "text-blue-500 bg-blue-100 dark:text-blue-100 dark:bg-blue-500"
    const orange = "text-orange-500 bg-orange-100 dark:text-orange-100 dark:bg-orange-500"
    const teal = "text-teal-500 bg-teal-100 dark:text-teal-100 dark:bg-teal-500"

    const variant = setVariant == 'green' ? green : setVariant == 'blue' ? blue :setVariant == 'orange' ? orange : setVariant == 'teal' ? teal : orange;
    
    return (
        <>
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 border dark:border-0">
                <div className={"p-3 mr-4 rounded-full " + variant}>
                    {icon}
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {theContext}
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {amount}
                  </p>
                </div>
              </div>
        </>
    )
}