/* This is the copy of pcal panchangJS*/
// Panchang code
// globals
let Lmoon0;
let Lsun0;
let kyear, kmon, kday;
let khr, kmin, ksek;
const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan;
const atan = Math.atan;
const floor = Math.floor;
const round = Math.round;
const abs = Math.abs;
let d2r = Math.PI / 180;
let r2d = 180 / Math.PI;
var zn = [
  'Mesha',
  'Vrushabha',
  'Mithuna',
  'Karkataka',
  'Simha',
  'Kanya',
  'Tula',
  'Vrushchika',
  'Dhanu',
  'Makara',
  'Kumbha',
  'Meena'
];
var wd = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
// var range = [1, 31, 0, 0, -3000, 4000, 0, 23, 0, 59, -12, 12, 0, 59];
var naks = [
  'Ashwini',
  'Bharani',
  'Kruthika',
  'Rohini',
  'Mrugasira',
  'Aarudra',
  'Punarwasu',
  'Pushyami',
  'Aslesha',
  'Makha',
  'Pubha',
  'Uttara',
  'Hasta',
  'Chitta',
  'Swati',
  'Visakha',
  'Anuradha',
  'Jyesta',
  'Mula',
  'Purva-Shada',
  'Uttara-Shaada',
  'Sravanam',
  'Dhanista',
  'Satabhisham',
  'Purva-Bhadra',
  'Uttara-Bhadra',
  'Revathi'
];
var tith = [
  'Padyami*',
  'Vidhiya',
  'Thadiya',
  'Chavithi',
  'Panchami',
  'Shasti',
  'Sapthami',
  'Ashtami',
  'Navami',
  'Dasami',
  'Ekadasi',
  'Dvadasi',
  'Trayodasi',
  'Chaturdasi',
  'Punnami',
  'Padyami',
  'Vidhiya',
  'Thadiya',
  'Chaviti',
  'Panchami',
  'Shasti',
  'Sapthami',
  'Ashtami',
  'Navami',
  'Dasami',
  'Ekadasi',
  'Dvadasi',
  'Trayodasi',
  'Chaturdasi',
  'Amavasya'
];
var kar = [
  'Bawa',
  'Balava',
  'Kaulava',
  'Taitula',
  'Garaja',
  'Vanija',
  'Vishti',
  'Sakuna',
  'Chatushpada',
  'Nagava',
  'Kimstughana'
];
var yog = [
  'Vishkambha',
  'Prithi',
  'Ayushman',
  'Saubhagya',
  'Sobhana',
  'Atiganda',
  'Sukarman',
  'Dhrithi',
  'Soola',
  'Ganda',
  'Vridhi',
  'Dhruva',
  'Vyaghata',
  'Harshana',
  'Vajra',
  'Siddhi',
  'Vyatipata',
  'Variyan',
  'Parigha',
  'Siva',
  'Siddha',
  'Sadhya',
  'Subha',
  'Sukla',
  'Bramha',
  'Indra',
  'Vaidhruthi'
];
// var tipnaks = [
//   2,
//   5,
//   6,
//   0,
//   1,
//   4,
//   3,
//   2,
//   4,
//   5,
//   5,
//   0,
//   2,
//   1,
//   3,
//   6,
//   1,
//   4,
//   4,
//   5,
//   0,
//   3,
//   3,
//   3,
//   5,
//   0,
//   1
// ];
var Lmoon, Lsun, skor, LmoonYoga, LsunYoga, dt;
var ayanamsa = 0;

//---------------------------------------------------------------------------
// Data on the Moon outrage in length.
//---------------------------------------------------------------------------
function corr(mlcor, mscor, fcor, dcor, lcor) {
  this.mlcor = mlcor;
  this.mscor = mscor;
  this.fcor = fcor;
  this.dcor = dcor;
  this.lcor = lcor;
}

function corr2(l, ml, ms, f, d) {
  this.l = l;
  this.ml = ml;
  this.ms = ms;
  this.f = f;
  this.d = d;
}

var corrMoon = []; // main
 let i = 0;
