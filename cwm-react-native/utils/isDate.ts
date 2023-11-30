/**
 * This is a simplified version of the validator.js is date. 
 * The typescript version of the validator isDate was uniformly returning false for some reason
 * This is my current workaround.
 */


function zip(date: string[], format: string[]) {
  const zippedArr = [],
    len = Math.min(date.length, format.length);

  for (let i = 0; i < len; i++) {
    zippedArr.push([date[i], format[i]]);
  }

  return zippedArr;
}

export default function isDate(date: string, format: string) {
    const splitDate = date.split('/');
    if(splitDate.length !== 3) {
        return false;
    }
    let splitFormat = format.split('/');
    if(splitFormat.length !== 3) {
        splitFormat = ['mm', 'dd', 'yyyy']
    };
    const dateAndFormat = zip(splitDate, splitFormat);
    
    const dateObj = {
        m: '',
        d: '',
        y: '',
    };

    for (const [dateWord, formatWord] of dateAndFormat) {
      if (dateWord.length !== formatWord.length) {
        return false;
      }
      switch (formatWord.charAt(0)) {
        case "m":
            dateObj.m = dateWord;
            break;
        case "d":
            dateObj.d = dateWord;
            break;
        case "y":
            dateObj.y = dateWord;
            break;
        default:
            return false;
      }
    }

    let fullYear = dateObj.y;

    if (dateObj.y.length === 2) {
      const parsedYear = parseInt(dateObj.y, 10);

      if (isNaN(parsedYear)) {
        return false;
      }

      const currentYearLastTwoDigits = new Date().getFullYear() % 100;

      if (parsedYear < currentYearLastTwoDigits) {
        fullYear = `20${dateObj.y}`;
      } else {
        fullYear = `19${dateObj.y}`;
      }
    }

    let month = dateObj.m;

    if (dateObj.m.length === 1) {
      month = `0${dateObj.m}`;
    }

    let day = dateObj.d;

    if (dateObj.d.length === 1) {
      day = `0${dateObj.d}`;
    }

    return new Date(`${fullYear}-${month}-${day}T00:00:00.000Z`).getUTCDate() === +dateObj.d;
  }


