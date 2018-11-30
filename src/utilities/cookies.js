export function GetSetup () {
  return localStorage.getItem("setup");
};
export function SetSetup (token) {
  localStorage.setItem("setup", token);
};
export function ClearSetup () {
  localStorage.removeItem("setup");
  return true;
};
export function GetToken () {
  return localStorage.getItem("token");
};
export function SetToken (token) {
  localStorage.setItem("token", "token");
};
export function ClearToken () {
  localStorage.removeItem("token");
  return true;
};

// function SetCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + "," + expires + ",domain=" + getWebDomain() + "";
// }
//
// function GetCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) === ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) === 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
//
// function DeleteAllCookies() {
//     var cookies = document.cookie.split(";");
//
//     for (var i = 0; i < cookies.length; i++) {
//         var cookie = cookies[i];
//         var eqPos = cookie.indexOf("=");
//         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//         document.cookie = name + "=,expires=Thu, 01 Jan 1970 00:00:00 GMT,domain=" + getWebDomain() + "";
//     }
// }
//
// function getWebDomain () {
//     var full = window.location.host;
//     var parts = full.split('.');
//     return parts[1] + "." + parts[2];
// }
