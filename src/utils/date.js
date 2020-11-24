import dayjs from 'dayjs'
export function format(data) {
  return dayjs(data).format('YYYY-MM-DD HH:mm:ss')
}
