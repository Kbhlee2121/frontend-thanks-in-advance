import React from "react";
import Item from "./Item";

const ItemsList = (props) => {
  const {
    itemsList,
    filteredList,
    detailViewItem,
    setEditItemState,
    deleteItem,
    isFriendViewing,
  } = props;
  let active = [];
  filteredList.length > 0 ? (active = filteredList) : (active = itemsList);

  return (
    // filteredList.length === 0 && itemsList.length > 0
    //   ? itemsList.map((item) => (
    //       <Item
    //         key={item.id}
    //         item={item}
    //         detailViewItem={detailViewItem}
    //         setEditItemState={setEditItemState}
    //         deleteItem={deleteItem}
    //       />
    //     ))
    //   : filteredList.map((item) => (
    //       <Item
    //         key={item.id}
    //         item={item}
    //         detailViewItem={detailViewItem}
    //         setEditItemState={setEditItemState}
    //         deleteItem={deleteItem}
    //       />
    //     ))
    active.map((item) => (
      <Item
        key={item.id}
        item={item}
        detailViewItem={detailViewItem}
        setEditItemState={setEditItemState}
        deleteItem={deleteItem}
        isFriendViewing={isFriendViewing}
      />
    )) || "Loading..."
  );
};

export default ItemsList;