// ml, ms, f, d, l
corrMoon[i++] = new corr(0, 0, 0, 4, 13.902);
corrMoon[i++] = new corr(0, 0, 0, 2, 2369.912);
corrMoon[i++] = new corr(1, 0, 0, 4, 1.979);
corrMoon[i++] = new corr(1, 0, 0, 2, 191.953);
corrMoon[i++] = new corr(1, 0, 0, 0, 22639.5);
corrMoon[i++] = new corr(1, 0, 0, -2, -4586.465);
corrMoon[i++] = new corr(1, 0, 0, -4, -38.428);
corrMoon[i++] = new corr(1, 0, 0, -6, -0.393);
corrMoon[i++] = new corr(0, 1, 0, 4, -0.289);
corrMoon[i++] = new corr(0, 1, 0, 2, -24.42);
corrMoon[i++] = new corr(0, 1, 0, 0, -668.146);
corrMoon[i++] = new corr(0, 1, 0, -2, -165.145);
corrMoon[i++] = new corr(0, 1, 0, -4, -1.877);
corrMoon[i++] = new corr(0, 0, 0, 3, 0.403);
corrMoon[i++] = new corr(0, 0, 0, 1, -125.154);
corrMoon[i++] = new corr(2, 0, 0, 4, 0.213);
corrMoon[i++] = new corr(2, 0, 0, 2, 14.387);
corrMoon[i++] = new corr(2, 0, 0, 0, 769.016);
corrMoon[i++] = new corr(2, 0, 0, -2, -211.656);
corrMoon[i++] = new corr(2, 0, 0, -4, -30.773);
corrMoon[i++] = new corr(2, 0, 0, -6, -0.57);
corrMoon[i++] = new corr(1, 1, 0, 2, -2.921);
corrMoon[i++] = new corr(1, 1, 0, 0, -109.673);
corrMoon[i++] = new corr(1, 1, 0, -2, -205.962);
corrMoon[i++] = new corr(1, 1, 0, -4, -4.391);
corrMoon[i++] = new corr(1, -1, 0, 4, 0.283);
corrMoon[i++] = new corr(1, -1, 0, 2, 14.577);
corrMoon[i++] = new corr(1, -1, 0, 0, 147.687);
corrMoon[i++] = new corr(1, -1, 0, -2, 28.475);
corrMoon[i++] = new corr(1, -1, 0, -4, 0.636);
corrMoon[i++] = new corr(0, 2, 0, 2, -0.189);
corrMoon[i++] = new corr(0, 2, 0, 0, -7.486);
corrMoon[i++] = new corr(0, 2, 0, -2, -8.096);
corrMoon[i++] = new corr(0, 0, 2, 2, -5.741);
corrMoon[i++] = new corr(0, 0, 2, 0, -411.608);
corrMoon[i++] = new corr(0, 0, 2, -2, -55.173);
corrMoon[i++] = new corr(0, 0, 2, -4, 0.025);
corrMoon[i++] = new corr(1, 0, 0, 1, -8.466);
corrMoon[i++] = new corr(1, 0, 0, -1, 18.609);
corrMoon[i++] = new corr(1, 0, 0, -3, 3.215);
corrMoon[i++] = new corr(0, 1, 0, 1, 18.023);
corrMoon[i++] = new corr(0, 1, 0, -1, 0.56);
corrMoon[i++] = new corr(3, 0, 0, 2, 1.06);
corrMoon[i++] = new corr(3, 0, 0, 0, 36.124);
corrMoon[i++] = new corr(3, 0, 0, -2, -13.193);
corrMoon[i++] = new corr(3, 0, 0, -4, -1.187);
corrMoon[i++] = new corr(3, 0, 0, -6, -0.293);
corrMoon[i++] = new corr(2, 1, 0, 2, -0.29);
corrMoon[i++] = new corr(2, 1, 0, 0, -7.649);
corrMoon[i++] = new corr(2, 1, 0, -2, -8.627);
corrMoon[i++] = new corr(2, 1, 0, -4, -2.74);
corrMoon[i++] = new corr(2, -1, 0, 2, 1.181);
corrMoon[i++] = new corr(2, -1, 0, 0, 9.703);
corrMoon[i++] = new corr(2, -1, 0, -2, -2.494);
corrMoon[i++] = new corr(2, -1, 0, -4, 0.36);
corrMoon[i++] = new corr(1, 2, 0, 0, -1.167);
corrMoon[i++] = new corr(1, 2, 0, -2, -7.412);
corrMoon[i++] = new corr(1, 2, 0, -4, -0.311);
corrMoon[i++] = new corr(1, -2, 0, 2, 0.757);
corrMoon[i++] = new corr(1, -2, 0, 0, 2.58);

corrMoon[i++] = new corr(1, -2, 0, -2, 2.533);
corrMoon[i++] = new corr(0, 3, 0, -2, -0.344);
corrMoon[i++] = new corr(1, 0, 2, 2, -0.992);
corrMoon[i++] = new corr(1, 0, 2, 0, -45.099);
corrMoon[i++] = new corr(1, 0, 2, -2, -0.179);
corrMoon[i++] = new corr(1, 0, -2, 2, -6.382);
corrMoon[i++] = new corr(1, 0, -2, 0, 39.528);
corrMoon[i++] = new corr(1, 0, -2, -2, 9.366);
corrMoon[i++] = new corr(0, 1, 2, 0, 0.415);
corrMoon[i++] = new corr(0, 1, 2, -2, -2.152);
corrMoon[i++] = new corr(0, 1, -2, 2, -1.44);
corrMoon[i++] = new corr(0, 1, -2, -2, 0.384);
corrMoon[i++] = new corr(2, 0, 0, 1, -0.586);
corrMoon[i++] = new corr(2, 0, 0, -1, 1.75);
corrMoon[i++] = new corr(2, 0, 0, -3, 1.225);
corrMoon[i++] = new corr(1, 1, 0, 1, 1.267);
corrMoon[i++] = new corr(1, -1, 0, -1, -1.089);
corrMoon[i++] = new corr(0, 0, 2, -1, 0.584);
corrMoon[i++] = new corr(4, 0, 0, 0, 1.938);
corrMoon[i++] = new corr(4, 0, 0, -2, -0.952);
corrMoon[i++] = new corr(3, 1, 0, 0, -0.551);
corrMoon[i++] = new corr(3, 1, 0, -2, -0.482);
corrMoon[i++] = new corr(3, -1, 0, 0, 0.681);
corrMoon[i++] = new corr(2, 0, 2, 0, -3.996);
corrMoon[i++] = new corr(2, 0, 2, -2, 0.557);
corrMoon[i++] = new corr(2, 0, -2, 2, -0.459);
corrMoon[i++] = new corr(2, 0, -2, 0, -1.298);
corrMoon[i++] = new corr(2, 0, -2, -2, 0.538);
corrMoon[i++] = new corr(1, 1, -2, -2, 0.426);
corrMoon[i++] = new corr(1, -1, 2, 0, -0.304);
corrMoon[i++] = new corr(1, -1, -2, 2, -0.372);
corrMoon[i++] = new corr(0, 0, 4, 0, 0.418);
corrMoon[i++] = new corr(2, -1, 0, -1, -0.352);

