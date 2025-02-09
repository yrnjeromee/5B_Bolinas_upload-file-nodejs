(async () => {
    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");
    const link = document.querySelector("#link");
    const fileListContainer = document.querySelector("#fileList");
  
    handleSubmit = async (event) => {
      const formData = new FormData();
      formData.append("file", inputFile.files[0]);
      const body = formData;
      const fetchOptions = {
        method: 'post',
        body: body
      };
      try {
        const res = await fetch("/upload", fetchOptions);
        const data = await res.json();
        loadFileList();
      } catch (e) {
        console.log(e);
      }
    };
    const loadFileList = async () => {
        try {
            const res = await fetch("/filelist");
            const files = await res.json();
            fileListContainer.innerHTML = ""; // Svuota la lista esistente
            files.forEach(file => {
                const listItem = `<li><a href="${file.url}" target="_blank">${file.filename}</a></li>`;
                fileListContainer.innerHTML += listItem; // Aggiunge ogni file alla lista
            });
        } catch (e) {
            console.log(e);
        };
    };
    loadFileList();
  
    button.onclick = handleSubmit;
  })();