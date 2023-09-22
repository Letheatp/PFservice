document.addEventListener('turbo:load', function() {
  if(document.getElementById("selectable-options")){

    var selectableOptions = document.getElementById("selectable-options");
    var search_box = document.getElementById("search-box");
    var clear_search = document.getElementById("clear-search");

    search_box.addEventListener("input",function(){//ユーザーの入力ごとに実行される関数
      if (this.value != ""){
        addSelectableOptions(this.value);
      }
      else{
        clearSelectableOptions();
      }

    clear_search.onclick = function() {
      search_box.value = "";
      clearSelectableOptions();
    }

    });
  
    setDefaultValueInEdit()
  }
  
  function addSelectableOptions(keyword){//選択肢を追加する関数
    while(selectableOptions.firstChild){
      selectableOptions.removeChild(selectableOptions.firstChild);
    }
    let options = document.getElementById("select").children
    let game_field = document.getElementById("purchase_record_form_game_id")
  
    for(let i=0; i < options.length; i++){
      let append_selectable_option
      append_selectable_option = document.createElement("div")
      append_selectable_option.innerHTML = options[i].innerHTML //名前を要素に追加
      append_selectable_option.setAttribute('data-id', options[i].value)//IDをdata属性に追加

      append_selectable_option.onclick = function() {
        let selected_game_id = append_selectable_option.getAttribute('data-id')
        let selected_game_title = append_selectable_option.innerHTML
        if (append_selectable_option.classList.contains("is_selected")){//is_selectedが含まれていたら
          
        }else{
          let option_with_is_selected = selectableOptions.querySelector(".d-none");
          if(option_with_is_selected != null){ option_with_is_selected.classList.remove("d-none") }
          
          game_field.value = selected_game_id
          search_box.value = selected_game_title

          while(selectableOptions.firstChild){
            selectableOptions.removeChild(selectableOptions.firstChild);
          }
        }
        append_selectable_option.classList.toggle('d-none')
      };

      append_selectable_option.classList.add(
        "list-group-item",
        "list-group-item-action",
      )

      if (options[i].innerHTML.indexOf(keyword) != -1 ){//ユーザーが入力した値が含まれている要素のみを追加する
        selectableOptions.appendChild(append_selectable_option)
      }
    }
  }

  function clearSelectableOptions () {
    while(selectableOptions.firstChild){
      selectableOptions.removeChild(selectableOptions.firstChild);
    }
  }

  function setDefaultValueInEdit () {//編集時にフォームに値をセットする
    let game_field = document.getElementById("purchase_record_form_game_id")
    let options = document.getElementById("select").children
    let selected_option = game_field.value// 選択されているIDを配列に入れて
    for(let i=0; i < options.length; i++){
      if (selected_option === String(options[i].value)){
        selected_member_names.innerHTML += options[i].innerHTML + ","
      } 
    }
  }
})  
