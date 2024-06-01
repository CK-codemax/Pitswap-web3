
'use client'
  import { createContext, useReducer, useContext } from 'react';
  import tokenList from '../../tokenList.json'

const initialState = {
tokenOne : tokenList[0],
tokenTwo : tokenList[1],
prices : null,
tokenOneAmount : null,
tokenTwoAmount : null,
}



function switchToken(){
  return {type : 'token/switch'}
}

// function changePath(path){
//   return {type : 'path/change', payload : path}
// }

// function resetQuery(){
//   return {type : 'query/reset'}
// }


function reducer(state, action){
  switch(action.type){
    case 'token/switch' :
    return {...state, genre : action.payload}
      case 'query/change' :
    // return {...state, query : action.payload}
    //   case 'path/change' :
    // return {...state, path : action.payload}
    //   case 'query/reset' :
    // return {...state, query : ''}
      
      default :
    throw new Error('Invalid action type')
}
}


const CurrencyContext = createContext();

function CurrencyProvider({ children }){

const [ { tokenOne, tokenOneAmount, tokenTwo, tokenTwoAmount, prices}, dispatch ] = useReducer(reducer, initialState)

const handleTokenSwitch = function(){
return
dispatch(switchToken())
}
//   const handleChangeQuery = function( newQuery ){
// dispatch(changeQuery(newQuery))
//   }

//   const handleChangePath = function( newPath ){
//     if(newPath === path)return
//     dispatch(changePath(newPath))
//   }


//   const handleResetQuery = function(){
//     dispatch(resetQuery())
//   }
  
return(
<CurrencyContext.Provider 
value={{
genre,
handleChangeGenre,
handleChangeQuery,
query,
page,
  path,
handleChangePath,
  handleResetQuery,
}}
>
{children}
</CurrencyContext.Provider>
)
}

function useCurrencyContext(){
  
const context = useContext(CurrencyContext);
  
if(context === undefined) throw new Error
  ('CurrencyContext was used outside of CurrencyProvider')
return context
}

export { CurrencyProvider, useCurrencyContext, }