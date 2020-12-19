

// function translate(sentences, targetDiv, from_lang = 'th', to_lang = 'en') {
//   let sentences = sentences.replace(/\n/g, '<br>');
//   let endPoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from_lang}&tl=${to_lang}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURIComponent(
//     sentences
//   )}`;

//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var jsonText = JSON.parse(this.responseText);
//       text = jsonText[0][0][0];
//       text = text.replace(/<br>/g, '\n');
//       targetDiv.innerHTML = '&nbsp;' + text;
//     }
//   };
//   xhttp.open('GET', endPoint, true);
//   xhttp.send();
// }

// translate("ป้อนภาษาไทยที่นี้", document.getElementById("your_element_ID"));