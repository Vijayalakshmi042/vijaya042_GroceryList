let itemInputEl=document.getElementById("searchInput");
let submitButtonEl=document.getElementById("submitButton")
let itemListContainerEl=document.getElementById("unorderedList");
let clearItemsButtonEl=document.getElementById("clearItemsButton");


function getFromLocalStorageItemList(){
    let stringifiedItemList=localStorage.getItem("groceryList");
    let parsedItemList=JSON.parse(stringifiedItemList);
    if (parsedItemList===""){
        return [{
            "name":"",
            "uniqueNo":""
        }];
    }
    else{
        return parsedItemList;
    }
}

let groceryList=getFromLocalStorageItemList();
let itemCount=groceryList.length;

function onEditItem(itemId){
    let itemElement=document.getElementById("itemId");
    submitButtonEl.textContent="Edit";
    itemElement.textContent=itemInputEl.value;
    localStorage.setItem("name",itemInputEl.value);
}

function onDeleteItem(itemId){
    let itemElement=document.getElementById("itemId");
    itemListContainerEl.removeChild(itemElement);

    let deleteElementIndex = groceryList.findIndex(function(eachItem) {
        let eachItemId = "item" + eachItem.uniqueNo;
        if (eachItemId === itemId) {
          return true;
        } else {
          return false;
        }
      });
    
    groceryList.splice(deleteElementIndex, 1);
    

}

function onclearItems(){
    localStorage.clear("groceryList");
    groceryList=[];
}

function createAndAppendItemList(newItem){
    clearItemsButtonEl.classList.remove("d-none");
    clearItemsButtonEl.onclick=function(){
        onclearItems();
    }

    let itemId="item"+newItem.uniqueNo;

    let itemList=document.createElement("li");
    itemList.classList.add("d-flex","flex-row");
    itemListContainerEl.appendChild(itemList);

    let itemContainer = document.createElement("div");
    itemContainer.classList.add("item-container", "d-flex", "flex-row");
    itemList.appendChild(itemContainer);


    let itemNameEl=document.createElement("h1");
    itemNameEl.classList.add("item_name");
    itemNameEl.textContent=newItem.name;
    itemNameEl.id=itemId;
    itemContainer.appendChild(itemNameEl);

    let editIconContainer=document.createElement("div");
    editIconContainer.classList.add("edit_icon_container");
    itemContainer.appendChild(editIconContainer);

    let editIcon=document.createElement("i");
    editIcon.classList.add("fa-solid","fa-pen-to-square");
    editIconContainer.appendChild(editIcon);

    editIcon.addEventListener("onclick",function(){
        onEditItem(itemId);
    });

    let deleteIconContainer=document.createElement("div");
    deleteIconContainer.classList.add("delete_icon_container");
    itemContainer.appendChild(deleteIconContainer);

    let deleteIcon=document.createElement("i");
    deleteIcon.classList.add("fa-solid","fa-trash");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.addEventListener("onclick",function(){
        onDeleteItem(itemId);
    });
}

function onAddItem(){
    let itemName=itemInputEl.value;
    if (itemName===""){
        alert("Please Enter the value.");
        return;
    }
    
    itemCount=itemCount+1;

    let newItem={
        name:itemName,
        uniqueNo: itemCount
    };

    createAndAppendItemList(newItem);
    itemInputEl.value="";
    groceryList.push(newItem);
}

submitButtonEl.addEventListener("onclick",function(){
    onAddItem();
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
})
