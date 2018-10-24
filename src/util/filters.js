export function timeAgo (time) {

      function pluralize (time, label) {
        if (time === 0) {
            return "few seconds ago"
        }
        if (time === 1) {
          return time + label + ' ago'
        }
        return time + label + 's ago'
      }

    const between = Date.now() / 1000 - Number(time)    
    if (between < 3600) {
      return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
      return pluralize(~~(between / 3600), ' hour')
    } else {
      return pluralize(~~(between / 86400), ' day')
    }
  }
  
