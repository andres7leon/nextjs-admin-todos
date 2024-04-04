'use client';

import { setCookie } from 'cookies-next';
import React, { useState } from 'react'

const tabOptions = [1,2,3,4,5];

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1,2,3,4], currentTab = 1}:Props) => {

  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = ( tab : number ) => {
    setSelected(tab);
    setCookie('selectedTab', tab.toString());
  }
  return (
    <>
      <div className="grid w-full grid-cols-4 space-x-2 rounded-xl bg-purple-700 p-2">
        
        {
          tabOptions.map( option => (
            <div key={option}>
              <input checked={selected === option } onChange={()=>{}} type="radio" className="peer hidden" />
              <label onClick={ () => onTabSelected( option ) } className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-purple-950 peer-checked:font-bold peer-checked:text-white">
                  {option}
              </label>
            </div>
          ))

        }

      </div>
    
    </>
  )
}
