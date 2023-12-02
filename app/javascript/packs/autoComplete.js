document.addEventListener('turbo:load',async function(){
  if(!document.getElementById('purchase_record_form_game')){
    return
  }

  const gameTitles = await fetchGameTitlesAsync();

  const autoCompleteJS = new autoComplete({
    selector: "#purchase_record_form_game",
    placeHolder: "ゲームタイトルを入力...",
    data: {
      src: gameTitles,
      cache: false,
      keys: ["title"],
    },
    searchEngine: "strict",
    maxResults: 5,
    resultItem: {
      highlight: false
    },
    events: {
      input: {
        selection: (event) => {
          const selection = event.detail.selection.value;
          autoCompleteJS.input.value = selection.title;
          const index = parseInt(selection.index);
          console.log(document.getElementById('game-id-field').value);
          document.getElementById('game-id-field').setAttribute('value', index);
        },
        keydown: (event) => {
          
        }
      }
    }
  });

  function fetchGameTitles(){
    return new Promise((resolve, reject) => {
      const url = "/games"

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
          'X-Requested-With': 'XMLHttpRequest'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => {
        console.error(error);
        reject(error);
      });
      })
  }

  async function fetchGameTitlesAsync(){
    const result = await fetchGameTitles();
    return result;
  }
})