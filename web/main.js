const services = [
  ["清创换药", "上门为伤口、压疮与造口进行换药或护理。", "外科换药、压疮清创换药、肛瘘术后换药与塞药、造口护理"],
  ["打针采血", "按医嘱上门注射，或采集血液标本。"],
  ["静脉导管护理", "为留置的中心静脉通路做日常维护。", "PICC 导管维护、CVC 导管维护、输液港维护"],
  ["尿管护理", "留置、更换或拔除尿管，以及膀胱冲洗。", "留置导尿、拔除尿管及指导、更换尿管、膀胱冲洗、导尿及膀胱冲洗"],
  ["导管护理", "腹透管与气管切开导管的维护。"],
  ["术后拆线", "查看伤口情况后，拆除外科缝线。"],
  ["基础护理", "雾化吸入，以及通便、灌肠护理。"],
  ["器械调试", "调试家用医疗器械，并指导使用。", "制氧机、血糖仪、雾化器、吸痰器、呼吸机"],
  ["药物管理", "核对家中药品，并整理服用时间。"]
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
  .map(
    ([name, desc, items]) =>
      `<li><h3>${name}</h3><p>${desc}</p>${items ? `<small>${items}</small>` : ""}</li>`
  )
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
    await navigator.clipboard.writeText("eht-care");
    hint.textContent = "已复制";
  } catch {
    hint.textContent = "请手动记录 eht-care";
  }
});
