

 const add_minutes = function(dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
}

exports.add_minutes = add_minutes;