/*
 * Sets store_points to true, so all the occuring prediction
 * points are stored
 */
window.store_points_variable = function(){
  store_points_var = true;
}

/*
 * Sets store_points to false, so prediction points aren't
 * stored any more
 */
window.stop_storing_points_variable = function(){
  store_points_var = false;
}

/*
 * Returns the stored tracker prediction points
 */
window.get_points = function() {
  var past50 = new Array(2);
  past50[0] = xPast50;
  past50[1] = yPast50;
  return past50;
}
