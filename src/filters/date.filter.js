import * as moment from 'moment'

export default function dateFilter( val, format = 'date' ) {

  return moment().format( 'DD.MM.YYYY\xa0\xa0\xa0\xa0HH:mm:ss ' ); 
}