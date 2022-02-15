import React from "react";

const Item = (props) => {
  const {
    item,
    detailViewItem,
    setEditItemState,
    deleteItem,
    isFriendViewing,
  } = props;
  return (
    <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      {/* add onClick for getlist */}
      {item.claimed === false ? (
        <span onClick={(e) => detailViewItem(item)}>{item.item_name}</span>
      ) : (
        <strike onClick={(e) => detailViewItem(item)}>{item.item_name}</strike>
      )}
      <span>
        <button
          className="btn btn-outline-primary mr-2 btn-sm my-1 mx-2"
          onClick={(e) => setEditItemState(item)}
          disabled={isFriendViewing}
        >
          Edit
        </button>
        <button
          className="btn btn-outline-danger mr-2 btn-sm my-1 mx-2"
          onClick={(e) => deleteItem(item)}
          disabled={isFriendViewing}
        >
          Delete
        </button>
      </span>
    </li>
  );
};

export default Item;
