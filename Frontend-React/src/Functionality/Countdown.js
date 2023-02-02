import React, { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown() {
  /*
    uses svg filter to create "morphin effect"
    2 layer elements on top of each other, 
    blurs  depending on element 
    after blur both texts  threshold filter together
    Comment css #container rule's filter to see blurring
*/

//   const [text1, setText1] = useState("1");
//   const [text2, setText2] = useState("2");

//   var text1Css = document.getElementById("countdown-text1");
//   var text2Css = document.getElementById("countdown-text2");

//   // const elts = {
//   // 	text1: document.getElementById("text1"),
//   // 	text2: document.getElementById("text2")
//   // };

//   // The strings to morph between. You can change these to anything you want!
//   const texts = ["5", "4", "3", "2", "1", "GO!"];

//   // morphing speed.
//   const morphTime = 1;
//   const cooldownTime = 0.4;

//   let textIndex = texts.length - 1;
//   let time = new Date();
//   let morph = 0;
//   let cooldown = cooldownTime;

//   // elts.text1.textContent = texts[textIndex % texts.length];
//   // elts.text2.textContent = texts[(textIndex + 1) % texts.length];

//   function doMorph() {
//     morph -= cooldown;
//     cooldown = 0;
//     let fraction = morph / morphTime;
//     if (fraction > 1) {
//       cooldown = cooldownTime;
//       fraction = 1;
//     }
//     setMorph(fraction);
//   }

//   // // A lot of the magic happens here, this is what applies the blur filter to the text.
//   function setMorph(fraction) {
//     fraction = Math.cos(fraction * Math.PI) / -2 + 0.5;
//     text2Css.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
//     text2Css.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

//     fraction = 1 - fraction;

//     text1Css.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
//     text1Css.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

//     text1Css.textContent = texts[textIndex % texts.length];
//     text2Css.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

//     // setText1(texts[textIndex]);
//     // setText2(texts[textIndex + 1]);

//     // elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
//     // elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
//     // fraction = 1 - fraction;
//     // elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
//     // elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
//     // elts.text1.textContent = texts[textIndex % texts.length];
//     // elts.text2.textContent = texts[(textIndex + 1) % texts.length];
//   }

//   function doCooldown() {
//     morph = 0;

//     text2Css.style.filter = "";
//     text2Css.style.opacity = "100%";
//     text1Css.style.filter = "";
//     text1Css.style.opacity = "0%";

//     // elts.text2.style.filter = "";
//     // elts.text2.style.opacity = "100%";
//     // elts.text1.style.filter = "";
//     // elts.text1.style.opacity = "0%";
//   }

//   // // Animation loop, which is called every frame.
//   function animate() {
//     requestAnimationFrame(animate);

//     let newTime = new Date();
//     let shouldIncrementIndex = cooldown > 0;
//     let dt = (newTime - time) / 1000;
//     time = newTime;

//     cooldown -= dt;

//     if (cooldown <= 0) {
//       if (shouldIncrementIndex) {
//         textIndex++;
//       }

//       doMorph();
//     } else {
//       doCooldown();
//     }
//   }

//   // useEffect(() => {

//   //     animate();
//   // },[])

//   return (
//     <div className="countdown">
//       aaaa
//       <div className="countdown-text-container">
//         <p className="countdown-text countdown-text1">{text1}</p>
//         <p className="countdown-text countdown-text2">{text2}</p>
//       </div>
//     </div>
//   );
 }

export default Countdown;