var corrMoon2 = new Array(); // additional
i = 0;
// l, ml, ms, f, d
corrMoon2[i++] = new corr2(0.127, 0, 0, 0, 6);
corrMoon2[i++] = new corr2(-0.151, 0, 2, 0, -4);
corrMoon2[i++] = new corr2(-0.085, 0, 0, 2, 4);
corrMoon2[i++] = new corr2(0.15, 0, 1, 0, 3);
corrMoon2[i++] = new corr2(-0.091, 2, 1, 0, -6);
corrMoon2[i++] = new corr2(-0.103, 0, 3, 0, 0);
corrMoon2[i++] = new corr2(-0.301, 1, 0, 2, -4);
corrMoon2[i++] = new corr2(0.202, 1, 0, -2, -4);
corrMoon2[i++] = new corr2(0.137, 1, 1, 0, -1);
corrMoon2[i++] = new corr2(0.233, 1, 1, 0, -3);
corrMoon2[i++] = new corr2(-0.122, 1, -1, 0, 1);
corrMoon2[i++] = new corr2(-0.276, 1, -1, 0, -3);
corrMoon2[i++] = new corr2(0.255, 0, 0, 2, 1);
corrMoon2[i++] = new corr2(0.254, 0, 0, 2, -3);
corrMoon2[i++] = new corr2(-0.1, 3, 1, 0, -4);
corrMoon2[i++] = new corr2(-0.183, 3, -1, 0, -2);
corrMoon2[i++] = new corr2(-0.297, 2, 2, 0, -2);
corrMoon2[i++] = new corr2(-0.161, 2, 2, 0, -4);
corrMoon2[i++] = new corr2(0.197, 2, -2, 0, 0);
corrMoon2[i++] = new corr2(0.254, 2, -2, 0, -2);
corrMoon2[i++] = new corr2(-0.25, 1, 3, 0, -2);
corrMoon2[i++] = new corr2(-0.123, 2, 0, 2, 2);
corrMoon2[i++] = new corr2(0.173, 2, 0, -2, -4);
corrMoon2[i++] = new corr2(0.263, 1, 1, 2, 0);
corrMoon2[i++] = new corr2(0.13, 3, 0, 0, -1);
corrMoon2[i++] = new corr2(0.113, 5, 0, 0, 0);
corrMoon2[i++] = new corr2(0.092, 3, 0, 2, -2);

// function daysInMonth(m, y) {
//   var g_days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
//   if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) g_days[1] = 29;
//   return g_days[m];
// }

