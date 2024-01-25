/**
 * 計算住宿幾晚
 * @param checkInDate 入住日期
 * @param checkOutDate 退房日期
 * @param isOnlyNumber (非必要值)僅回傳數值；預設為 false
 * @return e.g.=> isOnlyNumber: true 為 1；反之則為 1 晚
 */
export function daysDifference(
    checkInDate: Date | string,
    checkOutDate: Date | string,
    isOnlyNumber?: boolean
): string | number {
    const checkInDateTime = newDateTransform(checkInDate).getTime();
    const checkOutDateTime = newDateTransform(checkOutDate).getTime();
    const timeDifference = Math.abs(checkOutDateTime - checkInDateTime);
    let value = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if (isNaN(value)) { value = 0 }
    return isOnlyNumber ? value : `${value} 晚`;
}

/**
 * 繁體中文日期轉換(年、月、日、星期)
 * @param date 要轉換的日期
 * @param format 格式，預設為 月日星期
 * @return e.g.=> 12 月 28 日星期四、1990 年 12 月 28 日
 */
export function zhTwDateTransform(date: Date | string, format: "月日星期" | "年月日" = "月日星期"): string {
    const formatDate = newDateTransform(date).toLocaleDateString("zh-TW", {
        month: "short",
        day: "numeric",
        year: "numeric",
        weekday: "long"
    });

    if (format === "年月日") {
        return formatDate.replace(/(\d{1,4})年(\d{1,2})月(\d{1,2})日 (.+)/, "$1 年 $2 月 $3 日");
    }

    return formatDate.replace(/(\d{1,4})年(\d{1,2})月(\d{1,2})日 (.+)/, "$2 月 $3 日$4");
}

/**
 * 日期轉換
 * @param date 要轉換的日期
 * @return e.g.=> 1990/12/28
 */
export function dateTransform(date: Date | string): string {
    const formatDate = newDateTransform(date).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return formatDate;
}

/**
 * 取得當前日期和時間的 Date 物件
 * @param date 日期參數
 * @returns e.g.=> Sun Jun 18 2023 08:00:00 GMT+0800 (台北標準時間)
 */
export const newDateTransform = (date: Date | string): Date => new Date(date);