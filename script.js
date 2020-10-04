// See https://npgeo-corona-npgeo-de.hub.arcgis.com/
const url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=covid-19-germany-landkreise&q=&facet=death_rate&refine.rs=05711"

let covidNumbers = new Request(url);
covidNumbers.method = "GET";
let json = await covidNumbers.loadJSON();
let biData = json["records"][0]["fields"];

let casesPerPopulation = biData["cases_per_population"];
let casesPer100k = biData["cases_per_100k"];
let cases7Per100k = biData["cases7_per_100k"]
let deaths = biData["deaths"];
let deathRate = biData["death_rate"]
let cases = biData["cases"];

let lastUpdate = biData["last_update"];

console.log("Cases              : " + cases);
console.log("Cases per poulation: " + casesPerPopulation);
console.log("Cases per 100k     : " + casesPer100k);
console.log("Cases per 100k (7d): " + cases7Per100k);
console.log("Deaths             : " + deaths);
console.log("Death rate         : " + deathRate);


if (config.runsInWidget) {
  // create and show widget
  let widget = createWidget("COVID19 Bielefeld", "${cases} gesamt", "${cases7Per100k} je 100k", "#53d769")
  Script.setWidget(widget);
  Script.complete()
// Otherwise, create the widget.  
} else {
  let table = new UITable()
  
  // add header
  let row = new UITableRow();
  row.isHeader = true;
  row.addText(`Corona-Daten für Bielefeld`);
  table.addRow(row);
  
  // fill data
  table.addRow(createRow("Fälle gesamt", cases));
  table.addRow(createRow("pro Einwohner", casesPerPopulation));
  table.addRow(createRow("pro 100k", casesPer100k));
  table.addRow(createRow("pro 100k (7 Tage)", cases7Per100k));
  table.addRow(createRow("Verstorben", deaths));
  table.addRow(createRow("Sterberate", deathRate));
  
  if (config.runsWithSiri) {
    Speech.speak("Es sind ${cases} Fälle in Bielefeld registriert. Pro 100000 Einwohner gibt es aktuell ${cases7Per100k} Fälle.");
  }
  
  // present table
  table.present();
}

function createRow(title, number) {
  let row = new UITableRow()
  row.addText(title)
  row.addText(number.toString()).rightAligned()
  return row
}

function createWidget(pretitle, title, subtitle, color) {
  let w = new ListWidget();
  w.backgroundColor = new Color(color);
  let preTxt = w.addText(pretitle);
  preTxt.textColor = Color.white();
  preTxt.textOpacity = 0.8;
  preTxt.font = Font.systemFont(16);
  w.addSpacer(5);
  let titleTxt = w.addText(title);
  titleTxt.textColor = Color.white()
  titleTxt.font = Font.systemFont(22)
  w.addSpacer(5)
  let subTxt = w.addText(subtitle)
  subTxt.textColor = Color.white()
  subTxt.textOpacity = 0.8
  subTxt.font = Font.systemFont(18)
  return w
}