//-----------------------------------------------------------------------------------
// Calculating geotsent p avoid longitude Moon and angular sector p News.
// (2 sec accuracy. longitude)
//-----------------------------------------------------------------------------------
function moon(jd) {
  // days from 1900
  let tdays = jd - 2415020;
  let t = tdays / 36525;
  let t2 = t * t;
  let t3 = t * t * t;

  // slope travels to the equator
  // var ob = 23.452294 - 0.0130125 * t - 0.00000164 * t2 + 0.000000503 * t3;
  // the average length moon
  var l =
    270.4337361 +
    13.176396544528099 * tdays -
    (5.86 * t2) / 3600 +
    (0.0068 * t3) / 3600;
  // the difference medium length Moon and the Sun (the averageElongation Moon):
  var d =
    350.7374861110581 +
    445267.1142166667 * t -
    t2 * 1.436111132303874e-3 +
    0.0000018888889 * t3;
  // Perigee moon
  var pe =
    334.329556 +
    (14648522.52 * t) / 3600 -
    (37.17 * t2) / 3600 -
    (0.045 * t3) / 3600;
  // the average anomoly sun
  var ms =
    358.4758333333334 +
    35999.04974999958 * t -
    t2 * 1.500000059604645e-4 -
    t3 * 3.3333333623078e-6;
  // The average anomoloy moon
  //ml = 296.1046083333757 + 477198.8491083336*t + 0.0091916667090522*t2 + 0.0000143888893*t3;
  var ml = fix360(l - pe);
  // Rising length node orbit the moon:
  var om =
    259.183275 -
    (6962911.23 * t) / 3600 +
    (7.48 * t2) / 3600 +
    (0.008 * t3) / 3600;
  // the average length Moon, measured from the bottom up hub orbit:

  var f = fix360(l - om);

  
    // periodic revisions
    var r2rad = 360.0 * d2r;
    var tb = tdays * 1e-12; // *10^12
    var t2c = tdays * tdays * 1e-16; // *10^16
    var a1 = sin(r2rad * (0.53733431 - 10104982 * tb + 191 * t2c));
    var a2 = sin(r2rad * (0.71995354 - 147094228 * tb + 43 * t2c));
    var c2 = cos(r2rad * (0.71995354 - 147094228 * tb + 43 * t2c));
    var a3 = sin(r2rad * (0.14222222 + 1536238 * tb));
    var a4 = sin(r2rad * (0.48398132 - 147269147 * tb + 43 * t2c));
    var c4 = cos(r2rad * (0.48398132 - 147269147 * tb + 43 * t2c));
    var a5 = sin(r2rad * (0.52453688 - 147162675 * tb + 43 * t2c));
    var a6 = sin(r2rad * (0.84536324 - 11459387 * tb));
    var a7 = sin(r2rad * (0.23363774 + 1232723 * tb + 191 * t2c));
    var a8 = sin(r2rad * (0.5875 + 9050118 * tb));
    var a9 = sin(r2rad * (0.61043085 - 67718733 * tb));

    var dlm =
      0.84 * a3 + 0.31 * a7 + 14.27 * a1 + 7.261 * a2 + 0.282 * a4 + 0.237 * a6;
    var dpm = -2.1 * a3 - 2.076 * a2 - 0.84 * a4 - 0.593 * a6;
    var dkm = 0.63 * a3 + 95.96 * a2 + 15.58 * a4 + 1.86 * a5;
    var dls = -6.4 * a3 - 0.27 * a8 - 1.89 * a6 + 0.2 * a9;
    var dgc = (-4.318 * c2 - 0.698 * c4) / 3600.0 / 360.0;
    dgc = 1.000002708 + 139.978 * dgc;

    ml = d2r * (ml + (dlm - dpm) / 3600.0); //Average anomoly moon
    ms = d2r * (ms + dls / 3600.0); //Average anomoly sun
    f = d2r * (f + (dlm - dkm) / 3600.0);
    d = d2r * (d + (dlm - dls) / 3600.0); //avg elongation moon

    var lk = 0;
    var lk1 = 0;
    // var sk = 0;
    // var sinp = 0;
    // var nib = 0;
    // var g1c = 0;
    var i1corr = 1.0 - 6.832e-8 * tdays;
    var i2corr = dgc * dgc;

    for (i = 0; i < 93; i++) {
      // outrage at length
      var arg =
        corrMoon[i].mlcor * ml +
        corrMoon[i].mscor * ms +
        corrMoon[i].fcor * f +
        corrMoon[i].dcor * d;
      var sinarg = sin(arg);
      if (corrMoon[i].mscor != 0) {
        sinarg *= i1corr;
        if (corrMoon[i].mscor == 2 || corrMoon[i].mscor == -2) sinarg *= i1corr;
      }
      if (corrMoon[i].fcor != 0) sinarg *= i2corr;
      lk += corrMoon[i].lcor * sinarg;
    }
    for (i = 0; i < 27; i++) {
      // outrage at length additional
      arg =
        corrMoon2[i].ml * ml +
        corrMoon2[i].ms * ms +
        corrMoon2[i].f * f +
        corrMoon2[i].d * d;
      sinarg = sin(arg);
      lk1 += corrMoon2[i].l * sinarg;
    }

    // resentments of the planets
    var dlid = 0.822 * sin(r2rad * (0.3248 - 0.0017125594 * tdays));
    dlid += 0.307 * sin(r2rad * (0.14905 - 0.0034251187 * tdays));
    dlid += 0.348 * sin(r2rad * (0.68266 - 0.0006873156 * tdays));
    dlid += 0.662 * sin(r2rad * (0.65162 + 0.0365724168 * tdays));
    dlid += 0.643 * sin(r2rad * (0.88098 - 0.0025069941 * tdays));
    dlid += 1.137 * sin(r2rad * (0.85823 + 0.036448727 * tdays));
    dlid += 0.436 * sin(r2rad * (0.71892 + 0.036217918 * tdays));
    dlid += 0.327 * sin(r2rad * (0.97639 + 0.000173491 * tdays));

    l = l + nutation(jd) + (dlm + lk + lk1 + dlid) / 3600.0;
    LmoonYoga = l;
    //alert("Lmoon="+l);
    l = fix360(l);

    // angular velocity of the moon on ecliptic (deg/day):
    var vl = 13.176397;
    vl = vl + 1.434006 * cos(ml);
    vl = vl + 0.280135 * cos(2 * d);
    vl = vl + 0.251632 * cos(2 * d - ml);
    vl = vl + 0.09742 * cos(2 * ml);
    vl = vl - 0.052799 * cos(2 * f);
    vl = vl + 0.034848 * cos(2 * d + ml);
    vl = vl + 0.018732 * cos(2 * d - ms);
    vl = vl + 0.010316 * cos(2 * d - ms - ml);
    vl = vl + 0.008649 * cos(ms - ml);
    vl = vl - 0.008642 * cos(2 * f + ml);
    vl = vl - 0.007471 * cos(ms + ml);
    vl = vl - 0.007387 * cos(d);
    vl = vl + 0.006864 * cos(3 * ml);
    vl = vl + 0.00665 * cos(4 * d - ml);
    vl = vl + 0.003523 * cos(2 * d + 2 * ml);
    vl = vl + 0.003377 * cos(4 * d - 2 * ml);
    vl = vl + 0.003287 * cos(4 * d);
    vl = vl - 0.003193 * cos(ms);
    vl = vl - 0.003003 * cos(2 * d + ms);
    vl = vl + 0.002577 * cos(ml - ms + 2 * d);
    vl = vl - 0.002567 * cos(2 * f - ml);
    vl = vl - 0.001794 * cos(2 * d - 2 * ml);
    vl = vl - 0.001716 * cos(ml - 2 * f - 2 * d);
    vl = vl - 0.001698 * cos(2 * d + ms - ml);
    vl = vl - 0.001415 * cos(2 * d + 2 * f);
    vl = vl + 0.001183 * cos(2 * ml - ms);
    vl = vl + 0.00115 * cos(d + ms);
    vl = vl - 0.001035 * cos(d + ml);
    vl = vl - 0.001019 * cos(2 * f + 2 * ml);
    vl = vl - 0.001006 * cos(ms + 2 * ml);
  
  skor = vl;
  //l += ay;
  //if(l < 0.0)l += 360.0;
  return l;
}

