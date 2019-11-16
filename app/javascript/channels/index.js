// Load all the channels within this directory and all subdirectories.
const channels = require.context('.', true, /_channel\.js$/)
channels.keys().forEach(channels)
