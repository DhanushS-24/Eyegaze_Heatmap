// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("packs/webgazer.js")
require("packs/main.js")
require("packs/calibration.js")
require("packs/precision_calculation.js")
require("packs/precision_store_points.js")
require("packs/resize_canvas.js")
require('jquery')
require('sweetalert')
// require jquery3
// require popper
import "bootstrap"
// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