//----------------------------------------------------------------------
// Calculating geotsent p avoid longitude Sun.
// (the acuracy of 1 sec . longitude)
//----------------------------------------------------------------------
function sun(jd) {
  // days frm 1900:
  var tdays = jd - 2415020;

  var t = tdays / 36525;
  var t2 = t * t;
  var t3 = t * t * t;

  // the avg len sun

  var ls = 279.696678 + 0.9856473354 * tdays + (1.089 * t2) / 3600;
  // perigee sun
  var pes =
    101.220833 +
    (6189.03 * t) / 3600 +
    (1.63 * t2) / 3600 +
    (0.012 * t3) / 3600;
  // avg anomoly sun

  var ms = fix360(ls - pes + 180);
  var g =
    ms +
    (0.266 * Math.sin((31.8 + 119.0 * t) * d2r) +
      6.4 * Math.sin((231.19 + 20.2 * t) * d2r) +
      (1.882 - 0.016 * t) * Math.sin((57.24 + 150.27 * t) * d2r)) /
      3600.0;
  // Rising sun node len
  // var oms = 259.18 - 1934.142 * t;
  // eccentricity orbit sun
  var ex = 0.01675104 - 0.0000418 * t - 0.000000126 * t2;
  // avg length moon
  var l =
    270.4337361 +
    13.176396544528099 * tdays -
    (5.86 * t2) / 3600 +
    (0.0068 * t3) / 3600;
  // avg anomaly moon
  var ml =
    296.1046083333757 +
    477198.8491083336 * t +
    0.0091916667090522 * t2 +
    0.0000143888893 * t3;
  // avg len earth
  var le = 99.696678 + 0.9856473354 * tdays + (1.089 * t2) / 3600;

  var om =
    259.183275 -
    (6962911.23 * t) / 3600 +
    (7.48 * t2) / 3600 +
    (0.008 * t3) / 3600;

  // eccentric anomoloy calculation iterative method
  var u = kepler(g, ex, 0.0000003);


    // cal true anomaly sun
    var b = Math.sqrt((1 + ex) / (1 - ex));
    let truanom;
    if (abs(Math.PI - u) < 1.0e-10) truanom = u;
    else truanom = 2.0 * atan(b * tan(u / 2));
    truanom = fix360(truanom * r2d);

    //corrections for cal of longitude and radius vector
    var u1 = (153.23 + 22518.7541 * t) * d2r;
    var u2 = (216.57 + 45037.5082 * t) * d2r;
    var u3 = (312.69 + 32964.3577 * t) * d2r;
    var u4 = (350.74 + 445267.1142 * t - 0.00144 * t2) * d2r;
    var u6 = (353.4 + 65928.71550000001 * t) * d2r;
    var u5 = (315.6 + 893.3 * t) * d2r;

    var dl = 0.00134 * cos(u1);
    dl += 0.00154 * cos(u2);
    dl += 0.002 * cos(u3);
    dl += 0.00179 * sin(u4);
    dl += (0.202 * sin(u5)) / 3600;

    var dr = 0.00000543 * sin(u1);
    dr += 0.00001575 * sin(u2);
    dr += 0.00001627 * sin(u3);
    dr += 0.00003076 * cos(u4);
    dr += 9.26999999e-6 * sin(u6);

    // true len of sun (deg)
    var il = ls + dl + truanom - ms;

    // corrections to abberations links
    var r1 = (1.0000002 * (1 - ex * ex)) / (1 + ex * cos(truanom * d2r));
    var rs = r1 + dr; // radius vector
    var ab = (20.496 * (1 - ex * ex)) / rs / 3600;
    ls = il + nutation(jd) - ab; // app len sun
    LsunYoga = ls;

    ls = fix360(ls);
  
  return ls;
}

//----------------------------------------------------------------------------
// cal start and end of tithi (len = 12)and karana (len = 6)
//----------------------------------------------------------------------------
function tithi(jd, n1, tzone, len) {
  var s_t = {};
  var flag;
  var jdt = jd;
  var knv = Math.floor(((jd - 2415020) / 365.25) * 12.3685);

  for (var itit = n1; itit < n1 + 2; ++itit) {
    var aspect = len * itit; // sun n moon in the early tithi
    flag = 0;
    if (aspect == 0) {
      jdt = novolun(jd, knv);
      flag = 1;
    }
    if (aspect == 360) {
      jdt = novolun(jd, knv + 1);
      flag = 1;
    }
    while (flag < 1) {
      Lsun0 = sun(jdt);
      Lmoon0 = moon(jdt);
      var a = fix360(Lsun0 + aspect); // pt should be where luna
      var asp1 = a - Lmoon0; // assymptots of the moon to ur point
      if (asp1 > 180) asp1 -= 360;
      if (asp1 < -180) asp1 += 360;
      flag = 1;

      if (Math.abs(asp1) > 0.001) {
        jdt += asp1 / (skor - 1);
        flag = 0;
      }
    }
    if (itit == n1) s_t.start = calData(jdt + (tzone - dt) / 24);
    if (itit == n1 + 1) s_t.end = calData(jdt + (tzone - dt) / 24);
  }
  return s_t;
}

//----------------------------------------------------------------------------
// cal entry and exit moon in nakshatra
//----------------------------------------------------------------------------
function nakshatra(jd, n_naksh, tzone) {
  var s_t = {};
  var flag;
  var jdt = jd;

  for (var inak = n_naksh; inak < n_naksh + 2; ++inak) {
    var n1 = fix360((inak * 80) / 6); // co-ordinate start of nakshatra
    flag = 0;
    while (flag < 1) {
      Lmoon0 = fix360(moon(jdt) + ayanamsa);
      var asp1 = n1 - Lmoon0; // distance frm moon before nakshatra(degree)
      if (asp1 > 180) asp1 -= 360;
      if (asp1 < -180) asp1 += 360;
      flag = 1;
      if (Math.abs(asp1) > 0.001) {
        jdt += asp1 / skor;
        flag = 0;
      }
    }
    if (inak == n_naksh) s_t.start = calData(jdt + (tzone - dt) / 24);
    if (inak == n_naksh + 1) s_t.end = calData(jdt + (tzone - dt) / 24);
  }
  return s_t;
}

