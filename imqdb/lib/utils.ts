import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export const fetcher = (url: string) => axios.get(url).then((res: any) => res.data)


export const translate = async (data: any) => {
    const response = await axios.post('http://13.233.190.198/v1/translate/translate-spec', data);
    return response.data;
}