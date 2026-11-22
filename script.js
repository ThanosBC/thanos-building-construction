const defaults=[
["Budowa domów jednorodzinnych","Od fundamentów do etapu wykończenia"],
["Fundamenty i roboty konstrukcyjne","Prace na początkowych etapach inwestycji"],
["Zabudowy gipsowo-kartonowe","Ścianki działowe, sufity i zabudowy GK"],
["Gładzie i malowanie","Przygotowanie i wykończenie ścian oraz sufitów"],
["Układanie płytek","Prace glazurnicze i okładziny"],
["Rozbiórki i demontaże","Prace przygotowawcze i rozbiórkowe"],
["Wylewki","Przygotowanie podłoży pod dalsze prace"],
["Podłogi w piwnicach","Wykonywanie i wykańczanie podłóg"]
];
let services=JSON.parse(localStorage.getItem("thanos_services")||"null")||defaults.map(x=>({name:x[0],desc:x[1],price:""}));
let settings=JSON.parse(localStorage.getItem("thanos_settings")||"{}");
function renderServices(){document.getElementById("serviceGrid").innerHTML=services.map((s,i)=>`<article class="service"><span class="num">0${i+1} / USŁUGA</span><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.desc||"")}</p>${s.price?`<span class="price">${escapeHtml(s.price)}</span>`:""}</article>`).join("");document.getElementById("editorServices").innerHTML=services.map((s,i)=>`<div class="edit-service"><input aria-label="Nazwa usługi" value="${escapeAttr(s.name)}" onchange="services[${i}].name=this.value;saveLocal()"><input aria-label="Cena" placeholder="Cena" value="${escapeAttr(s.price||"")}" onchange="services[${i}].price=this.value;saveLocal()"><button onclick="services.splice(${i},1);saveLocal();renderServices()">×</button></div>`).join("")}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}function escapeAttr(v){return escapeHtml(v)}
function saveLocal(){localStorage.setItem("thanos_services",JSON.stringify(services))}
function toggleEditor(){document.getElementById("editor").classList.toggle("open")}
function addService(){let n=document.getElementById("newService").value.trim(),p=document.getElementById("newPrice").value.trim();if(!n)return;services.push({name:n,desc:"",price:p});document.getElementById("newService").value="";document.getElementById("newPrice").value="";saveLocal();renderServices()}
function saveSettings(){settings={phone:document.getElementById("phoneInput").value,email:document.getElementById("emailInput").value,company:document.getElementById("companyInput").value};localStorage.setItem("thanos_settings",JSON.stringify(settings));saveLocal();applySettings();alert("Zapisano w tej przeglądarce.")}
function applySettings(){let card=document.querySelector(".contact-card");let contact=card.querySelector("p");contact.innerHTML="📍 Mierzyn 69B<br>Gmina Rozprza , 97-340<br>Województwo łódzkie"+(settings.phone?`<br>☎ ${escapeHtml(settings.phone)}`:"")+(settings.email?`<br>✉ ${escapeHtml(settings.email)}`:"")+(settings.company?`<br>${escapeHtml(settings.company)}`:"");let mail=card.querySelector(".btn");mail.href=settings.email?"mailto:"+encodeURIComponent(settings.email):"mailto:";mail.innerHTML=settings.email?"Napisz wiadomość <b>↗</b>":"Uzupełnij e-mail <b>↗</b>"}
document.getElementById("photoInput").addEventListener("change",e=>{let files=[...e.target.files];let gallery=document.getElementById("gallery");gallery.innerHTML="";files.forEach(f=>{let url=URL.createObjectURL(f),img=document.createElement("img");img.src=url;img.alt="Zdjęcie realizacji THANOS BC";gallery.appendChild(img)})});
function exportData(){let data={services,settings};let blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="thanos-dane-strony.json";a.click();URL.revokeObjectURL(a.href)}
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("phoneInput").value=settings.phone||"";document.getElementById("emailInput").value=settings.email||"";document.getElementById("companyInput").value=settings.company||"";renderServices();applySettings();
