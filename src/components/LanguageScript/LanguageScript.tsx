export default function LanguageScript() {
  const script = `(function(){try{var s=localStorage.getItem("portfolio-language");var l=s==="he"||s==="en"?s:(navigator.language||"en").toLowerCase().indexOf("he")===0?"he":"en";var d=document.documentElement;d.lang=l;d.dir=l==="he"?"rtl":"ltr";d.dataset.language=l}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