//----------------------------------------------------------------------------
// cal begin and end of yoga
//----------------------------------------------------------------------------
function yoga(jd, zyoga, tzone) {
  var s_t = {};
  var flag;
  var jdt = jd;
  var z = zyoga;
  var nn_yoga = new Array(2);
  nn_yoga[0] = (Math.floor((z * 6) / 80) * 80) / 6;
  nn_yoga[1] = ((Math.floor((z * 6) / 80) + 1) * 80) / 6;
  for (var iyog = 0; iyog < 2; ++iyog) {
    flag = 0;
    while (flag < 1) {
       Lsun0 = sun(jdt);
       Lmoon0 = moon(jdt);
      var dmoonYoga = LmoonYoga + ayanamsa - 491143.07698973856;
      var dsunYoga = LsunYoga + ayanamsa - 36976.91240579201;
      //alert(LmoonYoga+"\r"+LsunYoga+"\r"+ayanamsa);
      z = dmoonYoga + dsunYoga;
      var asp1 = nn_yoga[iyog] - z;
      flag = 1;
      if (Math.abs(asp1) > 0.001) {
        jdt += asp1 / (skor + 1.0145616633);
        flag = 0;
      }
      //if (Math.abs(asp1) > 0.001) {jdt += (asp1 / skor) + (58.13 * Math.sin(asp1*d2r)); flag = 0;}
    }
    if (iyog == 0) s_t.start = calData(jdt + (tzone - dt) / 24);
    if (iyog == 1) s_t.end = calData(jdt + (tzone - dt) / 24);
  }
  return s_t;
}

//-----------------------------------------------------------------------------
//cal time in the near past novoluna (err less then 2 min)
//-----------------------------------------------------------------------------
function novolun(jd, knv) {
  var t = (jd - 2415020) / 36525;
  var t2 = t * t;
  var t3 = t * t * t;

  
  var jdnv =
      2415020.75933 + 29.53058868 * knv + 0.0001178 * t2 - 0.000000155 * t3;
    jdnv += 0.00033 * sin((166.56 + 132.87 * t - 0.009173 * t2) * d2r);
    var m = 359.2242 + 29.10535608 * knv - 0.0000333 * t2 - 0.00000347 * t3;
    var ml = 306.0253 + 385.81691806 * knv + 0.0107306 * t2 + 0.00001236 * t3;
    var f = 21.2964 + 390.67050646 * knv - 0.0016528 * t2 - 0.00000239 * t3;
    m *= d2r;
    ml *= d2r;
    f *= d2r;

    var djd = (0.1734 - 0.000393 * t) * sin(m);
    djd += 0.0021 * sin(2 * m);
    djd -= 0.4068 * sin(ml);
    djd += 0.0161 * sin(2 * ml);
    djd -= 0.0004 * sin(3 * ml);
    djd += 0.0104 * sin(2 * f);
    djd -= 0.0051 * sin(m + ml);
    djd -= 0.0074 * sin(m - ml);
    djd += 0.0004 * sin(2 * f + m);
    djd -= 0.0004 * sin(2 * f - m);
    djd -= 0.0006 * sin(2 * f + ml);
    djd += 0.001 * sin(2 * f - ml);
    djd += 0.0005 * sin(m + 2 * ml);

    jdnv += djd;
  
  return jdnv;
}

//-----------------------------------------------------
// decision equation kepler (in rad)
//-----------------------------------------------------
function kepler(m, ex, err) {
  //val u0, delta;

  m *= d2r;
  var u0 = m;
  err *= d2r;
  var delta = 1;
  while (Math.abs(delta) >= err) {
    delta = (m + ex * Math.sin(u0) - u0) / (1 - ex * Math.cos(u0));
    u0 += delta;
  }
  return u0;
}

//-----------------------------------------------------
// cal nutation in len
//-----------------------------------------------------
function nutation(jd) {
  var t = (jd - 2415020) / 36525;
  var t2 = t * t;

  // avg len sun
  var ls = 279.6967 + 36000.7689 * t + 0.000303 * t2;
  // avg len moon
  var l = 270.4341639 + 481267.8831417 * t - 0.0011333333 * t2;
  // avg anomaly sun
  var ms = 358.4758333333334 + 35999.04974999958 * t - t2 * 1.500000059604645e-4;
  // avg anomaly moon
  var ml = 296.1046083333757 + 477198.8491083336 * t + 0.0091916667090522 * t2;
  // the diff medium len of moon and sun (avg elongation moon)
  var d = 350.7374861110581 + 445267.1142166667 * t - t2 * 1.436111132303874e-3;

  var om = 259.1832750002543 - 1934.142008333206 * t + 0.0020777778 * t2;
  ls *= d2r;
  l *= d2r;
  ms *= d2r;
  ml *= d2r;
  d *= d2r;
  om *= d2r;
  var d2 = d * d;
  var l2 = l * l;
  var ls2 = ls * ls;


  var nut = (-17.2327 - 0.01737 * t) * sin(om);
    nut += 0.2088 * sin(2.0 * om);
    nut += 0.0675 * sin(ml);
    nut -= 0.0149 * sin(ml - d2);
    nut -= 0.0342 * sin(l2 - om);
    nut += 0.0114 * sin(l2 - ml);
    nut -= 0.2037 * sin(l2);
    nut -= 0.0261 * sin(l2 + ml);
    nut += 0.0124 * sin(ls2 - om);
    nut += 0.0214 * sin(ls2 - ms);
    nut -= 1.2729 * sin(ls2);
    nut -= 0.0497 * sin(ls2 + ms);
    nut += 0.1261 * sin(ms);
    nut = nut / 3600.0;
  
  return nut;
}

