export const Summarycalc = (data: any, idx:number) =>{
  return data.reduce((acc: any, curr: any)=>acc+Object.values(curr)[idx],0)
}

export function convertDate(excelDate: any) {
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
