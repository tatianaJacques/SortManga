var app = new Vue({
  el: '#app',
  data: {
    mangas: [
      {
        title: 'Le mari de mon frère',
        editor: 'Akata',
        nbTome: '20'
      },
      {
        title: 'Full Metal Alchemist',
        editor: 'Kurokawa',
        nbTome: '2'
      }
    ],
    popinAdd : false,
    popinSort : false,
    mangaTitle : '',
    mangaEditor : ''
  },
  methods: {
    openPopinManga: function () {
      this.popinAdd = true
    },
    openPopinBiblio: function () {
      this.popinSort = true
    },
    addManga: function () {
      var newManga = {
        title : '',
        editor : ''
      };
      newManga.title = this.mangaTitle;
      newManga.editor = this.mangaEditor;
      this.mangas.push(newManga);
      this.mangaTitle = '';
      this.mangaEditor = '';
      this.popinAdd = false;
    },
    sortTitle: function () {
      this.mangas.sort(compare);

      function compare(a, b) {
        var titlea = a.title.charAt(0);
        var titleb = b.title.charAt(0);

        if (titlea < titleb) {
          return -1;
        }
        if (titleb > titlea) {
          return 1;
        }
        // a doit être égal à b
        return 0;
      }
    },
    sortEditor: function () {
      this.mangas.sort(compare);

      function compare(a, b) {
        var titlea = a.editor.charAt(0);
        var titleb = b.editor.charAt(0);
        if (titlea < titleb) {
          return -1;
        }
        if (titleb > titlea) {
          return 1;
        }
        // a doit être égal à b
        return 0;
      }
    },
    createCSV: function () {

      var html = document.querySelector("table").outerHTML;
      export_table_to_csv(html, "table.csv");

      function download_csv(csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV FILE
        csvFile = new Blob([csv], {type: "text/csv"});

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // We have to create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Make sure that the link is not displayed
        downloadLink.style.display = "none";

        // Add the link to your DOM
        document.body.appendChild(downloadLink);

        // Lanzamos
        downloadLink.click();
      }

      function export_table_to_csv(html, filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");

        for (var i = 0; i < rows.length; i++) {
          var row = [], cols = rows[i].querySelectorAll("td, th");

          for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

          csv.push(row.join(","));
        }

        // Download CSV
        download_csv(csv.join("\n"), filename);
      }
    }
  }
})