//-----------------------------------------------------
// Calculation ayanamsa (degrees)
//-----------------------------------------------------
function calcayan(jd) {
  var t = (jd - 2415020) / 36525;
  // avg node len moon
  var om =
    259.183275 -
    1934.142008333206 * t +
    0.0020777778 * t * t +
    0.0000022222222 * t * t * t;
  // avg len sun
  var ls = 279.696678 + 36000.76892 * t + 0.0003025 * t * t;
  var aya =
    17.23 * Math.sin(d2r * om) +
    1.27 * Math.sin(d2r * ls * 2) -
    (5025.64 + 1.11 * t) * t;
  aya = (aya - 80861.27) / 3600.0; // 84038.27 = Fagan-Bradley, 80861.27 = Lahiri

  return aya;
}

//------------------------------------------------------------------------------------------
// cal date by number of date mon and year
//------------------------------------------------------------------------------------------
function mdy2julian(m, d, y) {
  
    var im = 12 * (y + 4800) + m - 3;
    var j = (2 * (im - floor(im / 12) * 12) + 7 + 365 * im) / 12;
    j = floor(j) + d + floor(im / 48) - 32083;
    if (j > 2299171) j += floor(im / 4800) - floor(im / 1200) + 38;
    j -= 0.5;
  
  return j;
}

function dTime(jd) { 
  var efdt = [
    124,
    85,
    62,
    48,
    37,
    26,
    16,
    10,
    9,
    10,
    11,
    11,
    12,
    13,
    15,
    16,
    17,
    17,
    13.7,
    12.5,
    12,
    7.5,
    5.7,
    7.1,
    7.9,
    1.6,
    -5.4,
    -5.9,
    -2.7,
    10.5,
    21.2,
    24,
    24.3,
    29.2,
    33.2,
    40.2,
    50.5,
    56.9,
    65.7,
    75.5
  ];
  calData(jd);
  var dgod = kyear + (kmon - 1) / 12 + (kday - 1) / 365.25;
  var t = (jd - 2378497) / 36525; // IN centuries rejection of 1800 bc
  //t = (jd - 2415020)/36525; // in cent rejection of 1900 bc
  if (dgod >= 1620 && dgod < 2010) {
    var i1 = Math.floor((dgod - 1620) / 10);
    var di = dgod - (1620 + i1 * 10);
    dt = efdt[i1] + ((efdt[i1 + 1] - efdt[i1]) * di) / 10;
  } else {
    if (dgod >= 2010) dt = 25.5 * t * t - 39;
    //if (dgod >= 2010) dt = 29.949 * t * t - 56.796;
    //if (dgod < 1620) dt = 5 + 24.349 + 72.3165 * t + 29.949 * t * t;
    if (dgod >= 948 && dgod < 1620) dt = 25.5 * t * t;
    if (dgod < 948) dt = 1361.7 + 320 * t + 44.3 * t * t;
  }
  dt /= 3600;
  return dt;
}

//------------------------------------------------------------------------------------------
// cal date on calendar date
//------------------------------------------------------------------------------------------
function calData(jd) {
  
  var z1 = jd + 0.5;
  var z2 = floor(z1);
  var f = z1 - z2;
  var a;

    if (z2 < 2299161) a = z2;
    else {
      var alf = floor((z2 - 1867216.25) / 36524.25);
      a = z2 + 1 + alf - floor(alf / 4);
    }

    var b = a + 1524;
    var c = floor((b - 122.1) / 365.25);
    var d = floor(365.25 * c);
    var e = floor((b - d) / 30.6001);

    var days = b - d - floor(30.6001 * e) + f;
    kday = floor(days);


    if (e < 13.5) kmon = e - 1;
    else kmon = e - 13;


    if (kmon > 2.5) kyear = c - 4716;
    if (kmon < 2.5) kyear = c - 4715;

    var hh1 = (days - kday) * 24;
    khr = floor(hh1);
    kmin = hh1 - khr;
    ksek = kmin * 60;
    kmin = floor(ksek);
    ksek = floor((ksek - kmin) * 60);
    var s = new Date(kyear, kmon - 1, kday, khr, kmin, ksek, 0);
  
  return s;
}

//------------------------------------------------------------------------------------------
// transalation deg logitudinal in degrees,min and sec
//------------------------------------------------------------------------------------------
function lon2dmsz(x) {
  
    var d, m, s;
    x = abs(x);
    var z = floor(x / 30);
    d = floor(x);
    var ss0 = round((x - d) * 3600);
    m = floor(ss0 / 60);
    s = (ss0 % 60) % 60;
    d %= 30;
    var str = d + ' ' + m + "'" + s + '" ';
  
  return str;
}

//------------------------------------------------------------------------------------------
// translation degrees in deg, min and sec
//------------------------------------------------------------------------------------------
export function lon2dms(x) {
  
    var d, m, s;
    x = abs(x);
    d = floor(x);
    var ss0 = round((x - d) * 3600);
    m = floor(ss0 / 60);
    s = (ss0 % 60) % 60;
    var str = d + ' ' + m + "'" + s + '"';
  
  return str;
}

//------------------------------------------------------------------------------------------
// fixing the angle within 360 degrees
//------------------------------------------------------------------------------------------
function fix360(v) {
  while (v < 0.0) v += 360.0;
  while (v > 360.0) v -= 360.0;
  return v;
}

function fix30(v) {
    while (v < 0.0) v += 30.0;
    while (v > 30.0) v -= 30.0;
    return v;
  }
//------------------------------------------------------------------------------------------
// Day of the Week
//------------------------------------------------------------------------------------------
function weekDay(jd) {
  // Julian date for the begin of the day
  var jd0 = Math.floor(jd) + 0.5;
  if (jd < jd0) jd0 -= 1;

  // day
  var jdn = jd0 + 1.5;
  var dn1 = Math.floor(jdn / 7) * 7;

  var wday = Math.floor(jdn - dn1);

  return wday;
}

