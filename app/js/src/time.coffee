moment = require 'moment'

getTime = ()->
	moment().format 'dddd, MMMM Do YYYY, h:mm:ss a'

module.exports = getTime

