// import {useI18n} from 'vue-i18n' 

// const {t, locale} = useI18n();

// export const tt = (translation) => {
//     return _.capitalize(t(translation))
    
//     }

export const Summarycalc = (data, idx:number) =>{
  return data.reduce((acc, curr)=>acc+Object.values(curr)[idx],0)
}

export function convertDate(excelDate) {
  if(typeof excelDate == "number"){
    const date = new Date(excelDate)
    const year = date.getFullYear() 
    const month = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return `${year}-${month}-${day}` 

  }else{
    const year = excelDate.getFullYear() 
    const month = excelDate.getMonth()+1 < 10 ? `0${excelDate.getMonth()+1}` : excelDate.getMonth()+1
    const day = excelDate.getDate() < 10 ? `0${excelDate.getDate()}` : excelDate.getDate()
    return `${year}-${month}-${day}` 
  } 
    }