document.getElementById('fileinput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt){

        var files = evt.target.files; // FileList object

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), 
                      '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                      '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

        var fileReader = new FileReader();
        fileReader.onload = function(e){
            var fileContents = document.getElementById('share');
            var data = d3.csvParse(fileReader.result);
            create_table(data);
            _hhi = hhi(data);
            _d_hhi = delta_hhi(data, _hhi);
            show_hhi();
            insert_point(svg, x_value=_d_hhi[1], y_value=_d_hhi[0], raio=9, color="black");

        }
        fileReader.readAsText(files[0]);
}

function hhi(data){
  //https://floating-point-gui.de/languages/javascript/
  var soma = 0;
  for(var k = 0; k < data.length; k++) {
    share = parseFloat(data[k]["share"]);
    soma += (share)**2;
  }
  hhi = 10000 * soma;
  return hhi;
}

function show_hhi(){
  d3.select("#template-structure")
    .attr("class", "visible");
}

function delta_hhi(data, hhi){
  var empresa_1 = parseFloat(data[0]["share"]);
  var empresa_2 = parseFloat(data[1]["share"]);

  var hhi_final = (empresa_1 + empresa_2)**2;
  for(var k = 2; k < data.length; k++) {
    share = data[k]["share"];
    hhi_final += (share)**2;
  }
  hhi_final = (10000*hhi_final)
  delta_hhi = hhi_final - hhi;
  result = [hhi_final.toPrecision(4), delta_hhi.toPrecision(3)];
  return result;
}

function create_table(data){

 var table = d3.select('.table')
               .append("table")
               .attr("class", "table table-striped table-bordered");
  var thead = table.append('thead');
  var tbody = table.append('tbody');
  var columns = data.columns;

  thead.append('tr')
    .selectAll('th')
      .data(columns)
      .enter()
    .append('th')
      .text(function (d) { return d });

  var rows = tbody.selectAll('tr')
      .data(data)
      .enter()
    .append('tr');

  var cells = rows.selectAll('td')
      .data(function(row) {
        return columns.map(function (column) {
          return { column: column, value: row[column] }
        })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value });
}