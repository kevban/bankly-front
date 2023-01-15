
/**
 * 
 * @param {any} item a numerical item to be converted
 * @param {bool} string specifies the return type
 * @returns a string formatted in $XXX.XX, or a number rounded to 2 decimal places
 */
function formatNum(item, string = false) {
    let roundedNum = Math.round(item * 100) / 100;
    if (string) {
        return `$${roundedNum.toFixed(2)}`
    } else {
        return roundedNum
    }
}

export { formatNum }