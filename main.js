function loadApp(name) {
  const file = document.getElementById("apps-json");
  const jsonText = file.textContent || file.innerText;

  const appData = JSON.parse(jsonText)[name];

  // Add script

  var scriptPath = `./files/apps/${appData["type"]}/${name}/script.js`;

  var script = document.createElement('script');
  script.id = `script-${name}`;
  script.src = scriptPath;
  script.type = 'text/javascript';
  script.async = true;

  document.head.appendChild(script);
  script = document.getElementById(`script-${name}`);
  script.onload = () => { onStart() };
}

loadApp("data-loader");
loadApp("start-menu");

 // Clean