var panchang = {
  Day: {},
  Tithi: {},
  Nakshatra: {},
  Karna: {},
  Yoga: {},
  Ayanamsa: {},
  Raasi: {},
  version: '0.2',
  calculate: function(d, cb) {
    var n_wday,
      n_tithi = 1,
      n_naksh = 1,
      n_karana,
      n_yoga;

  
      var day = d.getDate();
      var mon = d.getMonth() + 1;
      var year = d.getFullYear();
      var hr = d.getHours();
      hr += d.getMinutes() / 60;
      var tzone = (d.getTimezoneOffset() / 60) * -1;
    
      var inpmin = Math.floor(d.getMinutes());
    if (inpmin < 10) inpmin = '0' + inpmin;

    // Julian date in local p. LT:
    var dayhr = day + hr / 24;
    var jdlt = mdy2julian(mon, dayhr, year);

    // day:
    n_wday = weekDay(jdlt);
    this.Day.name = wd[n_wday];
    this.Day.index=n_wday;

    // julian day at the begining of the day
    var jd0 = mdy2julian(mon, day, year);
    var jdut = jd0 + (hr - tzone) / 24;

    dt = dTime(jdut);
    var jd = jdut + dt / 24;

    //ayyanamsa
    ayanamsa = calcayan(jd);

    // length Moon
    Lmoon = moon(jd);

    // Logitudinal Sun
    Lsun = sun(jd);

    // yoga:
    var dmoonYoga = LmoonYoga + ayanamsa - 491143.07698973856;
    var dsunYoga = LsunYoga + ayanamsa - 36976.91240579201;
    var zyoga = dmoonYoga + dsunYoga;
    n_yoga = (zyoga * 6) / 80;
    while (n_yoga < 0) n_yoga += 27;
    while (n_yoga > 27) n_yoga -= 27;
    // var n3 = n_yoga;
    n_yoga = Math.floor(n_yoga);
    var s_yoga = yoga(jd, zyoga, tzone);

    // Nakstra
    Lmoon0 = fix360(Lmoon + ayanamsa);
    n_naksh = Math.floor((Lmoon0 * 6) / 80);
    var s_naksh = nakshatra(jd, n_naksh, tzone);

    // tithi
    Lmoon0 = Lmoon;
    Lsun0 = Lsun;
    if (Lmoon0 < Lsun0) Lmoon0 += 360;
    n_tithi = Math.floor((Lmoon0 - Lsun0) / 12);
    var s_tithi = tithi(jd, n_tithi, tzone, 12);

    // Karana
    Lmoon0 = Lmoon;
    Lsun0 = Lsun;
    if (Lmoon0 < Lsun0) Lmoon0 += 360;
    var nk = Math.floor((Lmoon0 - Lsun0) / 6);
    if (nk == 0) n_karana = 10;
    if (nk >= 57) n_karana = nk - 50;
    if (nk > 0 && nk < 57) n_karana = nk - 1 - Math.floor((nk - 1) / 7) * 7;
    var s_karana = tithi(jd, nk, tzone, 6);

  
      var z = floor(abs(fix360(Lmoon + ayanamsa)) / 30);
    

    this.Ayanamsa.name = lon2dms(ayanamsa);
    this.Raasi.degreeAbsolute = fix360(Lmoon + ayanamsa);
    this.Raasi.degree = fix30(Lmoon + ayanamsa);
    this.Raasi.name = zn[z];
    this.Raasi.index = z;
    
    this.Raasi.nextSign = (z+1)*30;
    this.Nakshatra.name = naks[n_naksh];
    this.Nakshatra.index = n_naksh; 
    this.Nakshatra.start = s_naksh.start;
    this.Nakshatra.end = s_naksh.end;

    this.Karna.name = kar[n_karana];
    this.Karna.start = s_karana.start;
    this.Karna.end = s_karana.end;

    this.Yoga.name = yog[n_yoga];
    this.Yoga.start = s_yoga.start;
    this.Yoga.end = s_yoga.end;

    this.Tithi.name = tith[n_tithi];
    this.Tithi.start = s_tithi.start;
    this.Tithi.end = s_tithi.end;
    this.Tithi.index = n_tithi;

    
    var result = {};




    result.Ayanamsa = {};
    result.Raasi = {};
    result.Nakshatra = {};
    result.Karna = {};
    result.Yoga = {};
    result.Tithi = {};
    result.Day = {};




    result.Day.name = this.Day.name;
    result.Day.index = this.Day.index;

    result.Ayanamsa = lon2dms(ayanamsa);
    result.Raasi.degreeAbsolute = fix360(Lmoon + ayanamsa);
    result.Raasi.degree = fix30(Lmoon + ayanamsa);
    result.Raasi.name = zn[z];
    result.Raasi.index = z;
    result.Raasi.nextSign = (z+1)*30;
    result.Nakshatra.name = naks[n_naksh];
    result.Nakshatra.index = n_naksh;
    result.Nakshatra.start = s_naksh.start;
    result.Nakshatra.end = s_naksh.end;
 result.Karna.name = kar[n_karana];
    result.Karna.start = s_karana.start;
    result.Karna.end = s_karana.end;
result.Yoga.name = yog[n_yoga];
    result.Yoga.start = s_yoga.start;
    result.Yoga.end = s_yoga.end;
result.Tithi.name = tith[n_tithi];
    result.Tithi.start = s_tithi.start;
    result.Tithi.end = s_tithi.end;
    result.Tithi.index = n_tithi;

    if (cb) {
      cb();
    }
    return result;
  }
};

export default panchang;