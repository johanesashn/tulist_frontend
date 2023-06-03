const getDay = () => {
    const today = new Date()
    const curDay = today.getDay();
    switch (curDay) {
        case 0:
          return "Sunday"
        case 1:
          return "Monday"
        case 2:
           return "Tuesday"
        case 3:
          return "Wednesday"
        case 4:
          return "Thursday"
        case 5:
          return "Friday"
        case 6:
          return "Saturday"
      }
}

const greeting = () => {
    const today = new Date()
    const curHr = today.getHours()
    if (curHr < 12) {
        return "Good Morning"
    } else if (curHr < 18) {
        return "Good Afternoon"
    } else {
        return "Good Evening"
    }
}

const getMonth = () => {
    const today = new Date()
    const curMonth = today.getUTCMonth()

    switch (curMonth) {
        case 0:
          return "January"
        case 1:
          return "February"
        case 2:
           return "March"
        case 3:
          return "April"
        case 4:
          return "May"
        case 5:
          return "June"
        case 6:
          return "July"
        case 7:
          return "August"
        case 8:
          return "September"
        case 9:
          return "October"
        case 10:
          return "November"
        case 11:
          return "Desember"
      }
}

const getDate = () => {
    const today = new Date()
    return (today.getDate())
}

export {
    getDay, 
    getDate,
    getMonth,
    greeting,
}