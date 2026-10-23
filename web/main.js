const services = [
  ["外科换药", "伤口评估、无菌消毒、更换敷料、交代居家照护注意要点。"],
  ["造口护理", "专科护士评估造口情况，清洁造口、更换造口袋、处理并发症，居家护理指导。"],
  ["上门打针", "核对医嘱，评估病情，无菌注射、观察反应，指导注射后注意事项。"],
  ["PICC导管维护", "评估导管情况，规范更换敷料、正压接头，无菌冲洗，带管注意事项宣教。"],
  ["更换尿管", "规范拔管、无菌置管、尿液观察、护理指导、膀胱功能训练指导。"],
  ["外科伤口拆线", "伤口愈合评估、伤口消毒、无菌拆线、伤口后续管理指导。"],
  ["留置导尿", "病情评估、无菌留置导尿、尿液观察、导管宣教，及时缓解痛苦。"],
  ["气管切开护理", "气道评估、专业吸痰、敷料更换、套管清洁消毒，教导排痰与急救常识。"],
  ["压疮清创", "伤口专科护士评估分期、规范清创、敷料选择与更换、渗液管理、照护指导。"]
];

const phoneGroups = [
  ["清创换药", [["外科换药", "5.0", "wound-0.jpg"], ["压疮·清创换药", "5.0", "wound-1.jpg"], ["肛瘘术后·换药与塞药", "5.0", "wound-2.jpg"], ["造口护理", "4.8", "wound-3.jpg"]]],
  ["打针采血", [["上门打针", "5.0", "shot-0.jpg"], ["血液标本采集", "5.0", "shot-1.jpg"]]],
  ["静脉导管护理", [["PICC导管维护", "5.0", "vein-0.jpg"], ["CVC导管维护", "5.0", "vein-1.jpg"], ["输液港（PORT）维护", "5.0", "vein-2.jpg"]]],
  ["尿管护理", [["留置导尿", "5.0", "urine-0.jpg"], ["拔除尿管及指导", "5.0", "urine-1.jpg"], ["更换尿管", "5.0", "urine-2.jpg"], ["膀胱冲洗", "5.0", "urine-3.jpg"], ["导尿及膀胱冲洗", "5.0", "urine-4.jpg"]]],
  ["导管护理", [["腹透管维护", "5.0", "cath-0.jpg"], ["气管切开导管维护", "5.0", "cath-1.jpg"]]],
  ["术后拆线", [["外科伤口拆线", "5.0", "stitch-0.jpg"]]],
  ["基础护理", [["雾化吸入护理", "5.0", "basic-0.jpg"], ["通便·灌肠护理", "5.0", "basic-1.jpg"]]],
  ["器械调试", [["制氧机调试及使用指导", "5.0", "device-0.jpg"], ["血糖仪调试及使用指导", "5.0", "device-1.jpg"], ["雾化器调试及使用指导", "5.0", "device-2.jpg"], ["吸痰器调试及使用指导", "5.0", "device-3.jpg"], ["呼吸机调试及使用指导", "5.0", "device-4.jpg"]]],
  ["药物管理", [["药物管理", "5.0", "med-0.jpg"]]]
];

const side = document.querySelector("#mp-side");
const list = document.querySelector("#mp-list");

function showPhone(index) {
  [...side.children].forEach((btn, i) => btn.setAttribute("aria-selected", String(i === index)));
  list.innerHTML = phoneGroups[index][1]
    .map(([title, score, file]) => `<article class="mp-card"><img src="assets/thumbs/${file}" alt=""><div><h3>${title}</h3><p>${score}分</p></div></article>`)
    .join("");
  list.scrollTop = 0;
}

phoneGroups.forEach((group, index) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("role", "tab");
  btn.textContent = group[0];
  btn.addEventListener("click", () => showPhone(index));
  side.appendChild(btn);
});
showPhone(0);

const cards = document.querySelector("#cards");
cards.innerHTML = services
  .map(([name, desc]) => `<li><h3>${name}</h3><p>${desc}</p></li>`)
  .join("");

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
menuBtn.addEventListener("click", () => {
  const willOpen = mobileMenu.hasAttribute("hidden");
  mobileMenu.toggleAttribute("hidden", !willOpen);
  menuBtn.setAttribute("aria-expanded", String(willOpen));
});
mobileMenu.addEventListener("click", (event) => {
  if (event.target.closest("a, button")) {
    mobileMenu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

document.body.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-open]");
  if (!opener) return;
  document.getElementById(opener.dataset.open)?.showModal();
});

document.querySelector("#copy-wechat").addEventListener("click", async () => {
  const hint = document.querySelector("#copy-hint");
  try {
    await navigator.clipboard.writeText("ehutongzp");
    hint.textContent = "已复制";
  } catch {
    hint.textContent = "请手动记录 ehutongzp";
  }
});
