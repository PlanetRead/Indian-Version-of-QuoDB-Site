
import axios from 'axios'

export const fetcher = (url: string) => axios.get(url).then((res: any) => res.data)

const API_BASE_URL = process.env.NEXT_PUBLIC_TRANSLATE_API_URL ?? 'http://localhost:8000'

export const translate = async (data: any) => {
    const response = await axios.post(`${API_BASE_URL.replace(/\/$/, '')}/v1/translate/translate-spec`, data);
    return response.data;
}
