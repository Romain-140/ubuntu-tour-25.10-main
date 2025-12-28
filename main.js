function loadApp(name) {
  const file = document.getElementById("apps-json");

  const jsonText = file.textContent || file.innerText;

  let data;

  try {
    data = JSON.parse(jsonText);
  } catch (e) {
    throw e;
  }

  const appData = data[name];

  try {
    appData[name];
  } catch (e) {
    throw e;
  }

  // Add script

  var scriptPath = `./files/apps/${appData["type"]}/${name}/script.js`;

  var script = document.createElement('script');
  script.id = `script-${name}`;
  script.src = scriptPath;
  script.type = 'text/javascript';
  script.async = true;

  document.head.appendChild(script);
  script = document.getElementById(`script-${name}`);
  script.onload = () => { onStart() }

  return;
}

loadApp("start-menu");