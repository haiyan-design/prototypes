/**
 * 原服务不可售：在列表 / 详情点击「再来一单」时弹窗拦截（?edge=sku-off）
 */
(function () {
  var params = new URLSearchParams(location.search);
  if (params.get("edge") !== "sku-off") return;

  function isReorderLink(el) {
    if (!el) return false;
    var a = el.closest("a");
    if (!a) return false;
    var href = a.getAttribute("href") || "";
    var text = (a.textContent || "").replace(/\s+/g, "");
    return text.indexOf("再来一单") >= 0 || href.indexOf("reorder-checkout") >= 0;
  }

  function ensureModal() {
    var existing = document.getElementById("skuOffModal");
    if (existing) return existing;

    var wrap = document.createElement("div");
    wrap.id = "skuOffModal";
    wrap.className = "sku-off-modal";
    wrap.setAttribute("hidden", "");
    wrap.innerHTML =
      '<div class="sku-off-mask" data-close="1"></div>' +
      '<div class="sku-off-dialog" role="dialog" aria-modal="true" aria-labelledby="skuOffTitle">' +
      '<button type="button" class="sku-off-close" data-close="1" aria-label="关闭">×</button>' +
      '<p class="sku-off-title" id="skuOffTitle">提示</p>' +
      '<p class="sku-off-desc">抱歉，原服务已下架，请重新选购。</p>' +
      '<div class="sku-off-actions">' +
      '<button type="button" class="sku-off-btn ghost" data-close="1">好的</button>' +
      '<button type="button" class="sku-off-btn primary" id="skuOffGoCat">选购</button>' +
      "</div></div>";
    document.body.appendChild(wrap);

    wrap.addEventListener("click", function (e) {
      if (e.target.closest("[data-close='1']")) closeModal();
    });
    document.getElementById("skuOffGoCat").addEventListener("click", function () {
      closeModal();
      alert("原型演示：跳转分类页选购其他服务");
    });
    return wrap;
  }

  function openModal() {
    ensureModal().hidden = false;
  }

  function closeModal() {
    var el = document.getElementById("skuOffModal");
    if (el) el.hidden = true;
  }

  document.addEventListener(
    "click",
    function (e) {
      if (!isReorderLink(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      openModal();
    },
    true
  );
})();
