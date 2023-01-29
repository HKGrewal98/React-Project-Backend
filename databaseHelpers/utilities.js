
const timeZones = [
    {
        type:"Breakfast",
        start:6,
        end:12 
    },
    {
        type:"Lunch",
        start:12,
        end:18 
    },
    {
        type:"Dinner",
        start:18,
        end:24 
    },
    {
        type:"Regular"
    }
]

const DefaultType = "Regular"

function getAvailableFoodFilter(allItems){
    
    let filters = []

    if(allItems){
          timeZones.forEach(zone => filters.push(new RegExp(zone.type,"i")))
          return filters
    }

    const time = new Date()
    const hour = time.getHours()
    filters.push(new RegExp(DefaultType,"i"))

    for(zone of timeZones){
            
        if(hour>=zone.start && hour<zone.end){
            filters.push(new RegExp(zone.type,"i"))
            break
        }
    }

    return filters

}


function validateUserRequest(data){
     
    let err = []

    if(!data.name || !data.email || !data.phone){
        err.push("Insufficent Data.")
        return err;
    }

    if(data.name.trim().length===0 || 
        (data.password && data.password.trim().length===0) || 
           data.email.trim().length===0 || 
              data.phone.trim().length==0){
                err.push("Details cannot be empty.")
                   return err;
    }


    if(data.password && data.password.trim().length<6){
        err.push("Password must be 6 chars long.")
        return err;
    }

    if(!data.email.includes("@")){
        err.push("Invalid EmailId.")
        return err;
    }

    if(data.phone.trim().length!=10){
        err.push("Invalid Phone Number.")
    }

    return err

}


module.exports = {getAvailableFoodFilter,validateUserRequest}