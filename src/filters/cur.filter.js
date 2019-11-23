export default function currencyFilter( val, cur = "UAH" ) {

    return new Intl.NumberFormat( 'ua-UA', {
        style: 'currency',
        minimumFractionDigits: '0',
        currency: cur,
        
    } ).format(val)
    
}