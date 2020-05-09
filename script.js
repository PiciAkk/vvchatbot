var mobileView;
var question;
var kerdes;
var email;
var msg;
var i = 1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  mobileView = true;
} else {
  mobileView = false;
}
function clear() {
  var i2 = 1;
  while (i2 != 20) {
    document.getElementById("p"+i2).innerHTML = "";
    i2 += 1;
  }
  i = 1;
}
function writeIn(text) {
  if (i > "20") {
    clear();
  }
  document.getElementById("p"+i).innerHTML = text;
  i += 1;
}
writeIn("Viki: Köszöntelek, Viki vagyok! Kérlek, a továbblépéshez, add meg az e-mail címed!");
kerdes = "email";
function mainBtnClicked() {
  question = document.getElementById("mainUserInput").value;
  question = question.toLowerCase();
  check(question);
}
function check(question2) {
  writeIn("Te: "+question2);
  document.getElementById("mainUserInput").value = "";
  if (question2.includes("nyitvatartás") || question2.includes("nyitva")) {
    writeIn("Viki: Nyitvatartás: Hétfő-Szerda 13-18h, csütörtök-vasárnap zárva");
  } else if (question2.includes("vásárlás") || question2.includes("venni") || question2.includes("vásárolni")){
    writeIn("Viki: Már regisztráltál magadnak felhasználót?");
    kerdes = "userRegistered?";
  } else if (question2.includes("igen")){
    if (kerdes == "userRegistered?"){
      writeIn("Viki: Rendben! Akkor jelentkezz be, illetve válaszd ki a terméket, amit meg szeretnél vásárolni. Ezek után kattints a termék dobozában");
      kerdes = "none";
    } else if (kerdes == "areuNoob?") {
      writeIn("Viki: Rendben, akkor regisztrálj!");
      writeIn('Viki: Ha a regisztráció kész, akkor válassz ki egy terméket és kattints rá! Ezek után nyomj a megveszem gombra, majd a lightboxban válaszd ki azt a darabot, amit szeretnél! Majd nyomj az "Ezt kérem!" gombra!');
      writeIn('Viki: Ezek után elvileg látszódik a kosár, amelyben már láthatod a kiválasztott terméket. Ezek után kattints a "Pénztár" gombra! Ezután válaszd ki a fizetési, szállítási módot és kattints a "Tovább az adatokhoz" gombra!');
      writeIn('Viki: Itt töltsd ki a beviteli mezőket az adataiddal, majd ha kész, nyomj a fizetés gombra!');
      kerdes = "none";
      document.getElementById("yes").innerHTML = "Igen";
      document.getElementById("no").innerHTML = "Nem";
      } else {
      writeIn("Viki: Sajnálom, de nem értettem, amit mondtál!");
    }
  } else if (question2.includes("nem")){
    if (kerdes == "userRegistered?"){
      writeIn("Viki: Akkor megteheted ezt a weboldal jobb felső sarkában! Ha nem találod, átirányítalak!");
      document.getElementById("no").innerHTML = "Nem találom";
      document.getElementById("yes").innerHTML = "Megtaláltam";
      kerdes = "areuNoob?";
    } else if (kerdes == "areuNoob?"){
      writeIn("Viki: Rendben! Hamarosan átirányítalak");
      open("http://veddvelem.hu/regisztracio","_self");
      kerdes = "none";
      document.getElementById("yes").innerHTML = "Igen";
      document.getElementById("no").innerHTML = "Nem";
    } else {
      writeIn("Viki: Sajnálom, de nem értettem, amit mondtál!");
    }
  } else if (question2.includes("regisztrálni") || question2.includes("regisztráció")) {
    writeIn("Viki: Hamarosan átirányítalak a regisztrációhoz!");
    open("http://veddvelem.hu/regisztracio","_self");
  } else if (question2.includes("bejelentkezés") || question2.includes("bejelentkezni") || question2.includes("jelentkezhetek") || question2.includes("jelentkezés be")) {
    writeIn("Viki: Hamarosan átirányítalak a bejelentkezéshez!");
    open("http://veddvelem.hu/bejelentkezes", "_self");
  } else if (question2.includes("megtaláltam")) {
    writeIn("Viki: Rendben, akkor regisztrálj!");
    writeIn('Viki: Ha a regisztráció kész, akkor válassz ki egy terméket a főoldalon és kattints rá! Ezek után nyomj a megveszem gombra, majd a lightboxban válaszd ki azt a darabot, amit szeretnél! Majd nyomj az "Ezt kérem!" gombra!');
    writeIn('Viki: Ezek után elvileg látszódik a kosár, amelyben már láthatod a kiválasztott terméket. Ezek után kattints a "Pénztár" gombra! Ezután válaszd ki a fizetési módot és kattints a "Tovább az adatokhoz" gombra!');
    writeIn('Viki: Itt töltsd ki a beviteli mezőket az adataiddal, majd ha kész, nyomj a fizetés gombra!');
    kerdes = "none";
    document.getElementById("yes").innerHTML = "Igen";
    document.getElementById("no").innerHTML = "Nem";
  } else if (question2.includes("nem találom") || question2.includes("nem találtam")) {
    writeIn("Viki: Rendben! Hamarosan átirányítalak!");
    open("http://veddvelem.hu/regisztracio","_self");
    kerdes = "none";
    document.getElementById("yes").innerHTML = "Igen";
    document.getElementById("no").innerHTML = "Nem";
  } else if (question2.includes("jelszócsere") || question2.includes("jelszó") || question2.includes("jelszavamat")){
    writeIn("Viki: Hamarosan átirányítalak...");
    open("http://veddvelem.hu/elfelejtett_jelszo", "_self");
  }
    else if (kerdes == "email") {
    email = question2;
    writeIn("Viki: Köszönöm szépen! Mostantól nyugodtan kérdezhetsz bármit!");
    kerdes = "none";
  } else {
    Email.send({
      Host : "smtp.mailtrap.io",
      Username : "793c69998c1745",
      Password : "9709cdbd943ccc",
      To : 'marci@dbx.hu',
      From : "marci@dbx.hu",
      Subject : "Új, nem beazonosított üzenet!",
      Body : ("Kérdés: "+question2+", <a href='mailto:"+email+"'>Email küldése</a> ("+email+")")
    }).then();
    // writeIn("Viki: Sajnálom, de nem értettem, amit mondtál!");
    writeIn("Viki: Erre a veddvelem legénysége fog válaszolni helyettem. Elküldöm nekik!");
    open("https://vikiphp.piciakk.repl.co/?text="+question2+"&&email="+email)
  }
}
function subBtnClicked(btnName){
  if (btnName == "howtoShop") {
    check("hogyan lehet vásárolni?");
  } else if (btnName == "nyitvatartas") {
    check("mi a nyitvatartási rend nálatok?");
  } else if (btnName == "howtoRegister") {
    check("hogyan lehet regisztrálni?");
  } else if (btnName == "yes"){
    check("igen");
  } else if (btnName == "no"){
    check("nem");
  } else if (btnName == "passwordChange"){
    check("elfelejtettem a jelszavamat");
  }
}
